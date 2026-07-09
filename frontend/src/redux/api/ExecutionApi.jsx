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
          }),
         // get execution history
         GetExecutions:builder.query({
            query:(page)=>({
               url:"/api/execution/all",
               params:{
                  page:page
               }
            }),
            providesTags:["Execution"]
         }),
         // get Execution Details 
         GetExecutionDetails:builder.query({
            query:(id)=>`/api/execution/${id}`,
            providesTags:["Execution"]
         })
    })
})
export const {useExecuteWorkflowMutation,useGetExecutionsQuery,useGetExecutionDetailsQuery} = ExecutionApi 