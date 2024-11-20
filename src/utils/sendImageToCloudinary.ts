import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import fs from "fs";
import multer from "multer";
import config from "../config";

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

type UploadResult = {
  url: string;
  public_id: string;
  // Add any other relevant fields here from the Cloudinary response
}

export const sendImagesToCloudinary = (
    imageData: any[]
): Promise<UploadResult[]> => {
  return new Promise((resolve, reject) => {
    // Create an array of promises for the upload process
    const uploadPromises = imageData.map((data) => {
      const imageName = data.filename

      // Return the promise for each image upload
      return new Promise<UploadResult>((resolve, reject) => {
        cloudinary.uploader.upload(
          data.path,
          { public_id: imageName.trim() },
          function (error, result) {
            if (error) {
              reject(error);
            } else {
              // Asynchronous file deletion after upload
              fs.unlink(data.path, (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`File ${imageName} is deleted.`);
                }
              });

              resolve({
                url: result?.secure_url ?? "",
                public_id: result?.public_id ?? "",
              });
            }
          }
        );
      });
    });

    // Wait for all uploads to finish and return the results
    Promise.all(uploadPromises)
      .then((results) => {
        resolve(results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname.split(".")[0] + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
