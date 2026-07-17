import React, { useRef, useEffect, useState } from 'react'
import './Hero.css'

export default function Hero({ data }) {
  const linksRef = useRef(null)
  const boxRef = useRef(null)
  const [arrows, setArrows] = useState(null)

  useEffect(() => {
    if (!data.highlight || !linksRef.current || !boxRef.current) return

    const draw = () => {
      const container = linksRef.current.closest('.hero')
      if (!container) return
      const cr = container.getBoundingClientRect()

      const findBtn = (label) => {
        let found = null
        linksRef.current.querySelectorAll('.hero__btn').forEach((b) => {
          if (b.dataset.label === label) found = b
        })
        return found
      }

      const boxRect = boxRef.current.getBoundingClientRect()
      const result = { w: cr.width, h: cr.height, paths: [] }

      // ── Arrow 1: Dataset button → left side of highlight box ──
      const btn1 = findBtn(data.highlight.arrowFrom)
      if (btn1) {
        const br = btn1.getBoundingClientRect()
        const x1 = br.left + br.width / 2 - cr.left
        const y1 = br.bottom - cr.top + 2
        // Point to ~28% from left of box (where "conversation dataset" text is)
        const x2 = boxRect.left + boxRect.width * 0.28 - cr.left
        const y2 = boxRect.top - cr.top - 2
        // Stronger curve: offset control points horizontally
        const cpx1 = x1 + (x2 - x1) * 0.15
        const cpy1 = y1 + (y2 - y1) * 0.6
        const cpx2 = x2 - (x2 - x1) * 0.05
        const cpy2 = y1 + (y2 - y1) * 0.4
        result.paths.push(`M ${x1} ${y1} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${x2} ${y2}`)
      }

      // ── Arrow 2: right side of highlight box → Evaluation Space button ──
      if (data.highlight.arrowTo) {
        const btn2 = findBtn(data.highlight.arrowTo)
        if (btn2) {
          const br = btn2.getBoundingClientRect()
          // Start from ~82% from left of box (where "evaluation service" text is)
          const x1 = boxRect.left + boxRect.width * 0.82 - cr.left
          const y1 = boxRect.top - cr.top - 2
          // End at bottom-center of target button
          const x2 = br.left + br.width / 2 - cr.left
          const y2 = br.bottom - cr.top + 2
          // Curve upward
          const cpx1 = x1 + (x2 - x1) * 0.05
          const cpy1 = y1 - (y1 - y2) * 0.4
          const cpx2 = x2 - (x2 - x1) * 0.15
          const cpy2 = y1 - (y1 - y2) * 0.6
          result.paths.push(`M ${x1} ${y1} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${x2} ${y2}`)
        }
      }

      setArrows(result)
    }

    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [data.highlight])

  const renderBold = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g)
    return parts.map((p, i) =>
      p.startsWith('**') && p.endsWith('**')
        ? <strong key={i}>{p.slice(2, -2)}</strong>
        : p
    )
  }

  return (
    <header className="hero">
      <div className="wrap">
        <h1 className="hero__title">
          {data.logo && <img src={data.logo} alt="" className="hero__logo" />}
          {data.title}
        </h1>
        {data.subtitle && <p className="hero__sub">{data.subtitle}</p>}

        <div className="hero__authors">
          {data.authors.map((a, i) => (
            <span key={i}>
              {a.url ? (
                <a href={a.url} target="_blank" rel="noopener noreferrer">{a.name}</a>
              ) : (
                a.name
              )}
              <sup>{a.affiliations.join(',')}</sup>
              {i < data.authors.length - 1 && ',  '}
            </span>
          ))}
        </div>
        <div className="hero__affs">
          {data.affiliations.map((af, i) => (
            <span key={af.id}>
              <sup>{af.id}</sup>{af.name}
              {i < data.affiliations.length - 1 && '   '}
            </span>
          ))}
        </div>

        <div className="hero__links" ref={linksRef}>
          {data.links.map((l) => (
            <a
              key={l.label}
              href={l.url}
              className="hero__btn"
              data-label={l.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.icon && (l.icon.startsWith('http') || l.icon.startsWith('/'))
                ? <img src={l.icon} alt="" className="hero__btn-icon" />
                : <span>{l.icon}</span>
              } {l.label}
            </a>
          ))}
        </div>

        {data.highlight && (
          <div className="hero__highlight-area">
            <div className="hero__highlight" ref={boxRef}>
              <p>{renderBold(data.highlight.text)}</p>
            </div>
          </div>
        )}
      </div>

      {/* SVG arrows overlay */}
      {arrows && arrows.paths.length > 0 && (
        <svg className="hero__arrow-svg" viewBox={`0 0 ${arrows.w} ${arrows.h}`} preserveAspectRatio="none">
          <defs>
            <marker id="arrowhead-down" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#2563eb" />
            </marker>
            <marker id="arrowhead-up" markerWidth="8" markerHeight="6" refX="1" refY="3" orient="auto">
              <polygon points="8 0, 0 3, 8 6" fill="#2563eb" />
            </marker>
          </defs>
          {arrows.paths.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="#2563eb"
              strokeWidth="1.8"
              strokeDasharray="6 4"
              markerEnd={i === 0 ? 'url(#arrowhead-down)' : undefined}
              markerStart={i === 1 ? 'url(#arrowhead-up)' : undefined}
            />
          ))}
        </svg>
      )}
    </header>
  )
}
