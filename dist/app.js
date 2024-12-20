"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandaler_1 = require("./middleware/globalErrorHandaler");
const auth_route_1 = require("./modules/auth/auth.route");
const room_route_1 = require("./modules/room/room.route");
const slot_route_1 = require("./modules/slot/slot.route");
const booking_route_1 = require("./modules/booking/booking.route");
const partner_route_1 = require("./modules/partner/partner.route");
const favourite_route_1 = require("./modules/favourite/favourite.route");
const app = (0, express_1.default)();
//parser
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: ["http://localhost:5173"], credentials: true }));
// all routes
app.use("/api/auth", auth_route_1.AuthRoutes);
app.use("/api/rooms", room_route_1.RoomRoutes);
app.use("/api/slots", slot_route_1.SlotRoutes);
app.use("/api/bookings", booking_route_1.BookingRoutes);
app.use("/api/partners", partner_route_1.PartnerRoutes);
app.use("/api/favourite", favourite_route_1.FavouriteRoutes);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use(globalErrorHandaler_1.globalErrorHandaler);
exports.default = app;
