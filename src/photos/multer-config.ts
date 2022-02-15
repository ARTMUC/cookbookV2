import { HttpException } from '@nestjs/common';
import * as path from 'path';
import { v4 as uuid } from 'uuid';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new HttpException('Only image files are allowed!', 400));
  }
  callback(null, true);
};

export const editFileName = async (req, file, callback) => {
  try {
    callback(null, uuid() + path.extname(file.originalname));
  } catch (error) {
    callback(error);
  }
};
