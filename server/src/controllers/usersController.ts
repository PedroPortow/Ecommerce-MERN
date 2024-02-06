import { UserErrors } from "../errors";
import { IUser, UserModel } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { TypedRequestBody } from "../types";

type UserBody = {
  username: string,
  password: string,
  isAdmin: boolean
}

async function registerUser(
  req: TypedRequestBody<UserBody>,
  res: Response
): Promise<void> {
  const { username, password, isAdmin = false } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (user) {
      res.status(400).json({ type: UserErrors.USERNAME_ALREADY_EXISTS });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword, isAdmin  });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ type: err });
  }
}

async function login(req: TypedRequestBody<Omit<UserBody, "isAdmin">>, res: Response): Promise<void> {
  const { username, password } = req.body;

  try {
    const user: IUser = await UserModel.findOne({ username });

    if (!user) {
      res.status(400).json({ type: UserErrors.NO_USER_FOUND });
      return
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ type: UserErrors.WRONG_CREDENTIALS });
      return
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, "secret", {
      expiresIn: '1 hour'
    });

    res.json({ token, userID: user._id });
  } catch (err) {
    res.status(500).json({ type: err });
  }
}

async function availableMoney(req: Request, res: Response): Promise<void> {
  const { userID } = req.params;

  try {
    const user = await UserModel.findById(userID);

    if (!user) {
      res.status(400).json({ type: UserErrors.NO_USER_FOUND });
      return
    }

    res.json({ availableMoney: user.availableMoney });
  } catch (err) {
    res.status(500).json({ type: err });
  }
}

export default { availableMoney, registerUser, login }
