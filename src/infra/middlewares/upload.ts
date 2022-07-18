import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("uploads"));
  },
  filename: function (req, file, cb) {
    const nameFile = file.originalname.replace(/ /g, "").toLocaleLowerCase();
    cb(null, `${Date.now()}-${file.originalname}`);
  }, 
});

const upload = multer({ storage: storage });

export default upload;
