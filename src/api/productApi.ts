import AXIOS from "../middleware/axios";
import type { Product } from "../types/product.types";

export const fetchProducts = async (
  signal?: AbortSignal,
): Promise<Product[]> => {
  const { data } = await AXIOS.get<Product[]>("/products", { signal });
  if (!Array.isArray(data)) throw new Error("Invalid products response");
  return data;
};

export const fetchCategories = async (): Promise<string[]> => {
  const { data } = await AXIOS.get<string[]>("/products/categories");
  if (!Array.isArray(data)) throw new Error("Invalid categories response");
  return data;
};
