import React from "react"

import classes from "./Button.module.scss"

export interface ButtonProps {
  children: React.ReactNode
  expand?: boolean
  disabled?: boolean
  loading?: boolean
  type?: "submit" | "button"
  [K: string]: any
}

const Button: React.VFC<ButtonProps> = ({
  children,
  expand = false,
  disabled = false,
  loading = false,
  type = "button",
  ...props
}) => {
  const appliedClasses = [classes.button]
  const buttonRef = React.createRef<HTMLButtonElement>()

  if (expand) {
    appliedClasses.push(classes.expanded)
  }
  if (loading) {
    appliedClasses.push(classes.loading)
  }

  return (
    <button
      type={type}
      className={appliedClasses.join(" ")}
      disabled={disabled || loading}
      ref={buttonRef}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
