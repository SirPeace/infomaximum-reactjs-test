import React, { VFC } from "react"

import { AppShellContext } from "../AppShell"
import classes from "./NavBar.module.scss"

const NavBar: VFC = () => {
  const { setDrawer } = React.useContext(AppShellContext)

  const handleLogout = () => {
    localStorage.removeItem("token")
  }

  return (
    <header className={classes.AppBar}>
      <div className={classes.barStart}>
        <button
          className={classes.drawerButton}
          onClick={() => setDrawer(true)}
        ></button>

        <nav>
          <span className={classes.navLink} onClick={() => setDrawer(true)}>
            Меню
          </span>
        </nav>
      </div>
      <div className={classes.barEnd}>
        <a href="/login" onClick={handleLogout} className={classes.logoutLink}>
          Выйти из системы
        </a>
      </div>
    </header>
  )
}

export default NavBar
