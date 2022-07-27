import IRepository from "../../../repositories/IRepository";
type PayloadLogin = {
  email: string;
  password: string;
};

export default class AuthUseCase {
  private repository: IRepository;

  constructor(authRepository: IRepository) {
    this.repository = authRepository;
  }

  login(payload: PayloadLogin) {
    const loginData = {
      email: payload.email,
      senha: payload.password,
    };
    const newLogin = this.repository.find({ email: loginData.email });
    return newLogin;
  }
  generatePasswordToken(payload: PayloadLogin) {
    const tokenData = { email: payload.email, senha: payload.password };
    const newToken = this.repository.find(tokenData);
    return newToken;
  }
}
