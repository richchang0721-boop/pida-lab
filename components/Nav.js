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
        <li><Link href="/research">Research</Link></li>
        <li><Link href="/relational-effects" style={{color:'var(--accent)'}}>Relational Effects</Link></li>
        <li><Link href="/for-engineers">For Engineers</Link></li>
        <li><Link href="/for-governance">For Governance</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/demo" style={{color:'var(--accent)'}}>Demo</Link></li>
      </ul>
    </nav>
  )
}
