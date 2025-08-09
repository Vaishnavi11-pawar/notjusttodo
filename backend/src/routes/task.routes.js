import {Router} from "express";
import { addTask } from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/add-task").post(verifyJWT ,addTask);

export default router;