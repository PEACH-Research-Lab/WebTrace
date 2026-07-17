import React from 'react'
import './Overview.css'

export default function Overview({ image, caption, abstract }) {
  const renderText = (raw) => {
    const parts = raw.split(/(\*\*.*?\*\*)/g)
    return parts.map((part, i) =>
      part.startsWith('**') && part.endsWith('**')
        ? <strong key={i}>{part.slice(2, -2)}</strong>
        : part
    )
  }

  const paragraphs = abstract.split('\n\n').map(p => p.trim()).filter(Boolean)

  return (
    <section className="overview" id="overview">
      <div className="wrap">
        <div className="overview__grid">
          <div className="overview__visual">
            {/* <img src={image} alt="Overview" className="overview__img" /> */}
            <p className="overview__caption">{caption}</p>
          </div>
          <div className="overview__text">
            <h2>Abstract</h2>
            {paragraphs.map((p, i) => (
              <p key={i}>{renderText(p)}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
