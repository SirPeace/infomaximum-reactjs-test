import React, { VFC } from "react"
import { Field, Form } from "react-final-form"
import { useMutation } from "@apollo/client"
import * as yup from "yup"

import Button from "../../Button"
import classes from "./LoginForm.module.scss"
import InputAdapter from "../Adapters/InputAdapter"
import { Login } from "../../../server/mutations"
import PasswordInputAdapter from "../Adapters/PasswordInputAdapter"
import useValidationSchema from "../../../utils/useValidationSchema"

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Поле должно содержать электронную почту")
    .required("Поле должно быть заполнено"),
  password: yup.string().required("Поле должно быть заполнено"),
})

export interface LoginFormProps {
  handleErrors: (error: string) => void
  onSubmit?: () => void
  authorizeUser?: (token: string, data: Object) => void
  user?: Object
}

const LoginForm: VFC<LoginFormProps> = ({ handleErrors, onSubmit }) => {
  const validate = useValidationSchema(schema, true)
  const [login] = useMutation(Login)

  const handleSubmit = async (values: { email: string; password: string }) => {
    if (onSubmit) onSubmit()

    try {
      const { data } = await login({ variables: values })
      localStorage.setItem("token", data.login.token)
      window.location.assign("/processes")
    } catch (e) {
      handleErrors(e.message)
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      validate={values => validate(values)}
      render={({ handleSubmit, submitting, valid }) => (
        <form onSubmit={handleSubmit} className={classes["login-form"]}>
          <div className={classes["login-form__input"]}>
            <Field
              name="email"
              component={InputAdapter}
              placeholder="Электронная почта"
            />
          </div>

          <div className={classes["login-form__input"]}>
            <Field
              name="password"
              component={PasswordInputAdapter}
              placeholder="Пароль"
            />
          </div>

          <div className={classes["login-form__submit-button"]}>
            <Button expand loading={submitting} disabled={!valid} type="submit">
              Войти в систему
            </Button>
          </div>
        </form>
      )}
    />
  )
}

export default LoginForm
