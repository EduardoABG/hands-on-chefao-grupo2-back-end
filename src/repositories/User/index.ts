import IRepository from "../IRepository";
import { IUser } from "../../models/User";

export default class UserRepository implements IRepository {
  private UserModel: any;
  constructor(UserModel: IUser) {
    this.UserModel = UserModel.instance;
  }
  create(payload: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  update(payload: any, id: any, condition?: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  findAll(payload?: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  findById(payload?: any, id?: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(id: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  find(payload?: any, id?: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}