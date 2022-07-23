import IRepository from "../../../repositories/IRepository";
type PayloadUser = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export default class UserUseCase {
  private repository: IRepository;

  constructor(userRepository: IRepository) {
    this.repository = userRepository;
  }

  cadastrarUsuario(payload: PayloadUser) {
    const userData = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      password: payload.password,
    };
    const newUser = this.repository.create(userData);
    return newUser;
  }
}
