import React, { ComponentType, Dispatch, VFC } from "react"
import { connect } from "react-redux"
import { Switch, Route, Redirect } from "react-router-dom"
import { useQuery } from "@apollo/client"

import AppShell from "./components/AppShell"
import { CurrentUser } from "./server/queries"
import ErrorPage from "./pages/errorPage"
import LoginPage from "./pages/login"
import NotFound from "./pages/404"
import ProcessesPage from "./pages/processes"
import ProfilePage from "./pages/profile"
import SignupPage from "./pages/signup"
import { updateUserData, UserAction } from "./store/user/actions"
import { UserState } from "./store/user/reducer"
import { State } from "./store"

interface AppProps {
  updateUser: (data: UserState) => void
  user: UserState | {}
}

const App: VFC<AppProps> = ({ user, updateUser }) => {
  const { loading, error } = useQuery(CurrentUser, {
    skip: JSON.stringify(user) !== JSON.stringify({}),
    onCompleted: data => {
      updateUser(data.currentUser)
    },
    onError: err => {
      if ((err.graphQLErrors[0] as any)?.statusCode === 401) {
        localStorage.removeItem("token")
      }
    },
  })

  // Don't route user on redirects
  if (loading) return <div></div>

  // Show error page if server is down
  if (error?.networkError?.message === "Failed to fetch") {
    return (
      <ErrorPage
        title="Ошибка"
        message="Связь с сервером потеряна..."
        links={[]}
      />
    )
  }

  type RouteSchema = {
    path: string
    component: ComponentType<any>
  }

  const protectedRoutes: RouteSchema[] = [
    { path: "/processes", component: ProcessesPage },
    { path: "/profile", component: ProfilePage },
  ]

  const renderProtectedRoutes = protectedRoutes.map((route, key) => (
    <Route
      key={key}
      path={route.path}
      component={
        !error
          ? route.component
          : (error.graphQLErrors[0] as any)?.statusCode === 401
          ? ErrorPage.bind(null, {
              title: "Ошибка авторизации",
              message: "Вы не авторизованы",
              links: [{ to: "/login", text: "Войти в систему" }],
            })
          : ErrorPage.bind(null, {
              title: "Неизвестная ошибка",
              message: "Произошла неизвестная ошибка",
              links: [],
            })
      }
    />
  ))

  return (
    <AppShell>
      <Switch>
        <Redirect exact from="/" to={!error ? "/processes" : "/login"} />
        <Route path="/login" component={LoginPage} />
        <Route path="/sign-up" component={SignupPage} />
        {renderProtectedRoutes}
        <Route component={NotFound} />
      </Switch>
    </AppShell>
  )
}

export default connect(
  (state: State) => ({ user: state.user }),
  (dispatch: Dispatch<UserAction>) => ({
    updateUser: (data: UserState) => dispatch(updateUserData(data)),
  })
)(App)
