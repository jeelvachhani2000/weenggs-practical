import { useEffect, useCallback } from "react";
import { useProductStore } from "../store/productStore";
import { useProductIndex } from "../hooks/useProducts";

const ProductModal = () => {
  const selectedProductId = useProductStore((s) => s.selectedProductId);
  const setSelectedProduct = useProductStore((s) => s.setSelectedProduct);

  // O(1) lookup — Map<id, Product> built once, not Array.find() on every render
  const productIndex = useProductIndex();
  const product =
    selectedProductId != null
      ? (productIndex.get(selectedProductId) ?? null)
      : null;

  const close = useCallback(
    () => setSelectedProduct(null),
    [setSelectedProduct],
  );

  // ESC key to close
  useEffect(() => {
    if (!product) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [product, close]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = product ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={close}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl leading-none z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        >
          ✕
        </button>

        {/* Image */}
        <div className="p-6 pb-0">
          <img
            src={product.image}
            alt={product.title}
            className="h-64 object-contain mx-auto"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://placehold.co/200x200?text=No+Image";
            }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <span className="text-xs text-blue-500 uppercase font-semibold tracking-wide capitalize">
            {product.category}
          </span>
          <h2
            id="modal-title"
            className="text-xl font-bold text-gray-900 mt-1 mb-3"
          >
            {product.title}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-5">
            {product.description}
          </p>

          <div className="flex justify-between items-center mb-5">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <div className="text-right">
              <p className="text-yellow-500 font-semibold">
                ⭐ {product.rating.rate} / 5
              </p>
              <p className="text-xs text-gray-400">
                {product.rating.count} reviews
              </p>
            </div>
          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
