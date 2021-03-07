import React from "react"
import { Meta, Story } from "@storybook/react/types-6-0"

import Button, { ButtonProps } from "."

export default {
  title: "Button",
  component: Button,
} as Meta

export const Default: Story<ButtonProps> = args => <Button {...args} />
Default.args = {
  children: "Кнопка",
  expand: false,
  loading: false,
}

export const Expanded: Story<ButtonProps> = args => <Button {...args} />
Expanded.args = {
  children: "Кнопка",
  expand: true,
  loading: false,
}

export const Loading: Story<ButtonProps> = args => <Button {...args} />
Loading.args = {
  children: "Кнопка",
  expand: false,
  loading: true,
}
