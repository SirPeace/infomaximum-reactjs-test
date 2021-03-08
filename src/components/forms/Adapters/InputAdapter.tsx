import React from "react"
import { FieldState } from "final-form"
import { FieldInputProps } from "react-final-form"

import Input from "../../Input"

const InputAdapter = ({
  input,
  meta,
  id,
  ...rest
}: {
  input: FieldInputProps<any, HTMLElement>
  meta: FieldState<any>
  id?: string
  type: "number" | "email" | "password" | "text"
  [K: string]: any
}) => (
  <Input
    {...input}
    {...rest}
    errorMessage={meta.error}
    error={meta.error && meta.touched}
    id={id}
  />
)

export default InputAdapter
