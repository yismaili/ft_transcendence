import { diskStorage } from 'multer';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = file.originalname.split('.').pop();
      console.log(file);
      callback(null, `${uniqueSuffix}.${extension}`);
    },
  }),
};
