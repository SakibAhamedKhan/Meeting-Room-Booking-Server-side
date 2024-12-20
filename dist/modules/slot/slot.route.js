"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const slot_controller_1 = require("./slot.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.PARTNER), slot_controller_1.SlotController.createSlot);
router.get("/getAllSlot/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.PARTNER), slot_controller_1.SlotController.getAllMySLot);
router.get("/availability", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.CUSTOMER), slot_controller_1.SlotController.getAvaliableSlots);
exports.SlotRoutes = router;
