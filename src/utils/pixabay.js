/**
 * Pixabay API client
 * Docs: https://pixabay.com/api/docs/#api_search_images
 */

const BASE_URL = 'https://pixabay.com/api/'

/**
 * @param {string} query      - Search term
 * @param {number} page       - Page number (default 1)
 * @param {number} perPage    - Results per page (3–200, default 20)
 * @param {string} imageType  - 'all' | 'photo' | 'illustration' | 'vector'
 * @returns {Promise<{ images: PixabayImage[], totalHits: number, total: number }>}
 */
export async function searchImages({ query, page = 1, perPage = 20, imageType = 'all' }) {
  const apiKey = import.meta.env.VITE_PIXABAY_API_KEY
  if (!apiKey) throw new Error('VITE_PIXABAY_API_KEY is not set in .env')

  const params = new URLSearchParams({
    key: apiKey,
    q: query.trim(),
    image_type: imageType,
    page: String(page),
    per_page: String(perPage),
    safesearch: 'true',
    lang: 'en',
  })

  const res = await fetch(`${BASE_URL}?${params}`)
  if (!res.ok) throw new Error(`Pixabay API error: ${res.status} ${res.statusText}`)

  const data = await res.json()
  return {
    images: data.hits ?? [],
    totalHits: data.totalHits ?? 0,
    total: data.total ?? 0,
  }
}
