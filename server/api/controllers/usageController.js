import asyncHandler from "../middlewares/asyncHandler.js";
import Usage from "../models/usageModel.js";

const addUsageData = asyncHandler(async (req, res) => {
  const { duration } = req.body;
  const today = new Date().setHours(0, 0, 0, 0);

  try {
    const usage = await Usage.findOneAndUpdate(
      { date: today },
      { duration },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(201).json(usage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const getUsageData = asyncHandler(async (req, res) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const usageData = await Usage.find({ date: { $gte: sevenDaysAgo } });
  res.json(usageData);
});

const deleteUsageData = asyncHandler(async (req, res) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  try {
    await Usage.deleteMany({ date: { $lt: sevenDaysAgo } });
    res.json({ message: "Old usage data deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { addUsageData, getUsageData, deleteUsageData };
