import IRepository from "../IRepository";
import { IUser } from "../../models/User";
import { Model } from "mongoose";

export default class UserRepository implements IRepository {
  private userModel: any;
  constructor(userModel: Model<IUser>) {
    this.userModel = userModel;
  }
  async create(payload: {
    name: string;
    email: string;
    password: string;
    phone: string;
    profilePicture: string;
  }) {
    return await this.userModel.create(payload);
  }
  async find(payload?: any, id?: any) {}
  async update(
    id: any,
    payload: {
      name: string;
      email: string;
      password: string;
      phone: string;
      birthDate: Date;
      aboutMe: string;
      profilePicture: string;
      resume: {
        employmentHistory: String[];
        education: String[];
        certificates: String[];
        languages: String[];
        linkedin: String;
        portfolio: String;
        address: String;
        salary: number;
        RG: String;
        CPF: String;
      };
    }
  ) {
    return await this.userModel.updateOne({ _id: id }, payload);
  }
  async findAll() {
    const list = await this.userModel.find({}, ['-password', '-__v']);
    return list;
  }
  async findById(id: any) {
    return this.userModel.findById(id, ['-password', '-__v']);
  }
  async delete(id: any) {}
}
