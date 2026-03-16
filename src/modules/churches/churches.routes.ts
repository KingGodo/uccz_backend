import { Router } from "express";
import {
  getChurches,
  getChurch,
  getChurchesByRegion,
  createChurch,
  updateChurch,
  deleteChurch
} from "./churches.controller";

const router = Router();

router.get("/", getChurches);

router.get("/:id", getChurch);

router.get("/region/:regionId", getChurchesByRegion);

router.post("/", createChurch);

router.put("/:id", updateChurch);

router.delete("/:id", deleteChurch);

export default router;
