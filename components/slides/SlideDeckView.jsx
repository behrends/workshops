import { Fragment } from 'react';
import RevealDeck, { Slide } from './RevealDeck';

export default function SlideDeckView({ slides, embedded = false }) {
  return (
    <RevealDeck embedded={embedded}>
      {slides.map((slide, index) =>
        slide.kind === 'title' ? (
          <Slide key={`title-${index}`}>
            <div className="title-slide">
              <h1>{slide.title}</h1>
              {slide.duration || slide.goal ? (
                <div className="title-slide-meta">
                  {slide.duration ? (
                    <span className="title-slide-chip">{slide.duration}</span>
                  ) : null}
                  {slide.goal ? (
                    <span className="title-slide-chip">{slide.goal}</span>
                  ) : null}
                </div>
              ) : null}
            </div>
          </Slide>
        ) : (
          <Slide key={`${slide.title}-${slide.segmentIndex}-${index}`}>
            <div className="generated-slide">
              <h2>{slide.title}</h2>
              {slide.blocks.map((block, blockIndex) =>
                renderBlock(block, `${slide.title}-${blockIndex}`),
              )}
            </div>
          </Slide>
        ),
      )}
    </RevealDeck>
  );
}

function renderBlock(block, key) {
  switch (block.type) {
    case 'lead':
      return (
        <p key={key} className="slide-lead">
          {renderInlineChildren(block.children, key)}
        </p>
      );
    case 'paragraph':
      return <p key={key}>{renderInlineChildren(block.children, key)}</p>;
    case 'heading': {
      const Tag = `h${Math.min(block.depth, 6)}`;
      return <Tag key={key}>{renderInlineChildren(block.children, key)}</Tag>;
    }
    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag key={key} start={block.ordered ? block.start : undefined}>
          {block.items.map((item, index) => (
            <li key={`${key}-item-${index}`}>
              {renderInlineChildren(item, `${key}-item-${index}`)}
            </li>
          ))}
        </Tag>
      );
    }
    case 'code':
      return (
        <pre key={key}>
          <code className={block.lang ? `language-${block.lang}` : undefined}>
            {block.value}
          </code>
        </pre>
      );
    case 'table':
      return (
        <table key={key}>
          <thead>
            <tr>
              {block.headers.map((cell, index) => (
                <th key={`${key}-head-${index}`}>
                  {renderInlineChildren(cell, `${key}-head-${index}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={`${key}-row-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td key={`${key}-row-${rowIndex}-cell-${cellIndex}`}>
                    {renderInlineChildren(
                      cell,
                      `${key}-row-${rowIndex}-cell-${cellIndex}`,
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    case 'image':
      return (
        <figure key={key} className="slide-figure">
          <img src={block.url} alt={block.alt || ''} />
          {block.alt ? <figcaption>{block.alt}</figcaption> : null}
        </figure>
      );
    case 'callout':
      return (
        <aside
          key={key}
          className={`slide-callout slide-callout-${block.calloutType}`}
        >
          <div className="slide-callout-title">
            {block.emoji ? <span>{block.emoji}</span> : null}
            <span>{calloutLabel(block.calloutType)}</span>
          </div>
          {block.blocks.map((child, index) =>
            renderBlock(child, `${key}-callout-${index}`),
          )}
        </aside>
      );
    case 'blockquote':
      return (
        <blockquote key={key}>
          {block.blocks.map((child, index) =>
            renderBlock(child, `${key}-quote-${index}`),
          )}
        </blockquote>
      );
    default:
      return null;
  }
}

function renderInlineChildren(children, keyPrefix) {
  return children.map((child, index) => {
    const key = `${keyPrefix}-inline-${index}`;

    switch (child.type) {
      case 'text':
        return <Fragment key={key}>{child.value}</Fragment>;
      case 'strong':
        return <strong key={key}>{renderInlineChildren(child.children, key)}</strong>;
      case 'emphasis':
        return <em key={key}>{renderInlineChildren(child.children, key)}</em>;
      case 'delete':
        return <del key={key}>{renderInlineChildren(child.children, key)}</del>;
      case 'inlineCode':
        return <code key={key}>{child.value}</code>;
      case 'link':
        return (
          <a key={key} href={child.url} target="_blank" rel="noreferrer">
            {renderInlineChildren(child.children, key)}
          </a>
        );
      case 'mark':
        return <mark key={key}>{renderInlineChildren(child.children, key)}</mark>;
      case 'break':
        return <br key={key} />;
      default:
        return null;
    }
  });
}

function calloutLabel(type) {
  switch (type) {
    case 'warning':
      return 'Hinweis';
    case 'error':
      return 'Achtung';
    case 'important':
      return 'Wichtig';
    case 'info':
      return 'Info';
    default:
      return 'Kontext';
  }
}
