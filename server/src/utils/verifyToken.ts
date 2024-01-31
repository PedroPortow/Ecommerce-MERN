import { Router, Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }

      console.log({decoded})

      req.userId = decoded._id;
      req.isAdmin = decoded.isAdmin;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
