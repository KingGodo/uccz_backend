import { Router } from "express";
import { db } from "../database/db";
import conferencesRoutes from "../modules/conferences/conferences.routes";
import regionsRoutes from "../modules/regions/regions.routes";
import churchesRoutes from "../modules/churches/churches.routes";
import authRoutes from "../modules/auth/auth.routes";
import usersRoutes from "../modules/users/users.routes";
import membersRoutes from "../modules/members/members.routes";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "UCCZ Membership API"
  });
});

router.get("/health/db", async (req, res) => {
  try {

    await db.query("SELECT 1");

    res.json({
      status: "ok",
      database: "connected"
    });

  } catch {

    res.status(500).json({
      status: "error",
      database: "disconnected"
    });

  }
});

router.use("/conferences", conferencesRoutes);
router.use("/regions", regionsRoutes);
router.use("/churches", churchesRoutes);
router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/members", membersRoutes);

export default router;
