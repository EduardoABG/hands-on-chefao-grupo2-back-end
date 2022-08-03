import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import ENV from "../config/env";
import GoogleAuthService from "../../services/GoogleAuthService";
import { authUseCase } from "../../modules/auth/useCase";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "O token não especificado" });
  }

  const partsToken = authorization.split(" ");

  if (partsToken.length !== 2) {
    return res.status(401).json({ message: "Token mal formatado" });
  }

  const [key, token] = partsToken;

  if (key.indexOf("Bearer") < 0) {
    return res.status(401).json({ message: "Token mal formatado" });
  }

  try {
    const GoogleAuth = new GoogleAuthService();
    const isGoogleToken = GoogleAuth.isGoogleToken(token);

    if(isGoogleToken) {
      const checkedToken = await GoogleAuth.checkToken(token);
      if(!checkedToken) throw new Error();

      const data = {
        name: checkedToken.name,
        email: checkedToken.email,
        picture: checkedToken.picture,
      }

      await authUseCase.signInWithGoogle(data);

      req.user = data as User;
      return next();
    }

    const data = JWT.verify(token, ENV.JWT_SECRET);
    req.user = data as User;
    return next();

  } catch (e) {

    return res
      .status(401)
      .json({ message: "Token invalido! Faça login novamente!" });
  }
};
