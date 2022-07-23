import IRepository from "../../../repositories/IRepository";
type PayloadUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  profilePicture: string;
};

export default class UserUseCase {
  private repository: IRepository;

  constructor(userRepository: IRepository) {
    this.repository = userRepository;
  }

  cadastrarUsuario(payload: PayloadUser) {
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
}
