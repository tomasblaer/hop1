import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

export const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

function fileFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
  if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
    return cb(new Error('Something went wrong'));
  }
  cb(null, true);
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
