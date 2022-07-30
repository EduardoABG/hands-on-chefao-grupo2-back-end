import IUserRepository from "./IUserRepository";
import CreateUserDTO from "./dtos/CreateUserDTO";
import UpdateUserDTO from "./dtos/UpdateUserDTO";
import { IUser } from "../../models/User";
import { Model } from "mongoose";

export default class UserRepository implements IUserRepository {
  private userModel: any;

  constructor(userModel: Model<IUser>) {
    this.userModel = userModel;
  }

  async create(payload: CreateUserDTO) {
    const createdUser = await this.userModel.create(payload);
    const { password, __v, ...response } = createdUser._doc;
    return response;
  }

  async update(id: any, payload: UpdateUserDTO) {
    const updatedUser = await this.userModel.findOneAndUpdate({ _id: id }, payload, { new: true });
    const { password, __v, ...response } = updatedUser._doc;
    return { user: response };
  }

  async findAll() {
    return await this.userModel.find({}, ["-password", "-__v"]);
  }

  async findById(id: any) {
    return await this.userModel.findById(id, ["-password", "-__v"]);
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }, ["-password", "-__v"]);
  }

  async count(payload: any) {
    return await this.userModel.count(payload);
  }

  async delete(id: any) {
    return await this.userModel.deleteOne({ _id: id });
  }
}
