"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("./modules/user/user.route");
const globalErrorHandaler_1 = require("./middleware/globalErrorHandaler");
const app = (0, express_1.default)();
//parser
app.use(express_1.default.json());
// all routes
app.use("/api/users", user_route_1.UserRoutes);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use(globalErrorHandaler_1.globalErrorHandaler);
exports.default = app;
