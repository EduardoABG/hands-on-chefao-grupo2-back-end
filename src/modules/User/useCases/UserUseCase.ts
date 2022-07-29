import IUserRepository from "../../../repositories/User/IUserRepository";
import bcrypt from "bcryptjs";
import User from "../../../models/User";
import UploadService from "../../../services/UploadService";
import AppError from "../../../errors/AppError";
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
  private repository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.repository = userRepository;
  }

  async createUser(payload: PayloadUserCreate) {

    const savedUser = await this.repository.findByEmail(payload.email);
    if (savedUser) {
      throw new AppError(400, "Este e-mail já está cadastrado");
    }

    if(!payload.profilePicture) {
      throw new AppError(400, "O envio da foto de perfil é obrigatorio");
    }

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

    if(payload.email) {
      const hasUser = await this.repository.findByEmail(payload.email);
      if(hasUser) {
        throw new AppError(400, "Este e-mail já está cadastrado");
      }
    }

    if(payload.password) {
      hashedPassword = bcrypt.hashSync(payload.password, 10);
    }

    if(file) {
      const cloudinaryRes = await UploadService(file.path);
      if(!cloudinaryRes.secure_url) { throw new AppError(500, "Erro no upload de imagem") }
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

    return await this.repository.update(_id, userData);
  }

  async listAll() {
    const userList = await this.repository.findAll();
    return userList;
  }

  async listUser(_id: any) {
    if (!ObjectId.isValid(_id)) { throw new AppError(400, "Id inválido") }

    return await this.repository.findById(_id);
  }

  async delete(id: any) {
    const result = await this.repository.delete(id)
    return result;
  }
}
