import React, { useState, useEffect } from 'react'
import './NavBar.css'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'method', label: 'Method' },
  // { id: 'benchmarks', label: 'Benchmarks' },
  { id: 'results', label: 'Results' },
  { id: 'citation', label: 'Citation' },
]

export default function NavBar({ title }) {
  const [active, setActive] = useState('overview')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const offsets = sections
        .map((s) => {
          const el = document.getElementById(s.id)
          return el ? { id: s.id, top: el.getBoundingClientRect().top } : null
        })
        .filter(Boolean)
      const current = offsets
        .filter((o) => o.top <= 100)
        .pop()
      if (current) setActive(current.id)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="wrap navbar__inner">
        <span className="navbar__brand">{title}</span>
        <div className="navbar__links">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`navbar__link ${active === s.id ? 'navbar__link--active' : ''}`}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
