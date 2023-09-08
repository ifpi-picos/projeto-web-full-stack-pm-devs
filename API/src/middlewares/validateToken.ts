import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
  user: jwt.JwtPayload | string;
}

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if(!token) throw new Error(); 

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "SECRET";
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    (req as CustomRequest).user = decoded;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send('Please authenticate.');
  }
};