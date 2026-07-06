import mongoose from "mongoose"
const WorkFlowSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    workspaceId:{type:mongoose.Schema.Types.ObjectId,ref:"WorkSpace",required:true},
    description:{type:String,default:"",maxlength:300},
    status:{type:String,enum:["draft","published"],default:"draft"},
    webhookId:{type:String,unique:true,sparse:true,default:undefined},
    name:{type:String,required:true,maxlength:50,trim:true},
    nodes:{type: mongoose.Schema.Types.Mixed,default:[]},
    edges:{type: mongoose.Schema.Types.Mixed,default:[]},
    executionCount:{type:Number,default:0},
    lastExecutedAt:{type:Date}
},{timestamps:true})

const WorkFlow = mongoose.model("Workflow",WorkFlowSchema)
export default WorkFlow 

