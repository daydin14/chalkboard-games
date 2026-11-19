import { Link } from 'react-router-dom'
import { GAMES } from '../data/games'
import { GameIcon } from '../components/icons'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function Home() {
  useDocumentTitle('Chalkboard Games')

  return (
    <div className="mx-auto w-full max-w-6xl">
      <header className="mx-auto mb-8 max-w-2xl text-center">
        <p className="text-xs font-semibold tracking-[0.22em] text-primary/80 uppercase">
          A quiet arcade
        </p>
        <h1 className="mt-2 font-chalk text-5xl leading-none text-primary sm:text-6xl">Pick a game</h1>
        <p className="mt-3 text-base text-base-content/75">
          Ten classics on one chalkboard. Pass the phone, or play the board on your own.
        </p>
      </header>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {GAMES.map((game) => (
          <li key={game.id}>
            <Link to={game.path} className="slate-card group flex h-full flex-col gap-3 p-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/25 bg-black/15 text-primary">
                <GameIcon id={game.id} />
              </span>
              <span className="text-xs font-semibold tracking-wide text-accent/90 uppercase">
                {game.players}
              </span>
              <h2 className="font-chalk text-4xl leading-none text-primary">{game.title}</h2>
              <p className="text-sm leading-relaxed text-base-content/80">{game.blurb}</p>
              <span className="mt-auto text-sm font-semibold text-primary">Play</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
