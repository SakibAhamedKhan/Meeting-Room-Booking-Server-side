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
exports.AuthService = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const auth_util_1 = require("./auth.util");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    return result;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (!user) {
        throw new AppError_1.default(404, "User not found!");
    }
    const passwordMatched = yield (0, auth_util_1.isPasswordMatched)(payload.password, user.password);
    if (!passwordMatched) {
        throw new AppError_1.default(404, "Invalid password. Please try again.");
    }
    const jwtPayload = {
        userId: user._id,
        role: user.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expries,
    });
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_refresh_secret, {
        expiresIn: config_1.default.jwt_refresh_expries,
    });
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = (0, auth_util_1.verifyToken)(token, config_1.default.jwt_refresh_secret);
    const { userId, iat } = decoded;
    const user = yield user_model_1.User.isUserExistsByCustomUserId(userId);
    if (!user) {
        throw new AppError_1.default(404, "This user is not found !");
    }
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new AppError_1.default(402, "This user is blocked ! !");
    }
    const jwtPayload = {
        userId: user.userId,
        role: user.role,
    };
    const accessToken = (0, auth_util_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expries);
    return {
        accessToken,
    };
});
exports.AuthService = {
    signup,
    login,
    refreshToken,
};
