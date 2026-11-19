import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink } from 'react-router-dom'
import { GAMES } from '../data/games'

function linkClass(isActive, roomy) {
  return `rounded-full font-medium transition-colors ${
    roomy ? 'px-3 py-3 text-base' : 'px-3 py-2 text-sm'
  } ${
    isActive
      ? 'bg-primary text-primary-content'
      : 'text-base-content/85 hover:bg-white/10 hover:text-primary'
  }`
}

export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#10261f]/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" onClick={close} className="flex min-w-0 items-center gap-2">
          <span
            aria-hidden="true"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-primary/40 bg-base-300 font-chalk text-xl text-primary"
          >
            C
          </span>
          <span className="truncate font-chalk text-[1.85rem] leading-none text-primary sm:text-4xl">
            Chalkboard Games
          </span>
        </Link>
        <button
          type="button"
          className="btn btn-ghost btn-sm shrink-0 md:hidden"
          aria-expanded={open}
          aria-controls="game-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Close' : 'Games'}
        </button>
      </div>

      <nav className="hidden border-t border-white/10 md:block" aria-label="Games">
        <ul className="mx-auto flex max-w-6xl flex-wrap gap-1 px-4 py-2">
          <li>
            <NavLink to="/" end className={({ isActive }) => linkClass(isActive, false)}>
              Home
            </NavLink>
          </li>
          {GAMES.map((game) => (
            <li key={game.id}>
              <NavLink to={game.path} className={({ isActive }) => linkClass(isActive, false)}>
                {game.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {createPortal(
        <div className={`fixed inset-0 z-50 overflow-hidden md:hidden ${open ? '' : 'pointer-events-none'}`} inert={!open}>
          <button
            type="button"
            className={`absolute inset-0 bg-[#06140f]/75 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
            onClick={close}
          />
          <nav
            id="game-nav"
            aria-label="Games"
            aria-hidden={!open}
            className={`absolute inset-y-0 right-0 flex w-[min(100%,19rem)] flex-col gap-1 overflow-y-auto border-l border-primary/30 bg-[#0e221c] p-4 shadow-2xl transition-transform ${
              open ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="font-chalk text-3xl text-primary">Games</p>
              <button type="button" className="btn btn-ghost btn-sm" onClick={close}>
                Close
              </button>
            </div>
            <NavLink to="/" end onClick={close} className={({ isActive }) => linkClass(isActive, true)}>
              Home
            </NavLink>
            {GAMES.map((game) => (
              <NavLink
                key={game.id}
                to={game.path}
                onClick={close}
                tabIndex={open ? 0 : -1}
                className={({ isActive }) => linkClass(isActive, true)}
              >
                {game.title}
              </NavLink>
            ))}
          </nav>
        </div>,
        document.body,
      )}
    </header>
  )
}
