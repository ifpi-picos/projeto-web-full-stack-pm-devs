import express from "express";
import Router from "./Router";

import cookieParser from "cookie-parser";
import { config } from "dotenv";

import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger-output.json";

// import { validateToken } from "./middlewares/validateToken"

config();

export const app = express();

app.use(express.json());
app.use(cookieParser());

// app.all("/*", (req, res, next) => {
//   const publicRoutes = process.env.PUBLIC_ROUTES;
//   const publics = publicRoutes?.split(",")
//   if(publics) {
//     for(let i = 0; i < publics.length; i++) {
//       if(req.path === publics[i]){
//         return next()
//       }
//     }
//   }
//   return validateToken(req, res, next)
// });

app.use("/", Router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
