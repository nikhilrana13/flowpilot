import mongoose from "mongoose"

const WorkSpaceSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    spacename:{type:String,required:true,maxlength:50,trim:true,lowercase:true},
},{timestamps:true})

const WorkSpace = mongoose.model("WorkSpace",WorkSpaceSchema)
export default WorkSpace
