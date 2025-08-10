import {Router} from "express";
import { addTask, deleteTask } from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/add-task").post(verifyJWT ,addTask);
router.route("/delete-task/:taskId").delete(verifyJWT, deleteTask);

export default router;