import mongoose from "mongoose";

const usageSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Usage = mongoose.model("Usage", usageSchema);

export default Usage;
