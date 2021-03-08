import { Meta, Story } from "@storybook/react"
import React from "react"

import ProcessCard, { ProcessCardProps } from "."

export default {
  title: "ProcessCard",
  component: ProcessCard,
} as Meta

export const Default: Story<ProcessCardProps> = args => (
  <ProcessCard {...args} />
)
Default.args = {
  name: "Рассмотрение кредитной заявки",
  numberOfExecutions: 340487,
  numberOfScenarios: 129,
  averageActiveTime: "1ч 7 мин",
  averageLeadTime: "10ч 36 мин",
  employeesInvolvedProcess: 120,
  start: "11 ноября 2017",
  end: "6 января 2018",
  loading: "10 января 2018",
}
