import IRepository from "../../../repositories/IRepository";
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

  createUser(payload: PayloadUserCreate) {
    const userData = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      phone: payload.phone,
      profilePicture: payload.profilePicture,
    };
    const newUser = this.repository.create(userData);
    return newUser;
  }
  updateUser(payload: PayloadUserUpdate, id: any) {
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
    const updateUser = this.repository.update(userData, id);
    return updateUser;
  }
}
