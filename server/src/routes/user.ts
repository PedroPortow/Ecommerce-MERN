import express from "express";

import { verifyToken } from "../utils/verifyToken";
import { UsersController } from "../controllers";

const router = express.Router();

router.post("/register", UsersController.registerUser);

router.post("/login", UsersController.login);

router.get("/available-money/:userID", verifyToken, UsersController.availableMoney);

export { router as UserRouter };
