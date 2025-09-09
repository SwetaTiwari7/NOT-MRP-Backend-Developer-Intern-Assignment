import { Router } from "express";
import productService from "./product.service";

const router = Router();

// Create
router.post("/", async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// List
router.get("/", async (req, res) => {
  try {
    const { limit = 10, skip = 0 } = req.query;
    const products = await productService.listProducts({}, Number(limit), Number(skip));
    res.json(products);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Search
router.get("/search/:keyword", async (req, res) => {
  try {
    const products = await productService.searchProduct(req.params.keyword);
    res.json(products);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Get by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (e: any) {
    res.status(404).json({ error: e.message });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// Soft Delete
router.delete("/:id", async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (e: any) {
    res.status(404).json({ error: e.message });
  }
});

export default router;
