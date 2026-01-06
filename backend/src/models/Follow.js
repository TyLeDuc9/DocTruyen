const mongoose = require('mongoose')
const followSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    storyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Story",
        required:true
    }
},{timestamps:true})

followSchema.index(
    {userId:1, storyId:1},
    {unique:true}
)

module.exports=mongoose.model('Follow', followSchema)