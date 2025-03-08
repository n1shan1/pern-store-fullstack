import { React, useEffect } from "react";
import { PackageIcon, PlusCircleIcon, RefreshCcwIcon } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import ProductCard from "../components/ProductCard";
import AddProductModal from "../components/AddProductModal";
const HomePage = () => {
  const { products, fetchProducts, error, loading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  // console.log(products);

  return (
    <div className="mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() =>
            document.getElementById("add-product-modal").showModal()
          }
          className="btn btn-primary"
        >
          <PlusCircleIcon className="size-5 mr-2" />
          Add Product
        </button>
        <button className="btn btn-ghost btn-circle" onClick={fetchProducts}>
          <RefreshCcwIcon className="size-5" />
        </button>
      </div>
      <AddProductModal />
      {error && <div className="alert alert-error mb-8">{error}</div>}
      {products.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <PackageIcon className="size-8 text-primary" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold">No Products Found</h3>
            <p className="text-gray-500 max-w-sm">
              Get Started by Adding Your First Product to the Inventory
            </p>
          </div>
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
