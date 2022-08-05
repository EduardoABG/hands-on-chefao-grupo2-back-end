import { Request, Response } from "express";
import AuthUseCase from "../useCase/AuthUseCase";
import CryptoJS from "crypto-js";

export default class AuthController {
  private useCase: AuthUseCase;

  constructor(useCase: AuthUseCase) {
    this.useCase = useCase;
  }

  login() {
    return async (req: Request, res: Response) => {
        const { email, password } = req.body

        const result = await this.useCase.login({ email, password });

        return res.json(result);
    };
  }

  loginWithGoogle() {
    return async (req: Request, res: Response) => {
      const { name, email, picture } = req.user as User;
      const result = await this.useCase.signInWithGoogle({ name, email, picture });

      return res.status(200).json(result)
    }
  }

  tokenGenerator() {
    return async (req: Request, res: Response) => {

      const savedUser = await this.useCase.generatePasswordToken(
        req.body
      );
      if (!savedUser) {
        return res.status(404).json("Email not found");
      }

      const token = CryptoJS.AES.encrypt(
        `${savedUser.email}`,
        "CHEFAO"
      ).toString();
      // enviar um email com o token
      savedUser.hashResetpassword = token;

      await savedUser.save();

      return res.json(token);
    };
  }
}
