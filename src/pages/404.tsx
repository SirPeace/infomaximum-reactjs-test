import React from "react"
import { Link } from "react-router-dom"

import classes from "./styles.module.scss"
import Paper from "../components/Paper"
import useTitle from "../utils/useTitle"
import { connect } from "react-redux"
import { State } from "../store"
import { UserState } from "../store/user/reducer"

const NotFound = ({ user }: { user: UserState }) => {
  useTitle("Ошибка авторизации")

  return (
    <div className={classes["LoginPage"]}>
      <div className={classes["LoginPage__container"]}>
        <div className={classes["logo"]}></div>
        <Paper className={classes.paper}>
          <div
            className={classes["paper__container"]}
            style={{ textAlign: "center" }}
          >
            <h1 style={{ fontSize: 22, margin: "20px 0" }}>
              Страница не найдена
            </h1>
            {JSON.stringify(user) !== "{}" ? (
              <Link to="/processes">Перейти к процессам</Link>
            ) : (
              <Link to="/login">Войти в систему</Link>
            )}
          </div>
        </Paper>
      </div>
    </div>
  )
}

const mapStateToProps = (state: State) => ({
  user: state.user,
})

export default connect(mapStateToProps)(NotFound)
