import React, { FC } from "react"
import Input, { InputProps } from "../Input"
import classes from "./PasswordInput.module.scss"

export interface PasswordInputProps extends InputProps {
  type?: "password"
}

const PasswordInput: FC<PasswordInputProps> = ({
  disabled = false,
  error = false,
  errorMessage,
  placeholder = "",
  id = null,
  value = "",
  onChange,
  ...props
}) => {
  const inputRef = React.createRef<HTMLInputElement>()
  const [isVisible, setIsVisible] = React.useState(false)

  const toggleVisability = () => {
    if (inputRef.current !== null) {
      inputRef.current.type = isVisible ? "password" : "text"
      setIsVisible(visible => !visible)
    }
  }

  const eyeClasses = [classes["password-input__eye"]]
  if (!isVisible) {
    eyeClasses.push(classes["password-input__eye_closed"])
  }

  return (
    <div className={`${classes["password-input"]}`}>
      <Input
        ref={inputRef}
        disabled={disabled}
        placeholder={placeholder}
        id={id}
        type={"password"}
        value={value}
        onChange={onChange}
        error={error}
        errorMessage={errorMessage}
        {...props}
      />
      <i className={eyeClasses.join(" ")} onClick={toggleVisability}></i>
    </div>
  )
}

export default PasswordInput
