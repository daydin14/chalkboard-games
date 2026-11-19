export const CHOICES = ['rock', 'paper', 'scissors']

const beats = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
}

export function judge(player, computer) {
  if (player === computer) return 'tie'
  return beats[player] === computer ? 'win' : 'lose'
}

export function computerThrow(random = Math.random) {
  return CHOICES[Math.floor(random() * CHOICES.length)]
}
