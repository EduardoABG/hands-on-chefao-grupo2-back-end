import { Request, Response } from "express";
import AuthUseCase from "../useCase/AuthUseCase";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import logger from "../../../infra/logger";
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

        return res.json({ token: result });
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
      try {
        logger.info(
          `[generatePasswordToken] start function body=${JSON.stringify(
            req.body
          )} client_ip=${req.ips}`
        );
        const savedUser = await this.useCase.generatePasswordToken(
          req.body
        );
        if (!savedUser) {
          logger.error(`[generatePasswordToken] user not found`);
          return res.status(404).json("Email not found");
        }
        logger.log("nivel", "mensagem");
        logger.info(
          `[generatePasswordToken] user = ${JSON.stringify(savedUser)}`
        );

        const token = CryptoJS.AES.encrypt(
          `${savedUser.email}`,
          "CHEFAO"
        ).toString();
        // enviar um email com o token
        savedUser.hashResetpassword = token;

        await savedUser.save();
        logger.info(`[generatePasswordToken] finish function`);
        return res.json(token);
      } catch (error) {
        console.log(error);
      }
    };
  }
}
