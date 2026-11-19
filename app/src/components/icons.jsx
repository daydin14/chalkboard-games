const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Frame({ children }) {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true" {...common}>
      {children}
    </svg>
  )
}

export function GameIcon({ id }) {
  switch (id) {
    case 'rps':
      return (
        <Frame>
          <path d="M16 30c0-6 2-8 6-8h4c4 0 6 2 6 8" />
          <path d="M18 22V14M24 22V12M30 22v-6" />
        </Frame>
      )
    case 'tictactoe':
      return (
        <Frame>
          <path d="M18 10v28M30 10v28M10 18h28M10 30h28" />
        </Frame>
      )
    case 'hangman':
      return (
        <Frame>
          <path d="M12 38h24M16 38V12h14M30 12v6" />
          <circle cx="30" cy="22" r="4" />
          <path d="M30 26v8M30 30l-5 4M30 30l5 4" />
        </Frame>
      )
    case 'connect4':
      return (
        <Frame>
          <circle cx="16" cy="16" r="4" />
          <circle cx="28" cy="16" r="4" />
          <circle cx="16" cy="28" r="4" />
          <circle cx="32" cy="32" r="4" />
        </Frame>
      )
    case 'memory':
      return (
        <Frame>
          <rect x="10" y="12" width="12" height="16" rx="2" />
          <rect x="26" y="20" width="12" height="16" rx="2" />
        </Frame>
      )
    case 'minesweeper':
      return (
        <Frame>
          <circle cx="24" cy="24" r="8" />
          <path d="M24 10v4M24 34v4M10 24h4M34 24h4M14 14l3 3M31 31l3 3M34 14l-3 3M17 31l-3 3" />
        </Frame>
      )
    case 'snake':
      return (
        <Frame>
          <path d="M14 32c6 0 6-8 12-8s6 8 10 8" />
          <circle cx="34" cy="20" r="2" fill="currentColor" stroke="none" />
        </Frame>
      )
    case 'simon':
      return (
        <Frame>
          <path d="M24 10a14 14 0 0 1 14 14H24z" />
          <path d="M38 24a14 14 0 0 1-14 14V24z" />
          <path d="M24 38A14 14 0 0 1 10 24h14z" />
          <path d="M10 24A14 14 0 0 1 24 10v14z" />
        </Frame>
      )
    case 'dots':
      return (
        <Frame>
          <circle cx="14" cy="14" r="2" fill="currentColor" stroke="none" />
          <circle cx="34" cy="14" r="2" fill="currentColor" stroke="none" />
          <circle cx="14" cy="34" r="2" fill="currentColor" stroke="none" />
          <circle cx="34" cy="34" r="2" fill="currentColor" stroke="none" />
          <path d="M16 14h16M14 16v16M34 16v16" />
        </Frame>
      )
    case 'battleship':
      return (
        <Frame>
          <path d="M8 30h32l-4 6H12z" />
          <path d="M18 30V20h8l6 10" />
          <path d="M22 20v-4" />
        </Frame>
      )
    default:
      return null
  }
}
