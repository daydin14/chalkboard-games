export const MAX_WRONG = 6

export const WORDS = [
  'react',
  'javascript',
  'hangman',
  'coding',
  'chalk',
  'eraser',
  'recess',
  'pencil',
  'notebook',
  'planet',
  'galaxy',
  'comet',
  'anchor',
  'voyage',
  'puzzle',
  'melody',
  'orchard',
  'lantern',
  'marble',
  'cactus',
  'bicycle',
  'window',
  'garden',
  'rocket',
]

export function pickWord(random = Math.random, previous) {
  const pool = WORDS.filter((word) => word !== previous)
  return pool[Math.floor(random() * pool.length)]
}

export function createRound(word) {
  return { word, guessed: [], wrong: 0, status: 'playing' }
}

export function applyGuess(round, letter) {
  const guess = letter.toLowerCase()
  if (round.status !== 'playing' || round.guessed.includes(guess) || !/^[a-z]$/.test(guess)) {
    return round
  }
  const guessed = [...round.guessed, guess]
  const wrong = round.wrong + (round.word.includes(guess) ? 0 : 1)
  const won = [...round.word].every((char) => guessed.includes(char))
  const lost = wrong >= MAX_WRONG
  return {
    ...round,
    guessed,
    wrong,
    status: won ? 'won' : lost ? 'lost' : 'playing',
  }
}
