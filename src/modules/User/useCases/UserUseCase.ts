import IRepository from "../../../repositories/IRepository";
import bcrypt from "bcryptjs";
import User from "../../../models/User";
import UploadService from "../../../services/UploadService";
const ObjectId = require("mongoose").Types.ObjectId;

type filetype = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

type PayloadUserCreate = {
  name: string;
  email: string;
  password: string;
  phone: string;
  profilePicture: string;
};
type PayloadUserUpdate = {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  birthDate?: Date;
  aboutMe?: string;
  profilePicture?: string;
  resume?: {
    employmentHistory?: String[];
    education?: String[];
    certificates?: String[];
    languages?: String[];
    linkedin?: String;
    portfolio?: String;
    address?: String;
    salary?: number;
    RG?: String;
    CPF?: String;
  };
  favoriteJobs?: String[];
};

export default class UserUseCase {
  private repository: IRepository;

  constructor(userRepository: IRepository) {
    this.repository = userRepository;
  }

  async createUser(payload: PayloadUserCreate) {
    const hashedPassword = bcrypt.hashSync(payload.password, 10);

    const uploadResult = await UploadService(payload.profilePicture);

    const userData = {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      phone: payload.phone,
      profilePicture: uploadResult.secure_url,
    };

    const newUser = await this.repository.create(userData);
    return newUser;
  }
  async updateUser(_id: any, payload: PayloadUserUpdate, file?: filetype) {
    let hashedPassword;
    let uploadResult;
    let constEmail;

    if(payload.email) {
      const hasUser = await User.count({ email: payload.email })
      if(hasUser) {
        return { msg: "Email já cadastrado" }
      }
    } else {
      const hasUser = await this.repository.findById(_id);
      payload.email = hasUser.email;
    }

    if(payload.password) {
      hashedPassword = bcrypt.hashSync(payload.password, 10);
    }

    if(file) {
      const cloudinaryRes = await UploadService(file.path);
      uploadResult = cloudinaryRes.secure_url;
    }

    const userData = {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      phone: payload.phone,
      profilePicture: uploadResult,
      birthDate: payload.birthDate,
      aboutMe: payload.aboutMe,
      resume: payload.resume,
      favoriteJobs: payload.favoriteJobs,
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

  async delete(id: any) {
    const result = await this.repository.delete(id)
    return result;
  }
}
