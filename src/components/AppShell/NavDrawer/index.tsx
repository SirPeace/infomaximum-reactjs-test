import React, { VFC } from "react"
import { Link } from "react-router-dom"
import Backdrop, { BackdropProps } from "../../Backdrop"
import Drawer, { DrawerProps } from "../../Drawer"
import classes from "./NavDrawer.module.scss"

interface NavDrawerProps extends DrawerProps, BackdropProps {}

const NavDrawer: VFC<NavDrawerProps> = ({ active, close }) => {
  return (
    <>
      <Backdrop active={active} close={close} />
      <Drawer active={active}>
        <div className={classes.head}>
          <button
            className={`${classes.button} ${classes.darkButton}`}
            onClick={close}
          ></button>
          <i className={classes.logo}></i>
        </div>
        <nav className={classes.navigation}>
          <ul>
            <li className={classes.profileLink}>
              <Link to="profile" onClick={close}>
                Личный кабинет
              </Link>
            </li>
            <li className={classes.processesLink}>
              <Link to="processes" onClick={close}>
                Список процессов
              </Link>
            </li>
          </ul>
        </nav>
      </Drawer>
    </>
  )
}

export default NavDrawer
