import { Router } from "express";
import {
  getConferences,
  getConference,
  createConference
} from "./conferences.controller";

const router = Router();

router.get("/", getConferences);

router.get("/:id", getConference);

router.post("/", createConference);

export default router;
