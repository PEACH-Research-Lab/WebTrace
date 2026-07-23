import React, { useState } from 'react'
import './SampleVideos.css'

export default function SampleVideos({ samples }) {
  const [active, setActive] = useState(0)
  const s = samples[active]
  const hasFigures = s.figures && s.figures.length > 0
  const isStacked = s.layout === 'stacked'

  return (
    <section className="results-sec" id="results">
      <div className="wrap">
        <h2>Re-identification Results and Analysis</h2>

        <div className="results-tabs">
          {samples.map((item, i) => (
            <button
              key={i}
              className={`results-tab ${i === active ? 'results-tab--on' : ''}`}
              onClick={() => setActive(i)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="results-panel" key={active}>
          <h3 className="results-panel__title">{s.title}</h3>

          {isStacked ? (
            /* ── Stacked: text on top, figures below (full width) ── */
            <>
              <div className="results-panel__text">
                {s.body.split('\n\n').map((p, i) => (
                  <p key={i}>{renderBold(p.trim())}</p>
                ))}
              </div>
              {hasFigures && (
                <div className="results-panel__figures-row">
                  {s.figures.map((fig, i) => (
                    <figure key={i} className="results-fig">
                      {/* <img src={fig.src} alt="" /> */}
                      {fig.type === 'video' ? (
                        <video
                          src={fig.src}
                          controls
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <img src={fig.src} alt="" />
                      )}
                      <figcaption>{fig.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </>
          ) : (
            /* ── Default: text left, figures right ── */
            <div className={`results-panel__layout ${hasFigures ? 'results-panel__layout--split' : ''}`}>
              <div className="results-panel__text">
                {s.body.split('\n\n').map((p, i) => (
                  <p key={i}>{renderBold(p.trim())}</p>
                ))}
              </div>
              {hasFigures && (
                <div className="results-panel__figures">
                  {s.figures.map((fig, i) => (
                    <figure key={i} className="results-fig">
                      {/* <img src={fig.src} alt="" /> */}
                      {fig.type === 'video' ? (
                        <video
                          src={fig.src}
                          controls
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <img src={fig.src} alt="" />
                      )}
                      <figcaption>{fig.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function renderBold(text) {
  return text.split(/(\*\*.*?\*\*)/g).map((p, i) =>
    p.startsWith('**') && p.endsWith('**')
      ? <strong key={i}>{p.slice(2, -2)}</strong> : p
  )
}
