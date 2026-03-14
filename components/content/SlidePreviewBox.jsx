function normalizeTopics(topics) {
  if (!Array.isArray(topics)) {
    return [];
  }

  return topics.filter((topic) => typeof topic === 'string' && topic.trim());
}

export default function SlidePreviewBox({
  duration,
  goal,
  topics,
  slidePath = [],
}) {
  const items = normalizeTopics(topics);
  const basePath = Array.isArray(slidePath) ? slidePath.join('/') : '';
  const slideHref = basePath ? `/slides/${basePath}` : '';

  if (!duration && !goal && items.length === 0 && !slideHref) {
    return null;
  }

  return (
    <section className="slide-meta-box">
      <details className="slide-preview-details">
        <summary className="slide-preview-toggle">
          <span className="slide-preview-label">Folienvorschau</span>
          <span className="slide-preview-chevron" aria-hidden="true">▾</span>
        </summary>
        <div className="slide-preview-panel">
          {duration || goal ? (
            <dl className="slide-meta-grid">
              {duration ? (
                <div className="slide-meta-card">
                  <dt>Dauer</dt>
                  <dd>{duration}</dd>
                </div>
              ) : null}
              {goal ? (
                <div className="slide-meta-card">
                  <dt>Ziel</dt>
                  <dd>{goal}</dd>
                </div>
              ) : null}
            </dl>
          ) : null}
          {items.length > 0 ? (
            <div className="slide-meta-topics">
              <h3>Themen</h3>
              <ul>
                {items.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {slideHref ? (
            <div className="slide-preview-container">
              <iframe
                src={`${slideHref}?embedded=1`}
                className="slide-preview-iframe"
                title="Folienvorschau"
                loading="lazy"
                allowFullScreen
                allow="fullscreen"
                tabIndex={0}
              />
              <div className="slide-preview-toolbar">
                <span className="slide-preview-hint">
                  Klicken für Tastaturnavigation · F für Vollbild
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </details>
      {slideHref ? (
        <a
          className="slide-preview-cta"
          href={slideHref}
          target="_blank"
          rel="noreferrer"
        >
          Präsentation starten{duration ? ` · ${duration}` : ''} ↗
        </a>
      ) : null}
    </section>
  );
}
