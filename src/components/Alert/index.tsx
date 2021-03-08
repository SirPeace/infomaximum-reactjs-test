import React, { VFC } from "react"
import { CSSTransition } from "react-transition-group"

import classes from "./Alert.module.scss"

export interface AlertProps {
  message: string
  render: boolean
  type?: "default" | "danger" | "success"
  size?: "small" | "normal"
  onClose?: () => void // close button
}

const Alert: VFC<AlertProps> = ({
  render,
  message,
  type = "default",
  onClose,
  size = "normal",
}) => {
  const appliedClasses = [classes.alert]
  if (type === "danger") {
    appliedClasses.push(classes.alertDanger)
  } else if (type === "success") {
    appliedClasses.push(classes.alertSuccess)
  }

  if (size === "small") {
    appliedClasses.push(classes.alertSmall)
  }

  return (
    <CSSTransition
      in={render}
      timeout={300} // Same as the styles transition duration
      classNames={{
        enter: classes["alert-enter"],
        enterActive: classes["alert-enter-active"],
        exit: classes["alert-exit"],
        exitActive: classes["alert-exit-active"],
      }}
      unmountOnExit
      mountOnEnter
    >
      <div className={appliedClasses.join(" ")}>
        {message}
        {onClose ? (
          <i className={classes.closeIcon} onClick={onClose}>
            ✕
          </i>
        ) : null}
      </div>
    </CSSTransition>
  )
}

export default Alert
