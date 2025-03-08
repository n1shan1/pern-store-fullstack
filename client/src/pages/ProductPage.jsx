import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { useNavigate, Link, useParams } from "react-router-dom";
import { ArrowLeft, Trash2Icon, SaveIcon } from "lucide-react";
const ProductPage = () => {
  const {
    fetchProduct,
    formData,
    setFormData,
    error,
    loading,
    currentProduct,
    deleteProduct,
    updateProduct,
  } = useProductStore();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct(id);
  }, [fetchProduct, id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto px-4 py-8 container">
        <div className="alert alert-error mb-8">{error}</div>
      </div>
    );
  }

  return (
    <div className="mx-auto container px-4 py-8 max-w-4xl">
      <button onClick={() => navigate("/")} className="btn btn-ghost mb-8">
        <ArrowLeft className="h-5 w-5 mr-2" />
        Go Back to Products
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg shadow-md overflow-hidden bg-base-100">
          <img
            src={currentProduct?.image}
            alt={currentProduct?.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Edit Product</h2>
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                updateProduct(id);
              }}
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Product Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered w-full"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Price
                  </span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered w-full"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Image URL
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Description
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Description of the Product"
                  className="input input-bordered w-full"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-error"
                >
                  <Trash2Icon className="size-4 mr-2" />
                  Delete Product
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    loading ||
                    !formData.name ||
                    !formData.price ||
                    !formData.image ||
                    !formData.description
                  }
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <SaveIcon className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
