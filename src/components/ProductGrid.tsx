import { useCallback, useEffect, useRef, useState } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import { useProductStore } from "../store/productStore";
import { useFilteredProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";

const ROW_HEIGHT = 340;

const ProductGrid = () => {
  // ✅ get derived data from hook (NOT store)
  const { products, total } = useFilteredProducts();

  const setSelectedProduct = useProductStore((s) => s.setSelectedProduct);
  const resetFilters = useProductStore((s) => s.resetFilters);
  const searchQuery = useProductStore((s) => s.searchQuery);
  const selectedCategory = useProductStore((s) => s.selectedCategory);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [gridSize, setGridSize] = useState({
    width: 0,
    height: 600,
  });

  // ✅ better resize handling
  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      if (rect.width === 0) return;

      setGridSize({
        width: rect.width,
        height: rect.height || 600,
      });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback(
    (id: number) => setSelectedProduct(id),
    [setSelectedProduct],
  );

  // ✅ responsive columns
  const getColCount = (width: number) => {
    if (width >= 1280) return 5;
    if (width >= 1024) return 4;
    if (width >= 768) return 3;
    if (width >= 480) return 2;
    return 1;
  };

  const colCount = getColCount(gridSize.width);
  const colWidth = Math.floor(gridSize.width / colCount);
  const rowCount = Math.ceil(products.length / colCount);
  const safeWidth = Math.max(gridSize.width, colCount * colWidth) + 40;

  // memoized cell renderer
  const Cell = useCallback(
    ({
      columnIndex,
      rowIndex,
      style,
    }: {
      columnIndex: number;
      rowIndex: number;
      style: React.CSSProperties;
    }) => {
      const index = rowIndex * colCount + columnIndex;
      const product = products[index];

      if (!product) return null;

      return (
        <div
          style={{
            ...style,
            padding: 8,
            boxSizing: "border-box",
          }}
        >
          <ProductCard product={product} onClick={handleClick} />
        </div>
      );
    },
    [products, colCount, handleClick],
  );

  const isFiltered = searchQuery.trim() !== "" || selectedCategory !== "";

  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-5xl mb-3">{isFiltered ? "🔍" : "📦"}</p>
        <p className="text-lg font-medium text-gray-600">
          {isFiltered
            ? "No products match your filters"
            : "No products available"}
        </p>

        {isFiltered && (
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Clear Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <p className="text-sm text-gray-500 mb-2">
        Showing {products.length} of {total} products
      </p>

      <div ref={containerRef} className="flex-1 min-h-0">
        {gridSize.width > 0 && (
          <Grid
            columnCount={colCount}
            columnWidth={colWidth}
            rowCount={rowCount}
            rowHeight={ROW_HEIGHT}
            height={gridSize.height}
            width={safeWidth}
            overscanRowCount={2} // ✅ smoother scroll
          >
            {Cell}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
