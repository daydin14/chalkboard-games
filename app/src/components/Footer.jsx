export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-10 border-t border-white/10 px-4 py-6 text-center text-sm text-base-content/70">
      <p>Chalkboard Games · {year}</p>
      <p className="mt-1">Made by David Aydin</p>
    </footer>
  )
}
