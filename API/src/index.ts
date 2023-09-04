import express from "express";
import Router from "./Router";

import { config } from "dotenv";
config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/", Router);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`)
});