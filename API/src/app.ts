import express from "express";
import Router from "./Router";
import { config } from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger-output.json";

config();

export const app = express();

app.use(express.json());

app.use("/", Router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
