import { IUser } from "../../models/User";
import IAuthRepository from "./IAuthRepository";
import { Model } from "mongoose";

export default class AuthRepository implements IAuthRepository {
  private login: any;

  constructor(loginModel: Model<IUser>) {
    this.login = loginModel;
  }

  async find(payload?: any) {
    return await this.login.findOne(payload);
  }

  async count(payload?: any) {
    return await this.login.count(payload);
  }
}
