import React from "react"
import { Link } from "react-router-dom"

import Alert from "../components/Alert"
import classes from "./styles.module.scss"
import LoginForm from "../components/forms/LoginForm"
import Paper from "../components/Paper"
import useTitle from "../utils/useTitle"

const LoginPage = () => {
  useTitle("Вход в систему")

  const [error, setError] = React.useState<string | null>(null)

  const handleErrors = (error: string) => {
    setError(error)
  }

  const handleSubmit = () => {
    setError(null)
  }

  return (
    <div className={classes["LoginPage"]}>
      <div className={classes["LoginPage__container"]}>
        <div className={classes["logo"]}></div>
        <Paper className={classes.paper}>
          <div className={classes["paper__container"]}>
            <LoginForm handleErrors={handleErrors} onSubmit={handleSubmit} />

            <div className={classes.links}>
              <Link to="/sign-up">Зарегистрироваться</Link>
              {localStorage.getItem("token") ? (
                <Link to="/processes">Перейти в приложение</Link>
              ) : null}
            </div>
          </div>

          <div className={classes.alert}>
            <Alert message={error as string} type="danger" render={!!error} />
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default LoginPage
