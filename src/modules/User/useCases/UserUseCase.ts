import IRepository from "../../../repositories/IRepository";
import bcrypt from "bcryptjs";
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
type PayloadUserList = {
  name: string;

  phone: string;

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
  };
};

export default class UserUseCase {
  private repository: IRepository;

  constructor(userRepository: IRepository) {
    this.repository = userRepository;
  }

  createUser(payload: PayloadUserCreate) {
    const hashedPassword = bcrypt.hash(payload.password, 10);
    const userData = {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      phone: payload.phone,
      profilePicture: payload.profilePicture,
    };
    const newUser = this.repository.create(userData);
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
  listUser(_id: any, payload: PayloadUserList) {
    const userList = {
      name: payload.name,
      phone: payload.phone,
      profilePicture: payload.profilePicture,
      aboutMe: payload.aboutMe,
      resume: payload.resume,
    };
    const listUser = this.repository.findById(_id, userList);
    return listUser;
  }
}
