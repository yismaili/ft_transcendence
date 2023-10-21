import { diskStorage } from 'multer';

export const multerOptions = {
  storage: diskStorage({//storage engine is used to specify where and how uploaded files are stored on the server's disk.
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = file.originalname.split('.').pop();
      callback(null, `${uniqueSuffix}.${extension}`);
    },
  }),
};
