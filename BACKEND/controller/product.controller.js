const Product = require('../model/product.model.js'); 
const mongoose = require('mongoose');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find(); 
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image || !product.category) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newProduct = new Product(product);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ message: "Error saving product", error: error.message });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
        const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
};
