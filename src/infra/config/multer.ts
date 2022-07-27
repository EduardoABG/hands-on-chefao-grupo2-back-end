import multer from "multer";
import path from "path";

const multerCfg = multer({
  storage: multer.diskStorage({
    destination: 'images/',
  }),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(null, false);
      return;
    }
    cb(null, true);
  }
});

export default multerCfg;
