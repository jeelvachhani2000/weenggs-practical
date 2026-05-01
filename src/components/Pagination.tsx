import { memo } from "react";
import { useProductStore } from "../store/productStore";
import { useFilteredProducts } from "../hooks/useProducts";

const Pagination = memo(() => {
  const { totalPages, currentPage } = useFilteredProducts();

  const setPage = useProductStore((s) => s.setPage);

  if (totalPages <= 1) return null;

  const delta = 2;

  const start = Math.max(1, currentPage - delta);
  const end = Math.min(totalPages, currentPage + delta);

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <nav
      className="flex justify-center items-center gap-2 mt-8 flex-wrap"
      aria-label="Pagination"
    >
      {/* First */}
      <button
        onClick={() => setPage(1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-40 hover:bg-gray-100"
      >
        «
      </button>

      {/* Prev */}
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-40 hover:bg-gray-100"
      >
        ‹ Prev
      </button>

      {/* Pages */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setPage(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`px-3 py-1.5 rounded-lg border text-sm font-medium ${
            page === currentPage
              ? "bg-blue-500 text-white border-blue-500"
              : "hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-40 hover:bg-gray-100"
      >
        Next ›
      </button>

      {/* Last */}
      <button
        onClick={() => setPage(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-40 hover:bg-gray-100"
      >
        »
      </button>
    </nav>
  );
});

Pagination.displayName = "Pagination";

export default Pagination;
