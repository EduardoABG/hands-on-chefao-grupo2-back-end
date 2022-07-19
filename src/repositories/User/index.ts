import IRepository from "../IRepository";
import IUser from "./IUser";
import { Model } from "mongoose";

export default class UserRepository implements IRepository {
  private userModel: any;
  constructor(userModel: Model<IUser>) {
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
