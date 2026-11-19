import useDocumentTitle from '../hooks/useDocumentTitle'

const tones = {
  neutral: 'bg-white/8 text-base-content',
  success: 'bg-success/15 text-success',
  error: 'bg-error/15 text-error',
  warning: 'bg-warning/15 text-warning',
}

export function Status({ children, tone = 'neutral' }) {
  return (
    <p
      role="status"
      aria-live="polite"
      className={`min-h-9 rounded-full px-4 py-1.5 text-center text-sm font-semibold ${tones[tone]}`}
    >
      {children}
    </p>
  )
}

export function BoardFrame({ children, className = '' }) {
  return (
    <div className={`board-frame w-full ${className}`}>
      <div className="board-surface px-3 py-4 sm:px-6 sm:py-6">{children}</div>
    </div>
  )
}

export function GameShell({ title, lede, children }) {
  useDocumentTitle(`${title} · Chalkboard Games`)

  return (
    <article className="mx-auto w-full max-w-3xl">
      <header className="mb-5 text-center">
        <h1 className="font-chalk text-5xl leading-none text-primary sm:text-6xl">{title}</h1>
        <p className="mx-auto mt-2 max-w-lg text-sm text-base-content/75 sm:text-base">{lede}</p>
      </header>
      {children}
    </article>
  )
}
