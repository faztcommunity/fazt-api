// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.
import multer from 'multer';

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  }
});

export default multer({ storage });
