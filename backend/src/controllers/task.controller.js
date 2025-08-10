import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Task } from "../models/task.model.js";

const addTask = asyncHandler(async(req, res) => {
    try {
        const {task, collaborators="", deadline} = req.body;

        if(!task || task.trim() === "") {
            throw new ApiError(401, "All fields are required.")
        }

        const userId = req.user?._id;
        if(!userId) {
            throw new ApiError(401, "user not found.");
        }

        const collabarr = collaborators
            .split(",")
            .map(email => email.trim())
            .filter(email => email.length > 0);

        if(!deadline || new Date(deadline) <= new Date()) {
            throw new ApiError(400, "deadline must be valid future date.")
        }
        
        const tasks = await Task.create({
                userId,
                task,
                collaborators: collabarr,
                deadline
            })
        const createdTask = await Task.findById(tasks._id)
        if(!createdTask) {
            throw new ApiError(500, "Error while creating the tasks.")
        }
        return res
            .status(200)
            .json(new ApiResponse(200, createdTask, "task created successfully."))
        
    } catch (error) {
        console.log("error while adding the task: ", error); 
        throw new ApiError(500, "Something went wrong while creating the task internally.")
    }
})

const deleteTask = asyncHandler(async(req, res) => {
    try {
        const {taskId} = req.params;
        const userId = req.user?._id;

        if(!taskId) {
            throw new ApiError(400, "Task ID is required.");
        }

        const existingTask = await Task.findOne({_id: taskId, userId});
        if(!existingTask) {
            throw new ApiError(404, "Task not found.");
        }
        const deletedTask = await Task.findByIdAndDelete(taskId);
        
        return res
            .status(200)
            .json(new ApiResponse(200, deletedTask, "Task deleted successfully."));

    } catch (error) {
        console.log("Error while deleting the tasks.");
        return res
            .status(500)
            .json(new ApiError(500, "Internal server error"))
        
    }
})

const updateTask = asyncHandler(async(req, res) => {

})

const getTasks = asyncHandler(async(req, res) => {

})

const updateTaskStatus = asyncHandler(async(req, res) => {

})

export {
    addTask,
    deleteTask
}