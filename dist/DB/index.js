"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const user_constant_1 = require("../modules/user/user.constant");
const user_model_1 = require("../modules/user/user.model");
const adminCredential = {
    name: config_1.default.admin_name,
    email: config_1.default.admin_email,
    password: config_1.default.admin_password,
    phone: "",
    address: "",
    role: user_constant_1.USER_ROLE.ADMIN,
};
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const isAdminExists = yield user_model_1.User.findOne({ role: user_constant_1.USER_ROLE.ADMIN });
    if (!isAdminExists) {
        yield user_model_1.User.create(adminCredential);
    }
});
exports.default = seedAdmin;
