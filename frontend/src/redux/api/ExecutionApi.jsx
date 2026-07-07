import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";



export const ExecutionApi = createApi({
    reducerPath:"Execution",
    baseQuery:baseQueryWithAuth,
    tagTypes:["Execution"],
    endpoints:(builder)=>({
          // execute workflow
          ExecuteWorkflow:builder.mutation({
             query:(id)=>({
                url:`/api/execution/${id}/execute`,
                method:"POST",
             }),
             invalidatesTags:["Execution"]
          })
    })
})
export const {useExecuteWorkflowMutation} = ExecutionApi 