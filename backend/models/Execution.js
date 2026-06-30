import mongoose from "mongoose"
const ExecutionSchema = mongoose.Schema({
    workflowId:{type:mongoose.Schema.Types.ObjectId,ref:"Workflow",required:true},
    status:{type:String, enum:["running","completed","failed"],default:"running"},
    startedAt:{type:Date},
    endedAt:{type:Date},
    duration:{type:Number},
    error:{type:String,default:null},
    triggerType:{type:String, enum:["manual","webhook"]}
},{timestamps:true})

const Execution = mongoose.model("Execution",ExecutionSchema)
export default Execution