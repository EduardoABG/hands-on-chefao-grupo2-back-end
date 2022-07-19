import IRepository from "../IRepository";
import User from "../../models/User";
import IUser from "./IUser";

export default class UserRepository implements IRepository {
  private userModel: any;
  constructor(userModel: IUser) {
    this.userModel = userModel;
  }
  async create(payload: { id: number; name: string; email: string }) {
    return this.userModel.create(payload);
  }
  async find(payload?: any, id?: any) {}
  async update(payload: any, id: any) {}
  async findAll(payload?: any) {}
  async findById(id: any, payload?: any) {}
  async delete(id: any) {}
}
