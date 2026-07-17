import React from 'react'
import './Footer.css'

export default function Footer({ data }) {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          © {data.year} {data.projectName}
          {data.links.map((link, i) => (
            <span key={i}>
              {' · '}
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </span>
          ))}
        </p>
      </div>
    </footer>
  )
}
