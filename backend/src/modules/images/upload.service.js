// import { v2 as cloudinary } from "cloudinary"
import cloudinary from "../../config/Cloudinary.js";
import streamifier from "streamifier"
import ApiError from "../../utils/ApiError.js";

export const uploadImage = async (files) => {
  if (!files || files.length === 0) {
    throw new ApiError(400, "No files uploaded")
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

  if(files.length == undefined) {
    const uploadedImage = await uploadSingle(files.buffer)
    return uploadedImage
  }

  const uploadedImages = await Promise.all(
    files.map(file => uploadSingle(file.buffer))
  );

  return uploadedImages
}
