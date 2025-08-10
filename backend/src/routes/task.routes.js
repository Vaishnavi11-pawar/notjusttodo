import {Router} from "express";
import { addTask, deleteTask, updateTask, updateTaskStatus } from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/add-task").post(verifyJWT ,addTask);
router.route("/delete-task/:taskId").delete(verifyJWT, deleteTask);
router.route("/update-task/:taskId").patch(verifyJWT, updateTask);
router.route("/update-task-status/:taskId").patch(verifyJWT, updateTaskStatus);

export default router;