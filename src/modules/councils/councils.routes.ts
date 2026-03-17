import { Router } from "express";
import {
  getCouncils,
  getCouncil,
  getCouncilsByChurch,
  createCouncil,
  updateCouncil,
  deleteCouncil
} from "./councils.controller";

const router = Router();

router.get("/", getCouncils);

router.get("/:id", getCouncil);

router.get("/church/:churchId", getCouncilsByChurch);

router.post("/", createCouncil);

router.put("/:id", updateCouncil);

router.delete("/:id", deleteCouncil);

export default router;
