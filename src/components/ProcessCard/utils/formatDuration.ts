import moment from "moment"

export const formatDuration = (duration: string): string =>
  `${moment.duration(duration).asHours().toFixed(0)}ч ${moment
    .duration(duration)
    .minutes()
    .toFixed(0)} мин`
