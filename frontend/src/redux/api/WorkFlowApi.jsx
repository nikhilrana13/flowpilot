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
        }),
        // update workflow 
        UpdateWorkflow:builder.mutation({
            query:({nodes,edges,id})=>({
                url:`/api/workflow/update/${id}`,
                method:"PUT",
                body:{
                    nodes,
                    edges
                }
            }),
            invalidatesTags:["Workflow"]
        }),  
        // published workflow 
        PublishedWorkflow:builder.mutation({
             query:({nodes,edges,id})=>({
                url:`/api/workflow/published/${id}`,
                method:"PUT",
                body:{
                    nodes,
                    edges
                }
            }),
            invalidatesTags:["Workflow"]
        })
    })
})

export const {useCreateWorkflowMutation,useGetWorkflowDetailsQuery,useUpdateWorkflowMutation,usePublishedWorkflowMutation} = WorkFlowApi