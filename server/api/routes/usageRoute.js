import express from "express";
import {
  getUsageData,
  addUsageData,
  deleteUsageData,
} from "../controllers/usageController.js";

const router = express.Router();

router.route("/").get(getUsageData).post(addUsageData).delete(deleteUsageData);

export default router;
