import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { UserRoutes } from "./modules/user/user.route";
import { globalErrorHandaler } from "./middleware/globalErrorHandaler";
import { AuthRoutes } from "./modules/auth/auth.route";
import { RoomRoutes } from "./modules/room/room.route";
import { SlotRoutes } from "./modules/slot/slot.route";
import { BookingRoutes } from "./modules/booking/booking.route";
import { PartnerRoutes } from "./modules/partner/partner.route";
const app = express();

//parser
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

// all routes
app.use("/api/auth", AuthRoutes);
app.use("/api/rooms", RoomRoutes);
app.use("/api/slots", SlotRoutes);
app.use("/api/bookings", BookingRoutes);
app.use("/api/partners", PartnerRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(globalErrorHandaler);

export default app;
