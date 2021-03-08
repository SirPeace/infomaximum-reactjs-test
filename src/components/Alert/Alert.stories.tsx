import React from "react"
import { Meta, Story } from "@storybook/react/types-6-0"

import Alert, { AlertProps } from "."

export default {
  title: "Alert",
  component: Alert,
} as Meta

export const Default: Story<AlertProps> = args => <Alert {...args} />
Default.args = {
  type: "default",
  message: "Информирующий текст",
  render: true,
}

export const Danger: Story<AlertProps> = args => <Alert {...args} />
Danger.args = {
  type: "danger",
  message: "Предостерегающий текст",
  render: true,
}

export const Sucess: Story<AlertProps> = args => <Alert {...args} />
Sucess.args = {
  type: "success",
  message: "Успешный текст",
  render: true,
}
