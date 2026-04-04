import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";
import { env } from "./config/env";

const app = express();

// ✅ CORS CONFIG – allow local development and Vercel frontend
app.use(
  cors({
    origin: [
      "http://localhost:3000",                 // local development
      "https://uccz-frontend.vercel.app"       // production frontend on Vercel
    ],
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