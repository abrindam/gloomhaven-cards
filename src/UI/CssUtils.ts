export function aspectRatioVW(vwValue: number) {
  const func = vwValue < 0 ? "max" : "min"
  return `${func}(${vwValue}vw, ${vwValue * 16 / 10}vh)`
}

export function aspectRatioVH(vhValue: number) {
  const func = vhValue < 0 ? "max" : "min"
  return `${func}(${vhValue * 10 / 16}vw, ${vhValue }vh)`
}