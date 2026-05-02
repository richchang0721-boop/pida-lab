import Link from 'next/link'

export default function Nav() {
  return (
    <nav>
      <div className="nav-brand">
        <Link href="/"><span className="nav-logo">PIDA-LAB</span></Link>
        <span className="nav-subtitle">Rethinking AI Systems, Decision &amp; Responsibility</span>
      </div>
      <ul className="nav-links">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/categories">Categories</Link></li>
        <li><Link href="/posts">All Posts</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/demo" style={{color:'var(--accent)'}}>Demo</Link></li>
      </ul>
    </nav>
  )
}
