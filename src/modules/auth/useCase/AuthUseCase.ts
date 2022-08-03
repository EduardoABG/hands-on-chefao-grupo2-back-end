import AppError from "../../../errors/AppError";
import IAuthRepository from "../../../repositories/auth/IAuthRepository";
import IUserRepository from "../../../repositories/User/IUserRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ENV from "../../../infra/config/env";
import LoginDTO from "./dtos/LoginDTO";
import GoogleSignDTO from "./dtos/GoogleSignDTO";

export default class AuthUseCase {
  private AuthRepository: IAuthRepository;
  private UserRepository: IUserRepository;

  constructor(authRepository: IAuthRepository, userRepository: IUserRepository) {
    this.AuthRepository = authRepository;
    this.UserRepository = userRepository;
  }

  async login({ email, password }: LoginDTO) {

    const user = await this.AuthRepository.find({ email });
    if(!user) throw new AppError(400, "Credenciais invalidas");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AppError(400, "Credenciais invalidas");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      ENV.JWT_SECRET,
      { expiresIn: '3d' }
    );

    return token;
  }

  async signInWithGoogle({ name, email, picture }: GoogleSignDTO) {
    const hasUser = await this.AuthRepository.find({ email });
    if(!hasUser) {
      return await this.UserRepository.create({
        name,
        email,
        password: null,
        phone: null,
        profilePicture: picture,
      });
    }

    return hasUser;
  }

  generatePasswordToken({ email, password }: LoginDTO) {
    const tokenData = { email, password };
    const newToken = this.AuthRepository.find(tokenData);
    return newToken;
  }
}
