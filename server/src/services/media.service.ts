import uploadToCloudinary from '../utils/uploadToCloudinary.js';
import deleteFromCloudinary from '../utils/deleteFromCloudinary.js';
import ApiError from '../utils/ApiError.js';

export const uploadSingleImageService = async (
  fileBuffer: Buffer,
  folder: string
) => {
  const uploadedImage = await uploadToCloudinary(fileBuffer, folder);

  return {
    imageUrl: uploadedImage.secure_url,
    imagePublicId: uploadedImage.public_id,
  };
};

export const deleteSingleImageService = async (publicId: string) => {
  if (!publicId) {
    throw new ApiError(400, 'Image public ID is required for deletion');
  }

  await deleteFromCloudinary(publicId);
};
