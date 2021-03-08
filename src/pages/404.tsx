import React from "react"
import { Link } from "react-router-dom"
import { useQuery } from "@apollo/client"

import classes from "./styles.module.scss"
import { CurrentUser } from "../server/queries"
import Paper from "../components/Paper"
import useTitle from "../utils/useTitle"

const NotFound = () => {
  useTitle("Ошибка авторизации")

  const {
    data: { currentUser },
  } = useQuery(CurrentUser)

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
            {currentUser ? (
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

export default NotFound
