import React from 'react'
import styles from './FilterBar.module.css'

const TYPES = [
  { value: 'all', label: 'All' },
  { value: 'photo', label: 'Photos' },
  { value: 'illustration', label: 'Illustrations' },
  { value: 'vector', label: 'Vectors' },
]

export default function FilterBar({ activeType, onTypeChange, totalHits, query }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.filters} role="group" aria-label="Image type filter">
        {TYPES.map(t => (
          <button
            key={t.value}
            className={`${styles.filterBtn} ${activeType === t.value ? styles.active : ''}`}
            onClick={() => onTypeChange(t.value)}
            aria-pressed={activeType === t.value}
          >
            {t.label}
          </button>
        ))}
      </div>

      {query && totalHits > 0 && (
        <p className={styles.count}>
          <span>{totalHits.toLocaleString()}</span> results for <em>"{query}"</em>
        </p>
      )}
    </div>
  )
}
