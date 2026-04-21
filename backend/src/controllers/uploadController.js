// import { v2 as cloudinary } from "cloudinary"
import cloudinary from "../config/Cloudinary.js";
import streamifier from "streamifier"

export const uploadImage = async (req, res) => {
  try {
    console.log(
      process.env.CLOUDINARY_CLOUD_NAME,
      process.env.CLOUDINARY_API_KEY,
      process.env.CLOUDINARY_API_SECRET
    );

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" })
    }

    const uploadSingle = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "hike_uploads" },
          (error, result) => {
            if (error) reject(error)
            else resolve({
              url: result.secure_url,
              public_id: result.public_id,
            });
          }
        );

        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const uploadedImages = await Promise.all(
      req.files.map(file => uploadSingle(file.buffer))
    );

    res.status(200).json(uploadedImages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
