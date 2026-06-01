import multer from 'multer';
import ApiError from '../utils/ApiError.js';

const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
  // console.log('FILE MIME TYPE:', file.mimetype);
  // console.log('FILE ORIGINAL NAME:', file.originalname);

  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/webp',
    'text/plain',
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new ApiError(400, 'Only jpeg, png, jpg and webp files are allowed')
    );
  }

  cb(null, true);
};

export default fileFilter;