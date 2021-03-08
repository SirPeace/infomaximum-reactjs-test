import React, { VFC } from "react"

import { AppShellContext } from "../AppShell"
import classes from "./NavBar.module.scss"

const NavBar: VFC = () => {
  const { setDrawer } = React.useContext(AppShellContext)

  const handleLogout = () => {
    localStorage.removeItem("token")
  }

  return (
    <>
      <header className={classes["app-bar"]}>
        <div className={classes.barStart}>
          <button
            className={classes["drawer-button"]}
            onClick={() => setDrawer(true)}
          ></button>

          <nav className={classes["app-bar__nav"]}>
            <span
              className={classes["app-bar__nav-link"]}
              onClick={() => setDrawer(true)}
            >
              Меню
            </span>
          </nav>
        </div>
        <div className={classes.barEnd}>
          <a
            href="/login"
            onClick={handleLogout}
            className={classes.logoutLink}
          >
            Выйти из системы
          </a>
        </div>
      </header>
    </>
  )
}

export default NavBar
