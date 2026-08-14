import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    image: {
      url: String,
      publicId: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }],
    followers: [
      // {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        name: {
          type: String,
        },
        image: {
          type: {
            url: String,
            publicId: String,
          },
          default: {
            url: "https://res.cloudinary.com/dyqumsdla/image/upload/v1786527430/hike_uploads/uo37wvuqsquyasoh6m0w.jpg",
            publicId: "default_img",
          }
        }
      }
    ],
    followings: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        name: {
          type: String,
        },
        image: {
          type: {
            url: String,
            publicId: String,
          },
          default: {
            url: "https://res.cloudinary.com/dyqumsdla/image/upload/v1786527430/hike_uploads/uo37wvuqsquyasoh6m0w.jpg",
            publicId: "default_img",
          }
        }
      }
    ],
  }
)

const User = mongoose.model("User", userSchema)
export default User
