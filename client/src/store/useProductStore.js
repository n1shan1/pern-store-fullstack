import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL =
  import.meta.env.mode === "development" ? "http://localhost:8080" : "";

const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  currentProduct: null,
  formData: {
    name: "",
    image: "",
    description: "",
    price: "",
  },
  setFormData: (formData) => set({ formData }),

  resetFormData: () =>
    set({ formData: { name: "", image: "", price: 0, description: "" } }),

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const { formData } = get();
      const response = await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts();

      if (!response.data.success) {
        set({ error: response.data.message });
      }
      document.getElementById("add-product-modal").close();
      await get().resetFormData();
      toast.success("Product added successfully");
      set({ error: null });
    } catch (error) {
      if (error.status === 429) {
        set({ error: "Rate Limit Exceeded" });
        toast.error("Rate Limit Exceeded");
      } else {
        set({ error: "Something went wrong" });
        toast.error("Something went wrong");
      }
    } finally {
      set({ loading: false });
    }
  },
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      // console.log(`${BASE_URL}/products`);

      if (!response.data.success) {
        set({ error: response.data.message });
      }

      set({ products: response.data.products, error: null });
      toast.success("Products fetched successfully");
    } catch (error) {
      if (error.status === 429) {
        set({ error: "Rate Limit Exceeded", products: [] });
        toast.error("Rate Limit Exceeded");
      } else {
        set({ error: "Something went wrong", products: [] });
        toast.error("Something went wrong");
      }
    } finally {
      set({ loading: false });
    }
  },
  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.delete(`${BASE_URL}/api/products/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
      if (!response.data.success) {
        set({ error: response.data.message });
      }
      set({ error: null });
      toast.success("Product deleted successfully");
      get().fetchProducts();
    } catch (error) {
      set({ error: "Something went wrong" });
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      // console.log(response);
      if (!response.data.success) {
        set({ error: response.data.message });
      }
      set({ formData: response.data.data });
      set({ product: response.data.product, error: null });
      set({ currentProduct: response.data.data });
      toast.success("Product fetched successfully");
    } catch (error) {
      set({ error: "Something went wrong" });
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      const response = await axios.put(
        `${BASE_URL}/api/products/${id}`,
        formData
      );
      if (!response.data.success) {
        set({ error: response.data.message });
      }
      document.getElementById("edit-product-modal").close();
      await get().resetFormData();
      await get().fetchProducts();
      toast.success("Product updated successfully");
      set({ error: null });
    } catch (error) {
      if (error.status === 429) {
        set({ error: "Rate Limit Exceeded" });
        toast.error("Rate Limit Exceeded");
      } else {
        set({ error: "Something went wrong" });
        toast.error("Something went wrong");
      }
    } finally {
      set({ loading: false });
    }
  },
}));
export { useProductStore };
