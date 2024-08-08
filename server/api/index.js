import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "../config/dbConnection.js";

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5001;



app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
