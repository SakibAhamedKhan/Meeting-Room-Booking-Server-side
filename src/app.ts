import express from "express";
import { UserRoutes } from "./modules/user/user.route";
import { globalErrorHandaler } from "./middleware/globalErrorHandaler";
import { AuthRoutes } from "./modules/auth/auth.route";
import { RoomRoutes } from "./modules/room/room.route";
const app = express();

//parser
app.use(express.json());

// all routes
app.use("/api/auth", AuthRoutes);
app.use("/api/rooms", RoomRoutes);




app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(globalErrorHandaler)


export default app;