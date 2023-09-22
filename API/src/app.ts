import express from "express";
import Router from "./Router";
import { config } from "dotenv";

config();

export const app = express();

app.use(express.json());

app.use("/", Router);
