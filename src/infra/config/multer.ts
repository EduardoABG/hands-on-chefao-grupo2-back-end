import multer from "multer";
import { v4 as uuid } from 'uuid';

const upload = multer({
  storage: multer.diskStorage({
    destination: 'images/',
    filename(req, file, callback) {
      const fileName = `${uuid()}-${file.originalname}`

      return callback(null, fileName)
    },
  }),
})

export default upload;
