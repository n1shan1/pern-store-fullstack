import React from "react";
import { useProductStore } from "../store/useProductStore";
import {
  DollarSign,
  Image,
  Notebook,
  Package2Icon,
  PlusCircleIcon,
  X,
} from "lucide-react";

const AddProductModal = () => {
  const { addProduct, formData, setFormData, loading } = useProductStore();

  const handleCloseModal = () => {
    document.getElementById("add-product-modal").close();
  };

  return (
    <dialog id="add-product-modal" className="modal">
      <div className="modal-box">
        {/* close button */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleCloseModal}
        >
          <X className="h-4 w-4" />
        </button>

        {/* modal header */}
        <h3 className="font-bold text-xl mb-8">Add New Product</h3>
        <form className="space-y-6" onSubmit={addProduct}>
          <div className="grid gap-6">
            {/* product name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Product Name
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Package2Icon className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter Product Name..."
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>
            {/* price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Price</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <DollarSign className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter Product Price..."
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
            </div>
            {/* image */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Image</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Image className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter Product Image URL..."
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
            </div>
            {/* description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Description
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Notebook className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter Product Description..."
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          {/* modal actions */}
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary min-w-[120px]"
              disabled={
                !formData.name ||
                !formData.price ||
                !formData.image ||
                !formData.description ||
                loading
              }
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <PlusCircleIcon className="h-5 w-5 mr-2" />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={handleCloseModal}></div>
    </dialog>
  );
};

export default AddProductModal;
