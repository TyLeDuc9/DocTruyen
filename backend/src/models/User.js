const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatarUrl: {
            type: String,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: ["user", "admin", "author"],
            default: "user",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
