import { useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "../api/productApi";
import { useProductStore } from "../store/productStore";
import { queryKeys } from "../api/queryKeys";
import type { Product } from "../types/product.types";

export function useProductsQuery() {
  return useQuery({
    queryKey: queryKeys.products,
    queryFn: ({ signal }) => fetchProducts(signal),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useCategoriesQuery() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: fetchCategories,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export function useFilteredProducts() {
  const { data: products = [] } = useProductsQuery();

  const { searchQuery, selectedCategory, priceRange, currentPage, pageSize } =
    useProductStore();

  // 🔥 filter
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return products.filter((p: Product) => {
      if (!p) return false;

      if (q && !p.title.toLowerCase().includes(q)) return false;
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;

      return true;
    });
  }, [products, searchQuery, selectedCategory, priceRange]);

  // 🔥 pagination
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  return {
    products: paginated,
    total,
    totalPages,
    currentPage: safePage,
  };
}

export function useProductIndex(): Map<number, Product> {
  const { data: products = [] } = useProductsQuery();

  return useMemo(() => {
    const map = new Map<number, Product>();
    for (const p of products) map.set(p.id, p);
    return map;
  }, [products]);
}
