import { UserErrors } from "../errors";
import { UserModel } from "../models/user";
import bcrypt from "bcrypt";
import { Express, RequestHandler, Response } from "express";

export interface TypedRequestBody<T> extends Express.Request {
  body: T
}

async function registerUser(req: TypedRequestBody<{ username: string, password: string, isAdmin: boolean }>, res: Response): Promise<RequestHandler> {
  const { username, password, isAdmin = false } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (user) {
      return res.status(400).json({ type: UserErrors.USERNAME_ALREADY_EXISTS });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword, isAdmin  });
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ type: err });
  }
}

export default { registerUser }
