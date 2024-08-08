import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import usageRoutes from "./routes/usageRoute.js";

import { connectDB } from "../config/dbConnection.js";

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5001;

app.use("/api/usage", usageRoutes);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
