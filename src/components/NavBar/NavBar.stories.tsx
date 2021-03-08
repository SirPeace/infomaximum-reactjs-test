import { Meta, Story } from "@storybook/react"
import React from "react"

import NavBar from "."
import NavDrawer from "../AppShell/NavDrawer"
import Drawer from "../Drawer"
import Backdrop from "../Backdrop"

export default {
  title: "NavBar",
  component: NavBar,
  subcomponents: {
    NavDrawer,
    Drawer,
    Backdrop,
  },
} as Meta

export const Default: Story = args => (
  <div style={{ position: "relative" }}>
    <NavBar {...args} />
  </div>
)
