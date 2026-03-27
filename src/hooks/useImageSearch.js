import { useState, useCallback, useRef } from 'react'
import { searchImages } from '../utils/pixabay'

const PER_PAGE = 20

/**
 * Manages all image-search state: loading, errors, pagination, results.
 */
export function useImageSearch() {
  const [query, setQuery] = useState('')
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [totalHits, setTotalHits] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [imageType, setImageType] = useState('all')

  // Abort controller ref to cancel in-flight requests
  const abortRef = useRef(null)

  const runSearch = useCallback(async (q, pg, type) => {
    if (!q.trim()) return

    // Cancel any previous in-flight request
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setError(null)

    try {
      const result = await searchImages({ query: q, page: pg, perPage: PER_PAGE, imageType: type })
      setImages(prev => (pg === 1 ? result.images : [...prev, ...result.images]))
      setTotalHits(result.totalHits)
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  /** Trigger a fresh search (resets page to 1) */
  const search = useCallback((q, type = imageType) => {
    setQuery(q)
    setPage(1)
    setImages([])
    runSearch(q, 1, type)
  }, [imageType, runSearch])

  /** Load the next page */
  const loadMore = useCallback(() => {
    const nextPage = page + 1
    setPage(nextPage)
    runSearch(query, nextPage, imageType)
  }, [page, query, imageType, runSearch])

  /** Change image type filter */
  const changeType = useCallback((type) => {
    setImageType(type)
    if (query) search(query, type)
  }, [query, search])

  const hasMore = images.length < totalHits

  return {
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
  }
}
