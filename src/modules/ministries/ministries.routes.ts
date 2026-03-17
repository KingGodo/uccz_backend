import { Router } from "express";
import {
  getMinistries,
  getMinistry,
  createMinistry,
  updateMinistry,
  deleteMinistry
} from "./ministries.controller";

const router = Router();

router.get("/", getMinistries);

router.get("/:id", getMinistry);

router.post("/", createMinistry);

router.put("/:id", updateMinistry);

router.delete("/:id", deleteMinistry);

export default router;
