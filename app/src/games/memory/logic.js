export const SYMBOLS = ['★', '●', '▲', '◆', '♥', '✿', '✦', '☂']

export function createDeck(random = Math.random) {
  const deck = SYMBOLS.flatMap((symbol, index) => [
    { key: `${symbol}-a-${index}`, symbol },
    { key: `${symbol}-b-${index}`, symbol },
  ])
  for (let index = deck.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1))
    ;[deck[index], deck[swap]] = [deck[swap], deck[index]]
  }
  return deck
}
