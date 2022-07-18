import Express, { Application } from "express";
import { mongoDBConection } from "../database";
import path from "path";
import BaseRoutes from "./BaseRoutes";

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
    this.instance.use(Express.static("uploads"));
    await mongoDBConection.createConection();
    const selectedPort = options.port ? options.port : this.defaultPort;
    this.instance.use(Express.json());
    this.instance.use(BaseRoutes);

    if (options.isTest) return;

    this.instance.listen(selectedPort, () =>
      console.log(`Servidor rodando na porta: ${selectedPort}`)
    );
  }

  getInstance() {
    return this.instance;
  }
}
