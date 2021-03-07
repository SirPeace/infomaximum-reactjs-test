import React, { VFC } from "react"

import Alert from "../components/Alert"
import Button from "../components/Button"
import NavBar from "../components/NavBar"
import Paper from "../components/Paper"
import classes from "./styles.module.scss"
import ProfileForm from "../components/forms/ProfileForm"
import useTitle from "../utils/useTitle"
import { useQuery } from "@apollo/client"
import { CurrentUser } from "../server/queries"
import Loader from "../components/Loader"

const ProfilePage: VFC = () => {
  useTitle("Редактирование пользователя")

  const [error, setError] = React.useState<string | null>(null)
  const [alert, setAlert] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)

  const formElement = React.createRef<HTMLFormElement>()

  const { data, loading: userLoading } = useQuery(CurrentUser)

  const handleErrors = (errMessage: string) => {
    setError(errMessage)
  }

  const handleSubmit = () => {
    formElement.current?.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    )
  }

  const onFormSubmit = () => {
    setError(null)
    setAlert(null)
    setLoading(true)
  }

  const onSuccess = () => {
    setAlert("Изменения успешно внесены")
    setTimeout(() => setAlert(null), 3000)
  }

  const afterFormSubmit = () => {
    setLoading(false)
  }

  return (
    <div className={`${classes.AppPage} ${classes.ProfilePage}`}>
      <NavBar />
      <main className={classes.AppPage__body}>
        {userLoading ? (
          <Loader />
        ) : (
          <>
            <div className={classes.ProfilePage__head}>
              <h1>
                {`${data.currentUser.firstName} ${data.currentUser.secondName}`}
                . Редактирование
              </h1>
              <Button onClick={handleSubmit} type="submit" loading={loading}>
                Сохранить
              </Button>
            </div>

            <Paper>
              <ProfileForm
                firstName={data.currentUser.firstName}
                secondName={data.currentUser.secondName}
                email={data.currentUser.email}
                ref={formElement}
                handleErrors={handleErrors}
                onSubmit={onFormSubmit}
                afterSubmit={afterFormSubmit}
                onSuccess={onSuccess}
              />
            </Paper>

            <Alert
              render={!!error}
              type="danger"
              message={error as string}
              size="small"
            />
            <Alert
              render={alert !== null}
              type="success"
              message={alert as string}
              size="small"
            />
          </>
        )}
      </main>
    </div>
  )
}

export default ProfilePage
