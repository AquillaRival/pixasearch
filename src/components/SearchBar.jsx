import React, { useState, useRef } from 'react'
import styles from './SearchBar.module.css'

const SUGGESTIONS = ['nature', 'architecture', 'technology', 'travel', 'abstract', 'animals']

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim()) onSearch(value.trim())
  }

  const handleSuggestion = (s) => {
    setValue(s)
    onSearch(s)
    inputRef.current?.focus()
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit} role="search">
        <div className={styles.inputWrapper}>
          <SearchIcon className={styles.searchIcon} />
          <input
            ref={inputRef}
            className={styles.input}
            type="search"
            placeholder="Search millions of images…"
            value={value}
            onChange={e => setValue(e.target.value)}
            aria-label="Search images"
            autoComplete="off"
            spellCheck="false"
          />
          <button
            className={styles.btn}
            type="submit"
            disabled={!value.trim() || loading}
            aria-label="Search"
          >
            {loading ? <Spinner /> : 'Search'}
          </button>
        </div>
      </form>

      <div className={styles.suggestions} aria-label="Search suggestions">
        <span className={styles.suggestLabel}>Try:</span>
        {SUGGESTIONS.map(s => (
          <button key={s} className={styles.chip} onClick={() => handleSuggestion(s)}>
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}

function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" style={{ animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); transform-origin: 12px 12px; } }`}</style>
    </svg>
  )
}
