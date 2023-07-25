import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  dislikes: {
    type: Number,
    required: true,
  },
});

export const PostsModel = mongoose.model("Posts", postSchema);