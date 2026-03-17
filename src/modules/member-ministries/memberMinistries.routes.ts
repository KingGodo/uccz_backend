import { Router } from "express";
import {
  getAll,
  getOne,
  getMemberMinistries,
  create,
  update,
  remove
} from "./memberMinistries.controller";

const router = Router();

router.get("/", getAll);

router.get("/:id", getOne);

router.get("/member/:memberId", getMemberMinistries);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;
