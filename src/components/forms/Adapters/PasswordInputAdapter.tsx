import React from "react"
import { FieldState } from "final-form"
import { FieldInputProps } from "react-final-form"

import PasswordInput from "../../PasswordInput"

export const PasswordInputAdapter = ({
  input,
  meta,
  id,
  ...rest
}: {
  input: FieldInputProps<any, HTMLElement>
  meta: FieldState<any>
  type: "password"
  id?: string
}) => (
  <PasswordInput
    {...input}
    {...rest}
    errorMessage={meta.error}
    error={meta.error && meta.touched}
    id={id}
  />
)

export default PasswordInputAdapter
