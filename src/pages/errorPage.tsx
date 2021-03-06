import React, { VFC } from "react"
import { Link } from "react-router-dom"

import classes from "./styles.module.scss"
import Paper from "../components/Paper"
import useTitle from "../utils/useTitle"

interface ErrorPageProps {
  message: string
  links: { to: string; text: string }[]
  title: string
}

const ErrorPage: VFC<ErrorPageProps> = ({ message, links, title }) => {
  useTitle(title)

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
              {message || "Произошла ошибка"}
            </h1>
            <ul className="links">
              {links.map((link, i) => (
                <Link to={link.to} key={i}>
                  {link.text}
                </Link>
              ))}
            </ul>
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default ErrorPage
