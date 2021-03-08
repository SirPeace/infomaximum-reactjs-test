import React, { VFC } from "react"
import { connect } from "react-redux"
import { useQuery } from "@apollo/client"

import Alert from "../components/Alert"
import Button from "../components/Button"
import classes from "./styles.module.scss"
import { CurrentUser } from "../server/queries"
import NavBar from "../components/NavBar"
import Paper from "../components/Paper"
import ProfileForm, { ProfileFormFields } from "../components/forms/ProfileForm"
import { updateUserData } from "../store/user/actions"
import useTitle from "../utils/useTitle"
import { UserState } from "../store/user/reducer"

const ProfilePage: VFC<{
  user: UserState
  updateUser: (user: UserState) => void
}> = ({ user, updateUser }) => {
  useTitle("Редактирование пользователя")

  const { data } = useQuery(CurrentUser)

  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [canSubmit, setCanSubmit] = React.useState<boolean>(false)
  const [submitted, setSubmitted] = React.useState<boolean>(false)
  const [formSnapshot, setFormSnapshot] = React.useState<ProfileFormFields>({
    email: data.currentUser.email,
    firstName: data.currentUser.firstName,
    secondName: data.currentUser.secondName,
    password: "",
    passwordConfirmation: "",
  })

  const formElement = React.createRef<HTMLFormElement>()

  const handleErrors = (errMessage: string) => {
    setError(errMessage)
  }

  const handleSubmit = () => {
    formElement.current?.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    )
  }

  const onFormChange = (values: ProfileFormFields) => {
    if (JSON.stringify(values) !== JSON.stringify(formSnapshot)) {
      setCanSubmit(true)
    } else {
      setCanSubmit(false)
    }
  }

  const onFormSubmit = () => {
    setError(null)
    setLoading(true)
  }

  const onSuccess = (values: ProfileFormFields) => {
    updateUser({
      id: user.id,
      firstName: values.firstName,
      secondName: values.secondName,
      email: values.email,
    })
    setFormSnapshot(values)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const afterFormSubmit = () => {
    setLoading(false)
    setCanSubmit(false)
  }

  return (
    <div className={`${classes.AppPage} ${classes.ProfilePage}`}>
      <NavBar />
      <main className={classes.AppPage__body}>
        <div className={classes.ProfilePage__head}>
          <h1>
            {`${data.currentUser.firstName} ${data.currentUser.secondName}`}.
            Редактирование
          </h1>
          {submitted ? (
            <Button disabled>Сохранено</Button>
          ) : (
            <Button
              onClick={handleSubmit}
              type="submit"
              loading={loading}
              disabled={!canSubmit}
            >
              Сохранить
            </Button>
          )}
        </div>

        <Paper>
          <ProfileForm
            user={user}
            firstName={data.currentUser.firstName}
            secondName={data.currentUser.secondName}
            email={data.currentUser.email}
            ref={formElement}
            handleErrors={handleErrors}
            onSubmit={onFormSubmit}
            afterSubmit={afterFormSubmit}
            onSuccess={onSuccess}
            onChange={onFormChange}
          />
        </Paper>

        <Alert
          render={!!error}
          type="danger"
          message={error as string}
          size="small"
        />
      </main>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.user,
})

const mapDispatchToProps = (dispatch: Function) => ({
  updateUser: (data: UserState) => dispatch(updateUserData(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
