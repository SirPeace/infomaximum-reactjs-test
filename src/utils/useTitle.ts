import React from "react"

const useTitle = (title: string) => {
  React.useEffect(() => {
    document.title = `Proceset - ${title}`
  }, [title])
}

export default useTitle
