import { memo } from "react";
import { useProductStore } from "../store/productStore";
import { useCategoriesQuery } from "../hooks/useProducts";
import SearchBar from "./SearchBar";

const FilterPanel = memo(() => {
  const { data: categories = [] } = useCategoriesQuery();
  const selectedCategory = useProductStore((s) => s.selectedCategory);
  const priceRange = useProductStore((s) => s.priceRange);
  const setCategory = useProductStore((s) => s.setCategory);
  const setPriceRange = useProductStore((s) => s.setPriceRange);
  const resetFilters = useProductStore((s) => s.resetFilters);

  return (
    <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-xl shadow-sm">
      <div className="w-full sm:w-96">
        {/* search */}
        <SearchBar />
      </div>
      {/* Category */}
      <select
        value={selectedCategory}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Filter by category"
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat} className="capitalize">
            {cat}
          </option>
        ))}
      </select>

      {/* Price Range */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="price-range"
          className="text-sm text-gray-600 whitespace-nowrap"
        >
          Max Price:
        </label>
        <input
          id="price-range"
          type="range"
          min={0}
          max={1000}
          step={10}
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
          aria-valuenow={priceRange[1]}
          aria-valuemin={0}
          aria-valuemax={1000}
          className="w-32 accent-blue-500"
        />
        <span className="text-sm font-semibold text-gray-800 w-14">
          ${priceRange[1]}
        </span>
      </div>

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="px-3 py-2 text-sm text-red-500 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
});

FilterPanel.displayName = "FilterPanel";

export default FilterPanel;
