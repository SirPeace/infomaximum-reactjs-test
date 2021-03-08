import React from "react"
import { Field, Form } from "react-final-form"
import classes from "./ProfileForm.module.scss"
import * as yup from "yup"
import useValidationSchema from "../../../utils/useValidationSchema"
import { useMutation } from "@apollo/client"
import { EditUser } from "../../../server/mutations"
import { UserState } from "../../../store/user/reducer"
import InputAdapter from "../Adapters/InputAdapter"
import PasswordInputAdapter from "../Adapters/PasswordInputAdapter"

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
    .min(10, "Пароль должен состоять минимум из 10 символов"),
  passwordConfirmation: yup.string().when("password", {
    is: (val: any) => val?.length > 0,
    then: yup
      .string()
      .oneOf([yup.ref("password"), null], "Пароли должны совпадать")
      .required("Повторите пароль"),
    otherwise: yup
      .string()
      .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
  }),
})

export interface ProfileFormFields {
  firstName: string
  secondName: string
  email: string
  password: string
  passwordConfirmation: string
}

interface ProfileFormProps {
  handleErrors: (error: string) => void
  onSubmit?: () => void
  afterSubmit?: () => void
  onSuccess?: (values: ProfileFormFields) => void
  onChange?: (values: ProfileFormFields) => void
  user: UserState
}

const ProfileForm = React.forwardRef<HTMLFormElement, ProfileFormProps>(
  ({ onSubmit, afterSubmit, handleErrors, onSuccess, onChange, user }, ref) => {
    const validate = useValidationSchema(schema, true)
    const [editUser] = useMutation(EditUser)

    const handleSubmit = async (fields: ProfileFormFields) => {
      if (onSubmit) onSubmit()

      const userData = {
        id: user.id,
        firstName: fields.firstName,
        secondName: fields.secondName,
        email: fields.email,
        password: fields.password,
      }

      try {
        await editUser({ variables: userData })
        if (onSuccess) {
          onSuccess({
            email: fields.email || "",
            firstName: fields.firstName || "",
            secondName: fields.secondName || "",
            password: fields.password || "",
            passwordConfirmation: fields.passwordConfirmation || "",
          })
        }
      } catch (err) {
        handleErrors(err.message)
      }

      if (afterSubmit) afterSubmit()
    }

    return (
      <Form
        onSubmit={handleSubmit}
        validate={(fields: ProfileFormFields) => {
          const errors = validate(fields)

          if (!errors && onChange) {
            onChange({
              email: fields.email || "",
              firstName: fields.firstName || "",
              secondName: fields.secondName || "",
              password: fields.password || "",
              passwordConfirmation: fields.passwordConfirmation || "",
            })
          }

          return errors
        }}
        render={({ handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className={classes.ProfileForm}
            ref={ref}
          >
            <div className={classes.formControl}>
              <label htmlFor="firstName">Имя</label>
              <div className={classes.formControl__input}>
                <Field
                  name="firstName"
                  component={InputAdapter}
                  type="text"
                  id="firstName"
                  initialValue={user.firstName}
                />
              </div>
            </div>

            <div className={classes.formControl}>
              <label htmlFor="secondName">Фамилия</label>
              <div className={classes.formControl__input}>
                <Field
                  name="secondName"
                  component={InputAdapter}
                  type="text"
                  id="secondName"
                  initialValue={user.secondName}
                />
              </div>
            </div>

            <div className={classes.formControl}>
              <label htmlFor="email">Электронная почта</label>
              <div className={classes.formControl__input}>
                <Field
                  name="email"
                  component={InputAdapter}
                  type="email"
                  id="email"
                  initialValue={user.email}
                />
              </div>
            </div>

            <div className={classes.formControl}>
              <label htmlFor="password">Новый пароль</label>
              <div className={classes.formControl__password}>
                <Field
                  name="password"
                  component={PasswordInputAdapter}
                  id="password"
                />
              </div>
            </div>

            <div className={classes.formControl}>
              <label htmlFor="passwordConfirmation">Повторите пароль</label>
              <div className={classes.formControl__password}>
                <Field
                  name="passwordConfirmation"
                  component={PasswordInputAdapter}
                  id="passwordConfirmation"
                />
              </div>
            </div>
          </form>
        )}
      />
    )
  }
)

export default ProfileForm
