import { useCallback, useEffect, useRef, useState } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import { useProductStore } from "../store/productStore";
import ProductCard from "./ProductCard";

const ROW_HEIGHT = 340;

const ProductGrid = () => {
  const products = useProductStore((s) => s.filteredProducts);
  const total = useProductStore((s) => s.filteredTotal);
  const setSelectedProduct = useProductStore((s) => s.setSelectedProduct);
  const resetFilters = useProductStore((s) => s.resetFilters);
  const searchQuery = useProductStore((s) => s.searchQuery);
  const selectedCategory = useProductStore((s) => s.selectedCategory);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [gridSize, setGridSize] = useState({
    width: 0,
    height: 400,
  });

  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width === 0) return;
      setGridSize({
        width: rect.width,
        height: rect.height || 400,
      });
    };

    const raf = requestAnimationFrame(updateSize);

    const observer = new ResizeObserver(updateSize);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  const handleClick = useCallback(
    (id: number) => setSelectedProduct(id),
    [setSelectedProduct],
  );

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

      if (!product) return <div style={style} />;

      return (
        <div
          style={{
            ...style,
            padding: "8px",
            boxSizing: "border-box",
            overflow: "hidden", // 👈 prevent inner overflow
          }}
        >
          <div style={{ height: "100%" }}>
            <ProductCard product={product} onClick={handleClick} />
          </div>
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
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0">
      <p className="text-sm text-gray-500 mb-2 shrink-0">
        Showing {products.length} of {total} products
      </p>

      {/* 🔥 IMPORTANT: min-h-0 */}
      <div ref={containerRef} className="flex-1 min-h-0 overflow-x-hidden">
        <Grid
          columnCount={colCount}
          columnWidth={colWidth}
          rowCount={rowCount}
          rowHeight={ROW_HEIGHT}
          height={gridSize.height}
          width={safeWidth || 300}
        >
          {Cell}
        </Grid>
      </div>
    </div>
  );
};

export default ProductGrid;
