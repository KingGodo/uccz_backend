import { Router } from "express";
import {
  getAll,
  getOne,
  getMemberCouncils,
  getCouncilMembers,
  create,
  update,
  remove
} from "./memberCouncils.controller";

const router = Router();

router.get("/", getAll);

router.get("/:id", getOne);

router.get("/member/:memberId", getMemberCouncils);

router.get("/council/:councilId", getCouncilMembers);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;
