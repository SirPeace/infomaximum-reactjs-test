import React, { VFC } from "react"
import { CSSTransition } from "react-transition-group"
import classes from "./Backdrop.module.scss"

export interface BackdropProps {
  active: boolean
  close?: () => void
}

const Backdrop: VFC<BackdropProps> = ({ active, close }) => (
  <CSSTransition
    in={active}
    timeout={300}
    mountOnEnter
    unmountOnExit
    classNames={{
      enter: classes.enter,
      enterActive: classes.enterActive,
      exitActive: classes.exitActive,
      exitDone: classes.exitDone,
    }}
  >
    <div className={classes.Backdrop} onClick={close} />
  </CSSTransition>
)

export default Backdrop
