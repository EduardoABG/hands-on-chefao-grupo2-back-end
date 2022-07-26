import IRepository from "../../../repositories/IRepository";
import bcrypt from "bcryptjs";
const ObjectId = require("mongoose").Types.ObjectId;

type PayloadUserCreate = {
  name: string;
  email: string;
  password: string;
  phone: string;
  profilePicture: string;
};
type PayloadUserUpdate = {
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
};

export default class UserUseCase {
  private repository: IRepository;

  constructor(userRepository: IRepository) {
    this.repository = userRepository;
  }

  async createUser(payload: PayloadUserCreate) {
    const hashedPassword = bcrypt.hashSync(payload.password, 10);
    const userData = {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      phone: payload.phone,
      profilePicture: payload.profilePicture,
    };
    const newUser = await this.repository.create(userData);
    return newUser;
  }
  updateUser(_id: any, payload: PayloadUserUpdate) {
    const userData = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      phone: payload.phone,
      profilePicture: payload.profilePicture,
      birthDate: payload.birthDate,
      aboutMe: payload.aboutMe,
      resume: payload.resume,
    };
    const updateUser = this.repository.update(_id, userData);
    return updateUser;
  }

  async listAll() {
    const userList = await this.repository.findAll();
    return userList;
  }

  listUser(_id: any) {
    const isValidId = ObjectId.isValid(_id);
    if (!isValidId) {
      return null;
    }
    const listUser = this.repository.findById(_id);
    return listUser;
  }
}
