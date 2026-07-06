import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";




export const WorkFlowApi = createApi({
    reducerPath:"Workflow",
    baseQuery:baseQueryWithAuth,
    tagTypes:["Workflow"],
    endpoints:(builder)=>({
        // create workflow 
          CreateWorkflow:builder.mutation({
            query:(formdata)=>({
                url:"/api/workflow/create",
                method:"POST",
                body:formdata
            }),
            invalidatesTags:["Workflow"]
          }),
        // get work flow details 
        GetWorkflowDetails:builder.query({
            query:(id)=>`/api/workflow/${id}/details`,
            providesTags:["Workflow"]
        })        
    })
})

export const {useCreateWorkflowMutation,useGetWorkflowDetailsQuery} = WorkFlowApi