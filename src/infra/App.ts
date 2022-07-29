import Express, { Application } from "express";
import { mongoDBConection } from "../database";
require("express-async-errors");
import BaseRoutes from "./BaseRoutes";
import cors from "cors";
import handleError from "./middlewares/handleError";
import cloudinary from "./config/cloudinary";

type SetupOptions = {
  isTest?: boolean;
  port?: number;
};
export default class App {
  private instance: Application;
  private defaultPort: number = 4000;

  constructor() {
    this.instance = Express();
  }

  async setup(options: SetupOptions): Promise<void> {
    this.instance.use(cors());
    this.instance.use(Express.json());
    this.instance.use('/docs', Express.static('docs'));
    this.instance.use(BaseRoutes);
    this.instance.use(handleError);

    await mongoDBConection.createConection();
    const selectedPort = options.port ? options.port : this.defaultPort;

    cloudinary.config();

    if (options.isTest) return;

    this.instance.listen(selectedPort, () =>
      console.log(`Servidor rodando na porta: ${selectedPort}`)
    );
  }

  getInstance() {
    return this.instance;
  }
}
