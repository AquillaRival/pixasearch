import React, { useState } from 'react'
import styles from './ImageGrid.module.css'

export default function ImageGrid({ images }) {
  if (images.length === 0) return null

  return (
    <div className={styles.grid} role="list" aria-label="Search results">
      {images.map((img, idx) => (
        <ImageCard key={`${img.id}-${idx}`} image={img} />
      ))}
    </div>
  )
}

function ImageCard({ image }) {
  const [loaded, setLoaded] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <article
        className={styles.card}
        role="listitem"
        onClick={() => setModalOpen(true)}
        onKeyDown={e => e.key === 'Enter' && setModalOpen(true)}
        tabIndex={0}
        aria-label={`Image: ${image.tags}`}
      >
        <div className={styles.imageWrapper}>
          {/* Skeleton loader */}
          {!loaded && <div className={styles.skeleton} aria-hidden="true" />}
          <img
            src={image.webformatURL}
            alt={image.tags || 'Pixabay image'}
            className={`${styles.img} ${loaded ? styles.visible : ''}`}
            onLoad={() => setLoaded(true)}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.overlay} aria-hidden="true">
            <div className={styles.overlayContent}>
              <ExpandIcon />
              <div className={styles.stats}>
                <Stat icon="❤" value={image.likes} />
                <Stat icon="⬇" value={image.downloads} />
                <Stat icon="👁" value={image.views} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.meta}>
          <span className={styles.author}>{image.user}</span>
          <span className={styles.tags} title={image.tags}>
            {image.tags.split(',').slice(0, 3).map(t => t.trim()).filter(Boolean).join(' · ')}
          </span>
        </div>
      </article>

      {modalOpen && (
        <ImageModal image={image} onClose={() => setModalOpen(false)} />
      )}
    </>
  )
}

function Stat({ icon, value }) {
  return (
    <span className={styles.stat}>
      <span aria-hidden="true">{icon}</span>
      {value?.toLocaleString()}
    </span>
  )
}

function ExpandIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  )
}

function ImageModal({ image, onClose }) {
  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className={styles.modalBackdrop}
      onClick={handleBackdrop}
      onKeyDown={e => e.key === 'Escape' && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`Full view: ${image.tags}`}
      tabIndex={-1}
    >
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          ✕
        </button>
        <img
          src={image.largeImageURL || image.webformatURL}
          alt={image.tags}
          className={styles.modalImg}
        />
        <div className={styles.modalMeta}>
          <div>
            <p className={styles.modalAuthor}>{image.user}</p>
            <p className={styles.modalTags}>{image.tags}</p>
          </div>
          <a
            href={image.pageURL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.pixabayLink}
            onClick={e => e.stopPropagation()}
          >
            View on Pixabay ↗
          </a>
        </div>
      </div>
    </div>
  )
}
