import { create } from "zustand";
import type { FilterState } from "../types/product.types";

interface FilterActions {
  setSearch: (q: string) => void;
  setCategory: (c: string) => void;
  setPriceRange: (r: [number, number]) => void;
  setPage: (p: number) => void;
  setSelectedProduct: (id: number | null) => void;
  resetFilters: () => void;
}

const defaults: FilterState = {
  searchQuery: "",
  selectedCategory: "",
  priceRange: [0, 1000],
  currentPage: 1,
  pageSize: 12,
  selectedProductId: null,
};

export const useProductStore = create<FilterState & FilterActions>((set) => ({
  ...defaults,

  setSearch: (q) => set({ searchQuery: q.trim(), currentPage: 1 }),
  setCategory: (c) => set({ selectedCategory: c, currentPage: 1 }),
  setPriceRange: (r) => set({ priceRange: r, currentPage: 1 }),
  setPage: (p) => set({ currentPage: p }),
  setSelectedProduct: (id) => set({ selectedProductId: id }),
  resetFilters: () => set(defaults),
}));
