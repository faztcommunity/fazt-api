// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'uploads/img/projects',
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  }
});

const fileFilter = (
  req: any,
  file: { mimetype: string; originalname: any },
  cb: (arg0: null, arg1: boolean) => void
) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const mimetype = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname));
  if (mimetype && extname) {
    cb(null, true);
  } else {
    console.log('Only this extensions are accepted: .JPG, .JPEG , .PNG or .GIF');
    cb(null, false);
  }
};

export default multer({ storage, fileFilter: fileFilter }).single('image');
