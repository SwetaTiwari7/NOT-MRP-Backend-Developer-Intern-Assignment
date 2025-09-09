import { Router } from "express";
import customerService from "./customer.service";
import { Route } from "../../route/route.type";

const router = Router();

// GET paginated customers
router.get("/", async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const result = await customerService.getCustomers(Number(limit), Number(offset));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// GET single customer
router.get("/:id", async (req, res) => {
  try {
    const result = await customerService.getCustomerById(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// CREATE customer
router.post("/", async (req, res) => {
  try {
    const result = await customerService.createCustomer(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// UPDATE customer
router.put("/:id", async (req, res) => {
  try {
    const result = await customerService.updateCustomer(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default new Route('/customer', router);
