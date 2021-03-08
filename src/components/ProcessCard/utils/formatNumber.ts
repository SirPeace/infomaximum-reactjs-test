export const formatNumber = (value: number): string => {
  const result = []
  const val = String(value)

  let passed = 1
  for (let i = val.length - 1; i >= 0; i--, passed++) {
    if (passed % 3 === 0) {
      result.push(val[i], " ")
    } else {
      result.push(val[i])
    }
  }

  return result.reverse().join("")
}
