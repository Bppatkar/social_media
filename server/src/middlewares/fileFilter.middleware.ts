import type { Request } from 'express';
import type { FileFilterCallback } from 'multer';

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  // console.log('FILE MIME TYPE:', file.mimetype);
  // console.log('FILE ORIGINAL NAME:', file.originalname);

  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/webp',
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error('Only jpeg, png, jpg and webp files are allowed'));
  }

  cb(null, true);
};

export default fileFilter;
