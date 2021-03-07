import moment from "moment"
import "moment/locale/ru"

export const formatDate = (timestamp: string): string =>
  moment
    .unix(+timestamp)
    .format("LL")
    .slice(0, -2)
