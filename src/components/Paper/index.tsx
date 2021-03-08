import React, { FC, ReactNode } from "react"

import classes from "./Paper.module.scss"

interface PaperProps {
  children: ReactNode
  [key: string]: string | ReactNode
}

const Paper: FC<PaperProps> = ({ children, ...props }) => {
  return (
    <div {...props} className={`${classes.paper} ${props.className || ""}`}>
      {children}
    </div>
  )
}

export default Paper
