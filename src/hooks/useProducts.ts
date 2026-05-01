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
    // Prevent unnecessary refetches — products don't change during a session
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

/**
 * Runs filtering ONCE and writes results into the store.
 * Both ProductGrid and Pagination read from the store — no duplicate work.
 * Call this hook exactly once, at the Dashboard level.
 */
export function useFilteredProducts() {
  const { data: products = [] } = useProductsQuery();
  const searchQuery = useProductStore((s) => s.searchQuery);
  const selectedCategory = useProductStore((s) => s.selectedCategory);
  const priceRange = useProductStore((s) => s.priceRange);
  const currentPage = useProductStore((s) => s.currentPage);
  const pageSize = useProductStore((s) => s.pageSize);
  const setFilteredResult = useProductStore((s) => s.setFilteredResult);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return products.filter((p: Product) => {
      // Guard: skip malformed products
      if (!p || typeof p.price !== "number" || !p.title || !p.category)
        return false;

      const matchSearch = q ? p.title.toLowerCase().includes(q) : true;
      const matchCategory = selectedCategory
        ? p.category === selectedCategory
        : true;
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];

      return matchSearch && matchCategory && matchPrice;
    });
  }, [products, searchQuery, selectedCategory, priceRange]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const paginated = useMemo(
    () => filtered.slice((safePage - 1) * pageSize, safePage * pageSize),
    [filtered, safePage, pageSize],
  );

  // Write results into store once — shared with Pagination, no re-computation
  useEffect(() => {
    setFilteredResult(paginated, filtered.length, totalPages);
  }, [paginated, filtered.length, totalPages, setFilteredResult]);

  return { products: paginated, total: filtered.length, totalPages };
}

/**
 * O(1) product lookup by ID using a memoized index map.
 * Used by ProductModal instead of Array.find() over all products.
 */
export function useProductIndex(): Map<number, Product> {
  const { data: products = [] } = useProductsQuery();
  return useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);
}
