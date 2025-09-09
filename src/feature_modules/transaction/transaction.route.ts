import { Router } from "express";
import transactionService from "./transaction.service";

const router = Router();

// Create
router.post("/", async (req, res) => {
  try {
    const trx = await transactionService.createTransaction(req.body);
    res.status(201).json(trx);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// List
router.get("/", async (req, res) => {
  try {
    const { limit = 10, skip = 0 } = req.query;
    const result = await transactionService.listTransactions({}, Number(limit), Number(skip));
    res.json(result);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Get by ID
router.get("/:id", async (req, res) => {
  try {
    const trx = await transactionService.getTransactionById(req.params.id);
    res.json(trx);
  } catch (e: any) {
    res.status(404).json({ error: e.message });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const trx = await transactionService.updateTransaction(req.params.id, req.body);
    res.json(trx);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    await transactionService.deleteTransaction(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (e: any) {
    res.status(404).json({ error: e.message });
  }
});

export default router;
