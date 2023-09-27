import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
  userId: jwt.JwtPayload | string;
}

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies ? req.cookies.token : null;
    if (!token) {
      res.status(403).send({
        auth: false, message: 'No token provided.'
      })
    }

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "SECRET";
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    (req as CustomRequest).userId = decoded;

    next();
  } catch (error) {
    res.status(401).send("Token not valid.");
  }
};
