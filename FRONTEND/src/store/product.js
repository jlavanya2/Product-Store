import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image || !newProduct.category) {
      throw new Error('All fields are required');
    }

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    if (!res.ok) {
      throw new Error('Failed to create product');
    }

    const data = await res.json();

    set((state) => ({
      products: [...state.products, data],
    }));

    return data;
  },

  fetchProducts: async () => {
    const res = await fetch('/api/products');
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await res.json();
    set({ products: data });
  },

  deleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Failed to delete product');
    }

    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));
  },

  updateProduct: async (id, updatedProduct) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });

    if (!res.ok) {
      throw new Error('Failed to update product');
    }

    const data = await res.json();

    set((state) => ({
      products: state.products.map((product) =>
        product._id === id ? data : product
      ),
    }));

    return data;
  },
}));
