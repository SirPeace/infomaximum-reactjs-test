import React from "react"
import { Meta, Story } from "@storybook/react"

import PasswordInput, { PasswordInputProps } from "."

export default {
  title: "PasswordInput",
  component: PasswordInput,
} as Meta

export const PasswordDefault: Story<PasswordInputProps> = args => (
  <PasswordInput {...args} />
)
PasswordDefault.args = {
  placeholder: "Введите пароль...",
  error: false,
  errorMessage: "",
  disabled: false,
}

export const PasswordWithError: Story<PasswordInputProps> = args => (
  <PasswordInput {...args} />
)
PasswordWithError.args = {
  placeholder: "Введите пароль...",
  error: true,
  errorMessage: "Пароль должен содержать не менее 10 символов!",
  value: "123456789",
  disabled: false,
}

export const PasswordDisabled: Story<PasswordInputProps> = args => (
  <PasswordInput {...args} />
)
PasswordDisabled.args = {
  value: "123456789",
  disabled: true,
}
