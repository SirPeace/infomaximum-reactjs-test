import { Meta, Story } from "@storybook/react"
import React from "react"

import Paper from "."

export default {
  title: "Paper",
  component: Paper,
} as Meta

export const Default: Story = args => (
  <Paper {...args}>
    <h1 style={{ fontFamily: "Open Sans" }}>Компонент карточки</h1>
  </Paper>
)
Default.args = {
  //
}
