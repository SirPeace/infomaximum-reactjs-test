import React, { VFC } from "react"
import { Link } from "react-router-dom"

import classes from "./ProcessCard.module.scss"
import { calcDurationRatio } from "./utils/calcDurationRatio"
import { formatDate } from "./utils/formatDate"
import { formatDuration } from "./utils/formatDuration"
import { formatNumber } from "./utils/formatNumber"

export interface ProcessCardProps {
  name: string
  numberOfExecutions: number
  averageLeadTime: string
  averageActiveTime: string
  employeesInvolvedProcess: number
  numberOfScenarios: number
  start: string
  end: string
  loading: string
  forwardTo?: string | false
}

const ProcessCard: VFC<ProcessCardProps> = ({
  name,
  numberOfExecutions,
  numberOfScenarios,
  averageActiveTime,
  averageLeadTime,
  employeesInvolvedProcess,
  start,
  end,
  loading,
  forwardTo = false,
}) => (
  <article className={classes.ProcessCard}>
    <header className={classes.head}>
      <h3 className={classes.title}>{name}</h3>
      {forwardTo ? (
        <Link
          to={forwardTo}
          className={`${classes.link} ${classes.link_active}`}
        >
          На карту процесса
        </Link>
      ) : (
        <span className={classes.link}>На карту процесса</span>
      )}
    </header>

    <hr className={classes.hr} />

    <div className={classes.body}>
      <section className={`${classes.metric} ${classes.metric_quantity}`}>
        <h1 className={classes.heading_1}>
          {formatNumber(numberOfExecutions)}
        </h1>
        <h5 className={classes.heading_5}>выполнено раз</h5>
      </section>

      <section className={`${classes.metric} ${classes.metric_execution}`}>
        <h3 className={classes.heading_3}>{formatDuration(averageLeadTime)}</h3>
        <h5 className={classes.heading_5}>среднее время выполнения</h5>
      </section>
      <section className={`${classes.metric} ${classes.metric_activeTime}`}>
        <h3 className={classes.heading_3}>
          {formatDuration(averageActiveTime)} (
          {calcDurationRatio(averageActiveTime, averageLeadTime)})
        </h3>
        <h5 className={classes.heading_5}>среднее активное время</h5>
      </section>
      <section className={`${classes.metric} ${classes.metric_employees}`}>
        <h3 className={classes.heading_3}>
          {formatNumber(employeesInvolvedProcess)} сотрудников
        </h3>
        <h5 className={classes.heading_5}>участвует в процессе</h5>
      </section>
      <section className={`${classes.metric} ${classes.metric_scenarios}`}>
        <h3 className={classes.heading_3}>
          {formatNumber(numberOfScenarios)} сценариев
        </h3>
        <h5 className={classes.heading_5}>в процессе</h5>
      </section>

      <section className={classes.dateGrid}>
        <h5 className={classes.heading_5}>Начало</h5>
        <h5 className={`${classes.date} ${classes.heading_5}`}>
          {formatDate(start)}
        </h5>
        <h5 className={classes.heading_5}>Окончание</h5>
        <h5 className={`${classes.date} ${classes.heading_5}`}>
          {formatDate(end)}
        </h5>
        <h5 className={classes.heading_5}>Загрузка</h5>
        <h5 className={`${classes.date} ${classes.heading_5}`}>
          {formatDate(loading)}
        </h5>
      </section>
    </div>
  </article>
)

export default ProcessCard
