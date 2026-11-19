export const COLORS = ['red', 'green', 'yellow', 'blue']

export function nextColor(random = Math.random) {
  return COLORS[Math.floor(random() * COLORS.length)]
}

export function judgePress(sequence, index, color) {
  if (color !== sequence[index]) return 'wrong'
  if (index + 1 === sequence.length) return 'complete'
  return 'continue'
}
