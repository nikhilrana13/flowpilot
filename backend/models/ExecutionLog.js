import mongoose from "mongoose"
const ExecutionLogSchema = new mongoose.Schema({
    executionId:{type:mongoose.Schema.Types.ObjectId,ref:"Execution",required:true},
    nodeId:{type:String},
    nodeType:{type:String},
    status:{ type:String,enum:["running","completed","failed"],default:"running"},
    startedAt:{type:Date},
    endedAt:{type:Date},
    input:{type:mongoose.Schema.Types.Mixed},
    output:{type:mongoose.Schema.Types.Mixed},
    error:{type:String,default:null}
},{timestamps:true})

const ExecutionLog = mongoose.model("ExecutionLog",ExecutionLogSchema)
export default ExecutionLog