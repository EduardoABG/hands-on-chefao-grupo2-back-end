import { Router } from "express";
import { userController } from "../controller";
import userValidator from "../validators";
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

const routes = Router();

routes.get("/users", userController.listAll());
routes.get("/users/:id", userController.list());
routes.post("/users", upload.single("profilePicture"),  userController.create()); // Criação da 1ª rota, cadastrar usuário.
routes.put("/users/:id", upload.single("profilePicture"), userController.update());
routes.delete("/users/:id", userController.delete());


export default routes;
