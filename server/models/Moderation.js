import mongoose from "mongoose";

const moderationSchema = new mongoose.Schema({
  requestId: {
    type: Number,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ["processing", "accepted", "rejected"],
    default: "processing"
  },
  reason: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Moderation", moderationSchema);
