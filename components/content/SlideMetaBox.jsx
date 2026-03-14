function normalizeTopics(topics) {
  if (!Array.isArray(topics)) {
    return [];
  }

  return topics.filter((topic) => typeof topic === 'string' && topic.trim());
}

export default function SlideMetaBox({
  duration,
  goal,
  topics,
  slidePath = [],
}) {
  const items = normalizeTopics(topics);
  const basePath = Array.isArray(slidePath) ? slidePath.join('/') : '';
  const slideHref = basePath ? `/slides/${basePath}` : '';

  if (!duration && !goal && items.length === 0) {
    return null;
  }

  return (
    <section className="slide-meta-box">
      <div className="slide-meta-header">
        <p className="slide-meta-kicker">Folienansicht</p>
        <h2 className="slide-meta-title">Vorlesungsmeta</h2>
      </div>
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
        <div className="slide-meta-actions">
          <a
            className="slide-meta-link"
            href={slideHref}
            target="_blank"
            rel="noreferrer"
          >
            <span>Folien oeffnen</span>
            <small>Generierte Reveal-Ansicht aus dieser MDX-Seite</small>
          </a>
        </div>
      ) : null}
    </section>
  );
}
