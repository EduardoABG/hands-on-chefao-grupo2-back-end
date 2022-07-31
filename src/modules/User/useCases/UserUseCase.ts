import IUserRepository from "../../../repositories/User/IUserRepository";
import CreateUserDTO from "./dtos/CreateUserDTO";
import UpdateUserDTO from "./dtos/UpdateUserDTO";
import bcrypt from "bcryptjs";
import UploadService from "../../../services/UploadService";
import AppError from "../../../errors/AppError";
const ObjectId = require("mongoose").Types.ObjectId;

export default class UserUseCase {
  private repository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.repository = userRepository;
  }

  async createUser({ name, email, password, phone, profilePicture: receivedPhoto }: CreateUserDTO) {

    const userFoundByEmail = await this.repository.count({ email });
    if (userFoundByEmail) {
      throw new AppError(400, "Este e-mail já está cadastrado");
    }

    if(!receivedPhoto.resource) {
      throw new AppError(400, "O envio da foto de perfil é obrigatorio");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const uploadResult = receivedPhoto.type==="link" ? receivedPhoto.resource : (await UploadService(receivedPhoto.resource)).secure_url;

    const userData = {
      name,
      email,
      password: hashedPassword,
      phone,
      profilePicture: uploadResult,
    };

    const createdUser = await this.repository.create(userData);
    return createdUser;
  }

  async updateUser(_id: any, payload: UpdateUserDTO, receivedPhoto?: any) {
    let hashedPassword;
    let uploadResult;

    const hasUser = await this.repository.count({ _id });
    if(!hasUser) {
      throw new AppError(404, "Usuario não encontrado");
    }

    if(payload.email) {
      const userFoundByEmail = await this.repository.count({ email: payload.email });
      if(userFoundByEmail) {
        throw new AppError(400, "Este e-mail já está cadastrado");
      }
    }

    if(payload.password) {
      hashedPassword = bcrypt.hashSync(payload.password, 10);
    }

    if(receivedPhoto) {
      uploadResult = receivedPhoto.type==="link" ? receivedPhoto.resource : (await UploadService(receivedPhoto.resource)).secure_url;
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
    return await this.repository.findAll();
  }

  async listUser(_id: any) {
    if (!ObjectId.isValid(_id)) { throw new AppError(400, "Id inválido") }

    const user = await this.repository.findById(_id);
    if(!user) { throw new AppError(404, "Usuario não encontrado") }

    return user;
  }

  async delete(id: any) {
    return await this.repository.delete(id)
  }
}
