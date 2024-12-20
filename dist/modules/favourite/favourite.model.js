"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favourite = void 0;
const mongoose_1 = require("mongoose");
const favouriteSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: [true, "user id is required"],
        ref: "User",
    },
    room: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: [true, "user id is required"],
        ref: "Room",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.Favourite = (0, mongoose_1.model)("Favourite", favouriteSchema);
