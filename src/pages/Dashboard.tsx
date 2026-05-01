import { lazy, Suspense } from "react";
import { useProductsQuery, useFilteredProducts } from "../hooks/useProducts";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import Spinner from "../components/ui/Spinner";
import ErrorMessage from "../components/ui/ErrorMessage";

const ProductModal = lazy(() => import("../components/ProductModal"));

const Dashboard = () => {
  const { isLoading, isError, refetch } = useProductsQuery();
  useFilteredProducts();

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10 shrink-0">
        <div className="w-full px-4 py-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 whitespace-nowrap">
            🛒 Product Dashboard
          </h1>
          <div className="w-full sm:w-96">
            <SearchBar />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col px-4 py-4 overflow-hidden">
        <FilterPanel />

        {isLoading && <Spinner />}

        {isError && (
          <ErrorMessage
            message="Failed to load products. Please try again."
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && (
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            {" "}
            {/* 👈 add min-h-0 */}
            <ProductGrid />
            <Pagination />
          </div>
        )}
      </main>

      <Suspense fallback={null}>
        <ProductModal />
      </Suspense>
    </div>
  );
};

export default Dashboard;
