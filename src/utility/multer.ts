import multer from 'multer';
import path from 'path';
import fs from 'fs';

export const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, Date.now() + '-' + file.originalname);
  },
});

export const deleteUploadedFile = (filename: string) => {
  const filePath = path.join(__dirname, './uploads', filename); // Adjusting path to ensure correct path

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    } else {
      console.log('File deleted successfully:', filename);
    }
  });
};
