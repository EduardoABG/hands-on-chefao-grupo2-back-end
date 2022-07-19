import { Request, Response } from "express";
import User from "../../../models/User";

const controller = {
  async create(req: Request, res: Response) {
    const {
      // Dados trazidos de req.body para a criação deste objeto contendo todos os dados do usuário.
      id,
      name,
      email,
    } = req.body;

    // Para verificar se o e-mail fornecido para cadastro já foi utilizado:
    const savedUser = await User.count({
      email,
    });
    if (savedUser) {
      return res.status(400).json("Este e-mail já está cadastrado.");
    }

    const newUser = await User.create(req.body); // Para fazer uma inserção no banco.

    return res.status(201).json(newUser);
  },
};

export default controller;
