import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Task } from "../models/task.model.js";
import nodemailer from "nodemailer";

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
            .filter(email => email.length > 0 && email.toLowerCase() != req.user?.email.toLowerCase());

        if(collabarr.length > 0) {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: collabarr.join(","),
                subject: "You've been invited to collaborate on a task",
                text: `You've been invited to collaborate on a task: ${task}.
                    Deadline: ${deadline.toLocaleString()}, 
                    created by: ${req.user?.username}.`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px;">
                        <h2 style="color: #4F46E5;">You've Been Invited!</h2>
                        <p>Hello,</p>
                        <p><strong>${req.user?.username}</strong> has invited you to collaborate on a task:</p>
                        <div style="background: #f4f4f4; padding: 10px; border-radius: 6px;">
                            <p><strong>Task:</strong> ${task}</p>
                            <p><strong>Deadline:</strong> ${new Date(deadline).toLocaleString()}</p>
                        </div>
                        <p style="margin-top: 20px;">Click the button below to view the task:</p>
                        <a href="https://todoapp.com/tasks" style="display: inline-block; padding: 10px 20px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px;">
                            View Task
                        </a>
                        <p style="margin-top: 20px; font-size: 12px; color: #666;">If you did not expect this email, please ignore it.</p>
                    </div>
                    `
                
            }

            await transporter.sendMail(mailOptions);
        }

        if(!deadline || new Date(deadline) < new Date()) {
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
    try {
        const {taskId} = req.params;
        const {task} = req.body;
        const userId = req.user?._id;

        if(!taskId) {
            throw new ApiError(400, "Task ID is required.");
        }
        if(!task || task.trim() === "") {
            throw new ApiError(400, "Enter the Task.");
        }

        const existingTask = await Task.findOne({_id: taskId, userId});
        if(!existingTask) {
            throw new ApiError(404, "Task not found.");
        }

        existingTask.task = task;
        const updatedTask = await existingTask.save();

        return res
            .status(200)
            .json(new ApiResponse(200, updatedTask, "Task updated successfully."));

    } catch (error) {
        return res 
            .status(500)
            .json(new ApiError(500, "Internal server error while updating the task."))
    }
})

const getTasks = asyncHandler(async(req, res) => {
    try {
        const userId = req.user?._id;
        const userEmail = req.user?.email; 
        if(!userId || !userEmail) {
            throw new ApiError(401, "user not found");
        }

        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const offset = (page - 1) * limit;

        const tasks = await Task.find({ 
            $or: [
                {userId},
                {collaborators: userEmail}
            ]
         })
            .skip(offset)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate('userId', 'username email')

            const totalTasks = await Task.countDocuments({
                $or: [
                    {userId},
                    {collaborators: userEmail}
                ]
            })

        return res
            .status(200)
            .json(new ApiResponse(200,
                 {
                    tasks,
                    totalPages: Math.ceil(totalTasks/limit),
                    currentPage: page
                 },
                 "Tasks fetched successfully."));

    } catch (error) {
        console.log("Error while fetching the tasks: ", error);
        return res
            .status(500)
            .json(new ApiError(500, "Internal server error while fetching the tasks."))
    }
})

const updateTaskStatus = asyncHandler(async(req, res) => {
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
    
        existingTask.status = 'completed';
        // const updatedTask = await existingTask.save();
        const updatedTask = await Task.findOneAndUpdate(
            {_id: taskId, userId},
            {status: 'completed'},
            {new: true}
        )
    
        return res
            .status(200)
            .json(new ApiResponse(200, updatedTask, "Task updated successfully."));
    
    } catch (error) {
        console.log("Error while updating task status: ", error);
        return res
            .status(500)
            .json(new ApiError(500, "Internal server error while updating task status."));
    }
})



export {
    addTask,
    deleteTask,
    updateTask,
    updateTaskStatus,
    getTasks
}