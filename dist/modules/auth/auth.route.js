"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_validation_1 = require("../user/user.validation");
const validateZodRequest_1 = __importDefault(require("../../middleware/validateZodRequest"));
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post("/signup", (0, validateZodRequest_1.default)(user_validation_1.zodUserSchema.signupZodSchema), auth_controller_1.AuthController.signup);
router.post("/login", (0, validateZodRequest_1.default)(user_validation_1.zodUserSchema.loginZod), auth_controller_1.AuthController.login);
router.get('/refresh-token', 
// validateZodRequest(AuthValidation.refreshTokenValidationSchema),
// (req:Request, res:Response, next:NextFunction)=>{
//   console.log(req.cookies)
//   next();
// },
auth_controller_1.AuthController.refreshToken);
exports.AuthRoutes = router;
