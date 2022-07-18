import { connect, Mongoose } from "mongoose";
export default class Conection {
  private instance: Mongoose | undefined;
  private url_conection: string;

  constructor(url_conection: string) {
    this.url_conection = url_conection;
  }
  getInstance() {
    return this.instance;
  }

  async createConection() {
    try {
      this.instance = await connect(this.url_conection);
      console.log("Banco de dados conectado");
    } catch (error) {
      console.error(error);
    }
  }
}
