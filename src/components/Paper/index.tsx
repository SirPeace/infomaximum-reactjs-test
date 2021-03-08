import React, { FC, ReactNode } from "react"

import classes from "./Paper.module.scss"

const Paper: FC<{ [key: string]: string | ReactNode }> = ({
  children,
  ...props
}) => {
  return (
    <div {...props} className={`${classes.Paper} ${props.className || ""}`}>
      {children}
    </div>
  )
}

export default Paper
