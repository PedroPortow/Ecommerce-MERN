import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user';

export const authenticateAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (user && user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "Usuário precisa ser administrador" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao verificar status de administrador", error });
  }
};