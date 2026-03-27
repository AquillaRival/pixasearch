# ◈ PixaSearch

A minimal, elegant image search app powered by the [Pixabay API](https://pixabay.com/api/docs/).

Built with **React + Vite**, featuring a responsive masonry-style grid, image type filters, skeleton loading, infinite scroll, and a full-screen image modal.

---

## ✦ Features

- **Instant search** — query Pixabay's 4M+ image library
- **Image type filters** — All / Photos / Illustrations / Vectors
- **Infinite scroll** — auto-loads next pages via IntersectionObserver
- **Skeleton loaders** — smooth perceived performance on load
- **Image modal** — full-size preview with stats & Pixabay link
- **Accessible** — ARIA roles, keyboard navigation, focus management
- **Responsive** — works on mobile, tablet, and desktop

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/pixasearch.git
cd pixasearch
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your Pixabay API key

```bash
cp .env.example .env
```

Edit `.env` and replace `your_api_key_here` with your key from [pixabay.com/api/docs](https://pixabay.com/api/docs/).

```
VITE_PIXABAY_API_KEY=your_actual_key
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🏗 Project Structure

```
pixasearch/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx       # Search input + suggestion chips
│   │   ├── SearchBar.module.css
│   │   ├── FilterBar.jsx       # Image type tabs + result count
│   │   ├── FilterBar.module.css
│   │   ├── ImageGrid.jsx       # Responsive grid + card + modal
│   │   └── ImageGrid.module.css
│   ├── hooks/
│   │   └── useImageSearch.js   # All search state & logic
│   ├── utils/
│   │   └── pixabay.js          # Pixabay API client
│   ├── App.jsx
│   ├── App.module.css
│   ├── index.css               # Global design tokens & reset
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── vite.config.js
└── README.md
```

---

## 🔨 Build for Production

```bash
npm run build
npm run preview
```

---

## 📡 API Reference

Images are fetched from the [Pixabay REST API](https://pixabay.com/api/docs/#api_search_images).

Key parameters used:

| Param        | Value                             |
|-------------|-----------------------------------|
| `key`        | Your API key                      |
| `q`          | Search query                      |
| `image_type` | `all` / `photo` / `illustration` / `vector` |
| `per_page`   | 20                                |
| `safesearch` | `true`                            |
| `lang`       | `en`                              |

---

## 🛠 Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- CSS Modules
- Pixabay API

---

## 📄 License

MIT
