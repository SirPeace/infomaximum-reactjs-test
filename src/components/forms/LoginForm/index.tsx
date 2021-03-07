import React, { VFC } from "react"
import { Field, Form, FieldInputProps } from "react-final-form"
import Button from "../../Button"
import Input from "../../Input"
import PasswordInput from "../../PasswordInput"
import classes from "./LoginForm.module.scss"
import * as yup from "yup"
import useValidationSchema from "../../../utils/useValidationSchema"
import { FieldState } from "final-form"
import { useMutation } from "@apollo/client"
import { Login } from "../../../server/mutations"

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Поле должно содержать электронную почту")
    .required("Поле должно быть заполнено"),
  password: yup.string().required("Поле должно быть заполнено"),
})

const InputAdapter = ({
  input,
  meta,
  ...rest
}: {
  input: FieldInputProps<any, HTMLElement>
  meta: FieldState<any>
  type: "number" | "email" | "password" | "text"
}) => (
  <Input
    {...input}
    {...rest}
    errorMessage={meta.error}
    error={meta.error && meta.touched}
  />
)

const PasswordInputAdapter = ({
  input,
  meta,
  ...rest
}: {
  input: FieldInputProps<any, HTMLElement>
  meta: FieldState<any>
  type: "password"
}) => (
  <PasswordInput
    {...input}
    {...rest}
    errorMessage={meta.error}
    error={meta.error && meta.touched}
  />
)

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
