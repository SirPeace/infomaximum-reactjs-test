import React, { VFC } from "react"
import { Field, Form } from "react-final-form"
import { useMutation } from "@apollo/client"
import * as yup from "yup"

import Button from "../../Button"
import classes from "./SignupForm.module.scss"
import InputAdapter from "../Adapters/InputAdapter"
import PasswordInputAdapter from "../Adapters/PasswordInputAdapter"
import { Signup } from "../../../server/mutations"
import useValidationSchema from "../../../utils/useValidationSchema"

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[a-zа-я]+$/i, "Поле должно содержать только буквы")
    .required("Поле должно быть заполнено"),
  secondName: yup
    .string()
    .matches(/^[a-zа-я]+$/i, "Поле должно содержать только буквы")
    .required("Поле должно быть заполнено"),
  email: yup
    .string()
    .email("Поле должно содержать электронную почту")
    .required("Поле должно быть заполнено"),
  password: yup
    .string()
    .min(10, "Пароль должен состоять минимум из 10 символов")
    .required("Поле должно быть заполнено"),
  passwordConfirmation: yup
    .string()
    .min(10, "Пароль должен состоять минимум из 10 символов")
    .oneOf([yup.ref("password"), null], "Пароли должны совпадать")
    .required("Поле должно быть заполнено"),
})

export interface SignupFormProps {
  handleErrors: (error: string) => void
  onSubmit?: () => void
}

const SignupForm: VFC<SignupFormProps> = ({ handleErrors, onSubmit }) => {
  const validate = useValidationSchema(schema, true)
  const [signupUser] = useMutation(Signup)

  const handleSubmit = async (data: any) => {
    if (onSubmit) onSubmit()

    const signupData = {
      firstName: data.firstName,
      secondName: data.secondName,
      email: data.email,
      password: data.password,
    }

    try {
      const { data } = await signupUser({ variables: signupData })
      localStorage.setItem("token", data.signup)
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
              name="firstName"
              component={InputAdapter}
              type="text"
              placeholder="Имя"
            />
          </div>

          <div className={classes["login-form__input"]}>
            <Field
              name="secondName"
              component={InputAdapter}
              type="text"
              placeholder="Фамилия"
            />
          </div>

          <div className={classes["login-form__input"]}>
            <Field
              name="email"
              component={InputAdapter}
              type="email"
              placeholder="Электронная почта"
            />
          </div>

          <div className={classes["login-form__input"]}>
            <Field
              name="password"
              component={PasswordInputAdapter}
              placeholder="Введите пароль"
            />
          </div>

          <div className={classes["login-form__input"]}>
            <Field
              name="passwordConfirmation"
              component={PasswordInputAdapter}
              placeholder="Повторите пароль"
            />
          </div>

          <div className={classes["login-form__submit-button"]}>
            <Button expand loading={submitting} disabled={!valid} type="submit">
              Применить и войти
            </Button>
          </div>
        </form>
      )}
    />
  )
}

export default SignupForm
