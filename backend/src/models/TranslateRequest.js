const mongoose = require("mongoose");
const TranslateRequest = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: String,
    status: {
        type: String,
        enum: ['pending', 'confirm', 'rejected'],
        default: 'pending'
    },

}, {timestamps:true});

module.exports = mongoose.model('TranslateRequest', TranslateRequest);