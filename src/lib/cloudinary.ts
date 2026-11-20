import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

const cloudinaryUrl =
  process.env.CLOUDINARY_URL ||
  "cloudinary://849812227195233:Jgs2j4SUd0EPjKIzSQGGU_sksls@ee76tw8n";

const match = cloudinaryUrl.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);

if (match) {
  const [, apiKey, apiSecret, cloudName] = match;
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
} else {
  cloudinary.config({
    secure: true,
  });
}

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  folder: string = "orthomax_blogs"
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error: any, result) => {
        if (error) {
          if (
            error.message?.includes('missing permissions') ||
            error.message?.includes('403') ||
            error.http_code === 403
          ) {
            reject(
              new Error(
                "Cloudinary Permission Error (403): Your Cloudinary API Key lacks 'Create' (upload) permission. In Cloudinary Console, go to Settings > Access Keys and ensure this key has 'Create' permission enabled, or use the Master Key."
              )
            );
          } else {
            reject(error);
          }
        } else if (result) {
          resolve(result);
        } else {
          reject(new Error("Unknown Cloudinary upload error"));
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
}

export default cloudinary;
