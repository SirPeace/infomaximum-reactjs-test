export const calcDurationRatio = (first: string, second: string): string =>
  `${((+first / +second) * 100).toFixed(1)}%`
