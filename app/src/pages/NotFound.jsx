import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Not found · Chalkboard Games')

  return (
    <div className="mx-auto max-w-lg py-16 text-center">
      <h1 className="font-chalk text-5xl text-primary">That page is not on the board</h1>
      <p className="mt-3 text-base-content/75">The link does not match a game.</p>
      <Link to="/" className="btn btn-primary mt-6 min-h-11">
        Back to the games
      </Link>
    </div>
  )
}
