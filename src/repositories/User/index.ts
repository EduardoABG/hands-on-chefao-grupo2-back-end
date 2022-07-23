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
    return this.userModel.create(payload);
  }
  async find(payload?: any, id?: any) {}
  async update(
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
    },
    id: any
  ) {
    return this.userModel.update(payload, { where: { id: id } });
  }
  async findAll(payload?: any) {}
  async findById(id: any, payload?: any) {}
  async delete(id: any) {}
}
