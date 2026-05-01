import { memo, useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useProductStore } from "../store/productStore";

const SearchBar = memo(() => {
  const setSearch = useProductStore((s) => s.setSearch);
  const [input, setInput] = useState("");
  const debounced = useDebounce(input, 400);

  useEffect(() => {
    setSearch(debounced);
  }, [debounced, setSearch]);

  return (
    <input
      type="search"
      placeholder="Search products..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      aria-label="Search products"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
});

SearchBar.displayName = "SearchBar";

export default SearchBar;
