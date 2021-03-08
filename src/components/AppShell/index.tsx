import React, { Dispatch, FC, SetStateAction } from "react"

import NavDrawer from "./NavDrawer"

export const AppShellContext = React.createContext<{
  drawer: boolean
  setDrawer: Dispatch<SetStateAction<boolean>>
}>({
  drawer: false,
  setDrawer: () => {},
})

const AppShell: FC = ({ children }) => {
  const [drawer, setDrawer] = React.useState(false)

  return (
    <AppShellContext.Provider value={{ drawer, setDrawer }}>
      <NavDrawer active={drawer} close={() => setDrawer(false)} />
      {children}
    </AppShellContext.Provider>
  )
}

export default AppShell
