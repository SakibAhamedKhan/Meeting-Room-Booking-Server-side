"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slot = void 0;
const mongoose_1 = require("mongoose");
const slotSchema = new mongoose_1.Schema({
    room: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: [true, "Room id is required"],
        ref: "Room",
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: [true, "Owner id is required"],
        ref: "User",
    },
    // date: {
    //   type: Date,
    //   require: [true, "Date is required"],
    // },
    startTime: {
        type: String,
        require: [true, "Start time is required"],
    },
    endTime: {
        type: String,
        require: [true, "End time is required"],
    },
    // isBooked: {
    //   type: Boolean,
    //   default: false,
    // },
});
exports.Slot = (0, mongoose_1.model)("Slot", slotSchema);
