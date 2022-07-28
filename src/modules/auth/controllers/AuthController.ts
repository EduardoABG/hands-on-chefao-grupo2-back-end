import { Request, Response } from "express";
import AuthUseCase from "../useCase/AuthUseCase";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import logger from "../../../infra/logger";
import CryptoJS from "crypto-js";

type BodyLogin = {
  email: string;
  password: string;
};
export default class AuthController {
  private useCase: AuthUseCase;
  constructor(useCase: AuthUseCase) {
    this.useCase = useCase;
  }
  login() {
    return async (req: Request, res: Response) => {
      try {
        const login = await this.useCase.login(req.body as BodyLogin);

        if (!login) {
          return res.status(400).json("Email not registred!");
        }
        if (!bcrypt.compare(req.body.password, login.password)) {
          return res.status(401).json("Invalid password!");
        }
        const token = jwt.sign(
          {
            id: login.id,
            email: login.email,
            nome: login.name,
          },
          "OPENBANK"
        );
        return res.json(token);
      } catch (error) {
        console.log(error);
        return res.status(400);
      }
    };
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
          req.body as BodyLogin
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
          "OPENBANK"
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
