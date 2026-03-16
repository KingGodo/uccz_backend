import { Router } from "express";
import {
  getRegions,
  getRegion,
  getRegionsByConference,
  createRegion,
  updateRegion,
  deleteRegion
} from "./regions.controller";

const router = Router();

router.get("/", getRegions);

router.get("/:id", getRegion);

router.get("/conference/:conferenceId", getRegionsByConference);

router.post("/", createRegion);

router.put("/:id", updateRegion);

router.delete("/:id", deleteRegion);

export default router;
