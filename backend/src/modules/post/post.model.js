import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    description: {
      type: String,
    },
    images: [
      {
        url: String,
        public_id: String,
      }
    ],
    place: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true
    },
    likedBy: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],
  }, {timestamps: true}
)

const Post = mongoose.model("Post", postSchema)
export default Post