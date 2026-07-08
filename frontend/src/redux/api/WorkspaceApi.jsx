import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";




export const WorkSpaceApi = createApi({
    reducerPath:"WorkSpace",
    baseQuery:baseQueryWithAuth,
    tagTypes:["WorkSpace"],
    endpoints:(builder)=>({
          //  get workspaces
          GetAllWorkSpace:builder.query({
              query:()=>"/api/workspaces/my",
              providesTags:["WorkSpace"]
          }),
          // get workspace details 
          GetWorkSpaceDetails:builder.query({
            query:(id)=>`/api/workspaces/${id}`,
            providesTags:["WorkSpace"]
          }),  
          // Create workspace
          CreateWorkSpace:builder.mutation({
            query:(spacename)=>({
                url:"/api/workspaces/create",
                method:"POST",
                body:{
                  spacename:spacename
                }
            }),
            invalidatesTags:["WorkSpace"]
          })   
    })
})

export const {useGetAllWorkSpaceQuery,useGetWorkSpaceDetailsQuery,useCreateWorkSpaceMutation} = WorkSpaceApi