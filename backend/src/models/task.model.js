import mongoose, {Schema} from "mongoose";

const taskSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        task: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'completed'],
            default: 'pending'
        },
        collaborators: {
            type: [String],
            default: [],
            validate: {
                validator: function(arr) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    const invalidEmails = arr.filter(email => !emailRegex.test(email));
                    return invalidEmails.length === 0;
                },
                message: "one or more collaborator emails are invalid"
            }
        },
        deadline: {
            type: Date,
            required: true,
            validate: {
                validator: function (value) {
                    return value > new Date();
                },
                message: "Deadline must be a future date."
            }
        }
    }, 
    {
        timestamps: true
    }
)

export const Task = mongoose.model("Task", taskSchema);