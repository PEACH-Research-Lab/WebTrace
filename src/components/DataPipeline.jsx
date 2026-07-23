import React from 'react'
import './DataPipeline.css'

export default function DataPipeline({ data }) {
  return (
    <section className="pipeline" id="method">
      <div className="wrap">
        <h2>Method</h2>

        {/* Full-width pipeline figure */}
        <figure className="pipeline__figure">
          <img src={data.figure} alt="Data construction pipeline" />
          <figcaption>{data.figureCaption}</figcaption>
        </figure>

        {/* §4.1 Generation steps */}
        <div className="pipeline__generation">
          <h3>{data.construction.title}</h3>
          <p className="pipeline__gen-intro">{data.construction.intro}</p>
          {data.construction.stages.map((stage, i) => (
            <div key={i} className="pipeline__step">
              <span className="pipeline__step-num">{i + 1}</span>
              <div>
                <strong>{stage.name}</strong>
                <p>{renderBold(stage.text)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* §4.2 Validation — row layout */}
        <div className="pipeline__validation">
          <h3>{data.validation.title}</h3>
          <p className="pipeline__val-intro">{data.validation.intro}</p>

          {data.validation.sections.map((sec) => (
            <div key={sec.id} className="val-row">
              {/* Left: prose */}
              <div className="val-row__text">
                <h4>
                  <span className="val-row__id">{sec.id}</span>
                  {sec.title}
                </h4>
                {sec.text.split('\n\n').map((p, i) => (
                  <p key={i}>{renderBold(p.trim())}</p>
                ))}
              </div>

              {/* Right: visual */}
              <div className="val-row__visual">
                {sec.visual === 'matrix' && (
                  <div className="val-matrix-wrap">
                    <table className="val-matrix">
                      <thead>
                        <tr>{sec.matrix.headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
                      </thead>
                      <tbody>
                        {sec.matrix.rows.map((row, i) => (
                          <tr key={i}>{row.map((c, j) => <td key={j}>{c}</td>)}</tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="val-matrix__caption">{sec.matrix.caption}</p>
                  </div>
                )}

                {sec.visual === 'bar' && (
                  <div className="val-bar-wrap">
                    <p className="val-bar__title">Breakdown of Extracted Attribute Mentions</p>
                    <div className="val-bar">
                      {sec.attributeBreakdown.map((seg, i) => (
                        <div
                          key={i}
                          className="val-bar__seg"
                          style={{ width: seg.pct + '%', background: seg.color }}
                        >
                          <span className="val-bar__pct">{seg.pct}%</span>
                        </div>
                      ))}
                    </div>
                    <div className="val-bar__legend">
                      {sec.attributeBreakdown.map((seg, i) => (
                        <span key={i}>
                          <i style={{ background: seg.color }} />
                          {seg.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {sec.visual === 'figure' && sec.figure && (
                  <figure className="val-fig">
                    <img src={sec.figure} alt={sec.title} />
                    <figcaption>{sec.figCaption}</figcaption>
                  </figure>
                )}

                {sec.visual === 'video' && sec.video && (
                <figure className="val-fig">
                  <video src={sec.video} controls muted loop playsInline autoPlay preload="metadata"
                    style={{ width: '100%', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                  <figcaption>{sec.figCaption}</figcaption>
                </figure>
              )}
              </div>
            </div>
          ))}
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
