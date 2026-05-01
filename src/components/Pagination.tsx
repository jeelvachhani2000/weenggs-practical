import { memo } from "react";
import { useProductStore } from "../store/productStore";

const Pagination = memo(() => {
  const currentPage = useProductStore((s) => s.currentPage);
  const setPage = useProductStore((s) => s.setPage);
  // Read pre-computed totalPages from store — no duplicate filtering
  const totalPages = useProductStore((s) => s.filteredTotalPages);

  // Removed: useEffect that auto-corrected page.
  // useFilteredProducts already computes safePage = Math.min(currentPage, totalPages)
  // and writes clamped results to the store, so double-correction is not needed.

  if (totalPages <= 1) return null;

  const delta = 2;
  const pageNumbers: number[] = [];
  for (
    let i = Math.max(1, currentPage - delta);
    i <= Math.min(totalPages, currentPage + delta);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <nav
      className="flex justify-center items-center gap-2 mt-8 flex-wrap"
      aria-label="Pagination"
    >
      <button
        onClick={() => setPage(1)}
        disabled={currentPage === 1}
        aria-label="First page"
        className="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-40 hover:bg-gray-100 transition-colors"
      >
        «
      </button>
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-40 hover:bg-gray-100 transition-colors"
      >
        ‹ Prev
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => setPage(page)}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
          className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
            page === currentPage
              ? "bg-blue-500 text-white border-blue-500"
              : "hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-40 hover:bg-gray-100 transition-colors"
      >
        Next ›
      </button>
      <button
        onClick={() => setPage(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Last page"
        className="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-40 hover:bg-gray-100 transition-colors"
      >
        »
      </button>
    </nav>
  );
});

Pagination.displayName = "Pagination";

export default Pagination;
