import React, { useEffect, useRef } from 'react'
import SearchBar from './components/SearchBar'
import FilterBar from './components/FilterBar'
import ImageGrid from './components/ImageGrid'
import { useImageSearch } from './hooks/useImageSearch'
import styles from './App.module.css'

export default function App() {
  const {
    query,
    images,
    loading,
    error,
    totalHits,
    imageType,
    hasMore,
    search,
    loadMore,
    changeType,
  } = useImageSearch()

  const loaderRef = useRef(null)

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    if (!loaderRef.current || !hasMore || loading) return
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) loadMore() },
      { rootMargin: '200px' }
    )
    observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [hasMore, loading, loadMore])

  const showEmpty = query && !loading && images.length === 0 && !error

  return (
    <div className={styles.app}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <span className={styles.logo} aria-hidden="true">◈</span>
            <span className={styles.brandName}>PixaSearch</span>
          </div>
          <p className={styles.tagline}>Discover free images from Pixabay</p>
        </div>

        <SearchBar onSearch={search} loading={loading} />
      </header>

      {/* ── Main Content ── */}
      <main className={styles.main}>
        {/* Filter bar — only when we have results */}
        {(images.length > 0 || query) && (
          <FilterBar
            activeType={imageType}
            onTypeChange={changeType}
            totalHits={totalHits}
            query={query}
          />
        )}

        {/* Error state */}
        {error && (
          <div className={styles.stateBox} role="alert">
            <span className={styles.stateIcon} aria-hidden="true">⚠</span>
            <p className={styles.stateTitle}>Something went wrong</p>
            <p className={styles.stateMsg}>{error}</p>
            <button className={styles.retryBtn} onClick={() => search(query)}>
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {showEmpty && (
          <div className={styles.stateBox} role="status">
            <span className={styles.stateIcon} aria-hidden="true">🔍</span>
            <p className={styles.stateTitle}>No images found</p>
            <p className={styles.stateMsg}>
              Try a different keyword or adjust the filter.
            </p>
          </div>
        )}

        {/* Image grid */}
        <ImageGrid images={images} />

        {/* Inline loading skeletons on first load */}
        {loading && images.length === 0 && (
          <div className={styles.skeletonGrid} aria-label="Loading images" aria-busy="true">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={styles.skeletonCard} />
            ))}
          </div>
        )}

        {/* Load-more sentinel (infinite scroll) */}
        {images.length > 0 && (
          <div ref={loaderRef} className={styles.sentinel} aria-hidden="true">
            {loading && (
              <div className={styles.loadingMore}>
                <LoadingDots />
                <span>Loading more…</span>
              </div>
            )}
            {!hasMore && !loading && (
              <p className={styles.endMsg}>You've seen all {totalHits.toLocaleString()} results ✦</p>
            )}
          </div>
        )}

        {/* Hero placeholder — shown before any search */}
        {!query && images.length === 0 && (
          <div className={styles.hero}>
            <div className={styles.heroPattern} aria-hidden="true">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className={styles.heroTile} style={{ animationDelay: `${i * 0.12}s` }} />
              ))}
            </div>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>Find the perfect image</h1>
              <p className={styles.heroSub}>
                Search over 4 million free photos, illustrations and vectors
              </p>
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <p>
          Powered by{' '}
          <a href="https://pixabay.com" target="_blank" rel="noopener noreferrer">
            Pixabay
          </a>{' '}
          · Built by Harshit
        </p>
      </footer>
    </div>
  )
}

function LoadingDots() {
  return (
    <div className={styles.dots} aria-hidden="true">
      <span /><span /><span />
    </div>
  )
}
