import { Router } from "express";
import authService from "./auth.service";
import { validate } from "../../utility/validate";
import { credential, register } from "./auth.type";
import { ResponseHandler } from "../../utility/resposeHandler";
import { Route } from "../../route/route.type";

const router = Router();

router.post("/login", validate(credential, "body"), async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});

router.post("/register", validate(register, "body"), async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});

router.get("/logout", async (req, res, next) => {
  try {
    const result = await authService.logout();
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});

export default new Route("/auth", router);
