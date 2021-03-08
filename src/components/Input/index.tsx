import React, { ChangeEvent } from "react"

import classes from "./Input.module.scss"

export interface InputProps {
  onChange(evt: ChangeEvent<HTMLInputElement>): void
  value?: string
  placeholder?: string
  disabled?: boolean
  error?: boolean
  errorMessage?: string
  id?: any
  type?: "text" | "number" | "email" | "password"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      disabled = false,
      error = false,
      errorMessage,
      placeholder = "",
      id = null,
      type = "text",
      value = "",
      onChange,
      ...props
    },
    ref
  ) => {
    const inputClasses = [classes.Input]
    if (error) inputClasses.push(classes.error)

    const errorMessageElement =
      error && errorMessage ? (
        <span className={classes.errorMessage}>{errorMessage}</span>
      ) : null

    return (
      <>
        <input
          className={inputClasses.join(" ")}
          disabled={disabled}
          placeholder={placeholder}
          id={id}
          type={type}
          ref={ref}
          value={value}
          onChange={onChange}
          {...props}
        />
        {errorMessageElement}
      </>
    )
  }
)

export default Input
