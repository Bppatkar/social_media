import cloudinary from '../config/cloudinary.js';
import type { UploadApiResponse } from 'cloudinary';

const uploadToCloudinary = async (
  fileBuffer: Buffer,
  folder: string
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve(result);
        }
      })
      .end(fileBuffer);
  });
};

export default uploadToCloudinary;