import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  profileImg: {
    type: String,
  },
  username: {
    type: String,
  },
  CommentText: {
    type: String,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Comment", commentSchema);
