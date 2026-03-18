import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";
import { env } from "./config/env";

const app = express();

// ✅ FIXED CORS CONFIG
app.use(
  cors({
    origin: "http://localhost:3000", // your frontend
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// ✅ API ROUTES
app.use("/api", routes);

app.listen(env.PORT, () => {
  console.log(`🚀 Server running on port ${env.PORT}`);
});
