import { memo } from "react";
import type { Product } from "../types/product.types";

interface Props {
  product: Product;
  onClick: (id: number) => void;
}

const ProductCard = memo(({ product, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick(product.id)}
      onKeyDown={(e) => e.key === "Enter" && onClick(product.id)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.title}`}
      className="h-full bg-white rounded-xl shadow hover:shadow-lg transition-all duration-200 cursor-pointer p-4 flex flex-col gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="h-48 flex items-center justify-center overflow-hidden flex-shrink-0">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full object-contain group-hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/200x200?text=No+Image";
          }}
        />
      </div>

      {/* Title + category — grows to fill remaining space */}
      <div className="flex-1 flex flex-col">
        <p className="text-xs text-blue-500 uppercase font-semibold tracking-wide capitalize">
          {product.category}
        </p>
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mt-1">
          {product.title}
        </h3>
      </div>

      {/* Price + rating — always pinned to bottom */}
      <div className="flex justify-between items-center mt-auto flex-shrink-0">
        <span className="text-lg font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </span>
        <span className="text-xs text-yellow-500 font-medium">
          ⭐ {product.rating.rate}
          <span className="text-gray-400 ml-1">({product.rating.count})</span>
        </span>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
