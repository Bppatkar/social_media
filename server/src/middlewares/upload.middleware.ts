import multer from 'multer';
import fileFilter from './fileFilter.middleware.js';

const storage = multer.memoryStorage();

const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;
