import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";
import { env } from "./config/env";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());

app.use("/api", routes);

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
