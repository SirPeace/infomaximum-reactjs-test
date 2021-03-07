import React from "react"
import { Meta, Story } from "@storybook/react"

import Input, { InputProps } from "."

export default {
  title: "Input",
  component: Input,
} as Meta

export const Default: Story<InputProps> = args => <Input {...args} />
Default.args = {
  placeholder: "Введите текст...",
  disabled: false,
}

export const WithError: Story<InputProps> = args => <Input {...args} />
WithError.args = {
  placeholder: "Введите текст...",
  error: true,
  errorMessage: "Поле должно быть заполнено",
  disabled: false,
}

export const Disabled: Story<InputProps> = args => <Input {...args} />
Disabled.args = {
  placeholder: "Введите текст...",
  disabled: true,
}
