import React, { VFC } from "react"
import loader from "./loader.svg"

const Loader: VFC<{ width?: number; height?: number }> = ({
  width = 80,
  height = 80,
}) => {
  return (
    <div style={{ textAlign: "center" }}>
      <img src={loader} alt="Загрузка..." width={width} height={height} />
    </div>
  )
}

export default Loader
