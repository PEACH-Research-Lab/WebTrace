import React, { useState } from 'react'
import './BibTeX.css'

export default function BibTeX({ bibtex }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(bibtex) } catch {
      const ta = document.createElement('textarea'); ta.value = bibtex
      document.body.appendChild(ta); ta.select(); document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="bibtex" id="citation">
      <div className="wrap">
        <h2>BibTeX</h2>
        <div className="bibtex__wrapper">
          <button className="bibtex__copy" onClick={handleCopy}>
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          <pre className="bibtex__code"><code>{bibtex}</code></pre>
        </div>
      </div>
    </section>
  )
}
