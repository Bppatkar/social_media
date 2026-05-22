import type { Request } from 'express';
import multer from 'multer';
import ApiError from '../utils/ApiError.js';

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/webp',
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new ApiError(400, 'Only jpeg, png, jpg and webp files are allowed')
    );
  }

  cb(null, true);
};

export default fileFilter;