"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const Router_1 = __importDefault(require("./Router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = require("dotenv");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./swagger-output.json"));
// import { validateToken } from "./middlewares/validateToken"
(0, dotenv_1.config)();
exports.app = (0, express_1.default)();
const cors = require('cors');
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(cors());
exports.app.use("/", Router_1.default);
exports.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
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
