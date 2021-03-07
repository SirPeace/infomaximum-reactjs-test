import React, { FC } from "react"
import classes from "./Drawer.module.scss"

export interface DrawerProps {
  active: boolean
}

const Drawer: FC<DrawerProps> = ({ active, children }) => {
  return (
    <div className={`${classes.Drawer} ${active && classes.active}`}>
      {children}
    </div>
  )
}

export default Drawer
