import React, { Dispatch, VFC } from "react"
import { connect } from "react-redux"

import Alert from "../components/Alert"
import Button from "../components/Button"
import classes from "./styles.module.scss"
import NavBar from "../components/NavBar"
import Paper from "../components/Paper"
import ProfileForm, { ProfileFormFields } from "../components/forms/ProfileForm"
import { updateUserData, UserAction } from "../store/user/actions"
import useTitle from "../utils/useTitle"
import { UserState } from "../store/user/reducer"
import { State } from "../store"

interface ProfilePageProps {
  user: UserState
  updateUser: (user: UserState) => void
}

const ProfilePage: VFC<ProfilePageProps> = ({ user, updateUser }) => {
  useTitle("Редактирование пользователя")

  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [canSubmit, setCanSubmit] = React.useState<boolean>(false)
  const [submitted, setSubmitted] = React.useState<boolean>(false)
  const [formSnapshot, setFormSnapshot] = React.useState<ProfileFormFields>({
    email: user.email,
    firstName: user.firstName,
    secondName: user.secondName,
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

  const onFormChange = (fields: ProfileFormFields) => {
    if (JSON.stringify(fields) !== JSON.stringify(formSnapshot)) {
      setCanSubmit(true)
    } else {
      setCanSubmit(false)
    }
  }

  const onFormSubmit = () => {
    setError(null)
    setLoading(true)
  }

  const onSuccess = (fields: ProfileFormFields) => {
    updateUser({
      __typename: user.__typename,
      id: user.id,
      firstName: fields.firstName,
      secondName: fields.secondName,
      email: fields.email,
    })
    setFormSnapshot(fields)
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
          <h1>{`${user.firstName} ${user.secondName}`}. Редактирование</h1>
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
          onClose={() => setError(null)}
        />
      </main>
    </div>
  )
}

const mapStateToProps = (state: State) => ({
  user: state.user,
})

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  updateUser: (data: UserState) => dispatch(updateUserData(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
