# 🚀 Product Dashboard

A high-performance product dashboard built using modern React practices with a focus on scalability, performance, and clean architecture.

---

## 📦 Tech Stack

- React (Latest) + TypeScript
- Vite
- Zustand
- React Query (TanStack Query)
- Axios
- TailwindCSS
- react-window

---

## ⚡ Features

### Core Features

- Fetch product list from public API
- Debounced search
- Filter by category and price range
- Pagination support
- Product detail modal

### Performance Features

- Virtualized rendering using react-window
- Prevent unnecessary re-renders
- Optimized API calls (caching, deduplication)
- Lazy loading

### UI Features

- Responsive layout
- Loading and error states
- Clean UI

---

## 🛠️ Setup (Yarn)

```bash
git clone https://github.com/jeelvachhani2000/weenggs-practical.git
cd weenggs-practica
yarn install
yarn dev
```

---

## 📁 Project Structure

```
src/
  api/
  components/
  hooks/
  middleware/
  pages/
  store/
  types/
```

---

## Trade-offs

**Client-side filtering** — Works for small datasets. Should move to backend for scalability.

**No auth layer** — Axios interceptor placeholder exists for token handling.

**Virtualization vs pagination** — Both used for demo. In production:

- Use server pagination OR
- Use full virtualization

---

## Scaling to Production

1. Move filtering/search to backend (debounced params)
2. Use cursor-based pagination
3. Add React Query `keepPreviousData`
4. Replace console logs with Sentry/Datadog
5. Add CDN/service worker for images
6. Handle 100k+ items via backend + optional WASM search

---

## Notes

- Built with performance-first mindset
- Clean architecture
- Production-ready patterns
