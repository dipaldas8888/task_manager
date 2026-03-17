import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    status: String,
    userId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true },
);

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
