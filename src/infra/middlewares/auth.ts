import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "O token não especificado" });
  }

  ("JWT token");
  const partsToken = authorization.split(" ");

  if (partsToken.length !== 2) {
    return res.status(401).json({ message: "Token mal formatado" });
  }

  const [key, token] = partsToken;

  if (key.indexOf("Bearer") < 0) {
    return res.status(401).json({ message: "Token mal formatado" });
  }

  try {
    const data = JWT.verify(token, "CRUDGAMA");
    req.user = data as User;
    return next();
  } catch (e) {
    return res
      .status(401)
      .json({ message: "Token invalido! Faça login novamente!" });
  }
};