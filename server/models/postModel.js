import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  profileImg: {
    type: String,
  },
  post: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("Post", postSchema);
