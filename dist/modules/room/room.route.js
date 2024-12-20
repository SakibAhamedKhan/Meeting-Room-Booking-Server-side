"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateZodRequest_1 = __importDefault(require("../../middleware/validateZodRequest"));
const room_validation_1 = require("./room.validation");
const room_controller_1 = require("./room.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.PARTNER), sendImageToCloudinary_1.upload.fields([
    { name: 'extraImages', maxCount: 10 },
    { name: 'thumbnail', maxCount: 1 }
]), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateZodRequest_1.default)(room_validation_1.zodRoomSchema.roomZodSchema), room_controller_1.RoomController.createRoom);
router.get("/:roomId", 
// auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER),
room_controller_1.RoomController.getSingleRoom);
router.put("/:roomId", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), (0, validateZodRequest_1.default)(room_validation_1.zodRoomSchema.roomUpdateZodSchema), room_controller_1.RoomController.updateSingleRoom);
router.delete("/:roomId", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), room_controller_1.RoomController.deleteSingleRoom);
router.get("/", room_controller_1.RoomController.getAllRoom);
router.get("/checking/operations", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.PARTNER), room_controller_1.RoomController.getAllRoomOperation);
router.patch("/activate/:roomId", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), room_controller_1.RoomController.activateRoom);
router.get("/checking/activated", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), room_controller_1.RoomController.getAllActivatedRoom);
router.patch("/deactivate/:roomId", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), room_controller_1.RoomController.deActivateRoom);
router.patch("/declined/:roomId", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), room_controller_1.RoomController.declinedRoom);
router.patch("/publish/:roomId", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.PARTNER), room_controller_1.RoomController.publishRoom);
router.patch("/unpublish/:roomId", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.PARTNER), room_controller_1.RoomController.unPublishRoom);
exports.RoomRoutes = router;
