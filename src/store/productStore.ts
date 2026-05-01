import { create } from "zustand";
import type { FilterState, Product } from "../types/product.types";

interface FilterActions {
  setSearch: (q: string) => void;
  setCategory: (c: string) => void;
  setPriceRange: (r: [number, number]) => void;
  setPage: (p: number) => void;
  setSelectedProduct: (id: number | null) => void;
  resetFilters: () => void;
}

// Derived state — computed once and shared across all subscribers
interface DerivedState {
  filteredProducts: Product[];
  filteredTotal: number;
  filteredTotalPages: number;
  setFilteredResult: (
    products: Product[],
    total: number,
    totalPages: number,
  ) => void;
}

const defaults: FilterState = {
  searchQuery: "",
  selectedCategory: "",
  priceRange: [0, 1000],
  currentPage: 1,
  pageSize: 12,
  selectedProductId: null,
};

export const useProductStore = create<
  FilterState & FilterActions & DerivedState
>((set) => ({
  ...defaults,

  // Derived — populated by useFilteredProducts, read by Pagination
  filteredProducts: [],
  filteredTotal: 0,
  filteredTotalPages: 1,
  setFilteredResult: (filteredProducts, filteredTotal, filteredTotalPages) =>
    set({ filteredProducts, filteredTotal, filteredTotalPages }),

  // Fix: use trim() not trimStart() — trailing spaces caused stale page resets
  setSearch: (q) => set({ searchQuery: q.trim(), currentPage: 1 }),
  setCategory: (c) => set({ selectedCategory: c, currentPage: 1 }),
  setPriceRange: (r) => set({ priceRange: r, currentPage: 1 }),
  setPage: (p) => set({ currentPage: p }),
  setSelectedProduct: (id) => set({ selectedProductId: id }),
  resetFilters: () => set(defaults),
}));
