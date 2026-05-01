# 🚀 Product Dashboard

A **high-performance, scalable product dashboard** built using modern React architecture and best practices.  
This project focuses on **efficient data handling, optimized rendering, and clean separation of concerns**, making it production-ready for large-scale applications.

---

## 📦 Tech Stack

- **React (Latest) + TypeScript** — Type-safe, modern UI development
- **Vite** — Fast build tool with optimized dev experience
- **Zustand** — Lightweight global state management
- **React Query (TanStack Query)** — Server state management, caching & async handling
- **Axios** — API communication layer
- **TailwindCSS** — Utility-first responsive styling
- **react-window** — Virtualized rendering for large datasets

---

## ⚡ Features

### ✅ Core Features

- Fetch product list from a public API
- Debounced search input (optimized user input handling)
- Advanced filtering:
  - Category-based filtering
  - Price range filtering
- Pagination support for controlled data display
- Product detail modal with dynamic rendering

---

### ⚡ Performance Optimizations

- **React Query**
  - Automatic caching
  - Background refetching
  - Request deduplication
  - Stale data management

- **Virtualized Rendering (react-window)**
  - Only renders visible items
  - Handles large datasets efficiently (10k+ items)

- **Optimized Rendering**
  - React.memo
  - useCallback
  - useMemo

- **Debounced Search**
  - Prevents unnecessary filtering/API calls

- **Lazy Loading**
  - Improves initial load performance

---

### 🎨 UI Features

- Fully responsive layout
- Clean UI using TailwindCSS
- Loading states
- Error handling with retry

---

## 🛠️ Setup Instructions

```bash
git clone https://github.com/jeelvachhani2000/weenggs-practical.git
cd weenggs-practical
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
  pages/
  store/
  types/
  utils/
```

---

## 🧠 Architecture Overview

```
UI Layer (React Components)
        ↓
Hooks Layer (Custom Hooks + React Query)
        ↓
State Management
   - Zustand (Client State)
   - React Query Cache (Server State)
        ↓
API Layer (Axios)
        ↓
External API
```

---

## ⚖️ Trade-offs

- Client-side filtering (not scalable)
- Pagination + virtualization together
- No authentication layer

---

## 🚀 Scaling Strategy

- Backend filtering & search
- Cursor-based pagination
- Request cancellation
- Redis caching
- CDN integration
- Monitoring (Sentry)

---

## ❓ Answers

### Prevent re-renders

- React.memo
- useCallback
- useMemo
- Zustand selectors

### Zustand vs Redux

- Zustand = simple
- Redux = scalable

### Large datasets

- Backend pagination
- Virtualization

### Cancel API calls

- AbortController with React Query
