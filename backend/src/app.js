import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser())

import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";

app.use("/api/v1", userRoutes);
app.use("/api/v1", taskRoutes);

export {app};