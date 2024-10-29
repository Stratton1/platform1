import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="navigation">
      <Link href="/">Home</Link>
      <Link href="/vault">Vault</Link>
      <Link href="/diary">Diary</Link>
      <Link href="/timeline">Timeline</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/login">Login</Link>
      <Link href="/signup">Sign Up</Link>
    </nav>
  )
} 