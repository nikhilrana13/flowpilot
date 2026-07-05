"use client"
import EmptyWorkspace from '@/components/workspace/EmptyWorkSpace';
import WorkspaceCard from '@/components/workspace/WorkSpaceCard';
import WorkspaceCardShimmer from '@/components/workspace/WorkSpaceCardShimmer';
import WorkspaceHeader from '@/components/workspace/WorkSpaceHeader';
import { useGetAllWorkSpaceQuery } from '@/redux/api/WorkspaceApi';
import React from 'react';

const page = () => {
   const workSpaceQuery = useGetAllWorkSpaceQuery()
   const workspaces = workSpaceQuery?.data?.data?.workspaces || [];
   const loading = workSpaceQuery?.isLoading 
   const isError = workSpaceQuery?.isError

   return (
    <div className="flex flex-col gap-8 md:px-10 py-7 px-4" >
      {/* header */}
      <WorkspaceHeader />
      {/* cards */}
      {loading ? (
            <div className="flex flex-col gap-5 ">
              {[1,2,3].map((_,i)=>{
                return (
                  <WorkspaceCardShimmer key={i} />
                )
              })}
            </div>
      ) : workspaces?.length > 0 ? (
        <div className="flex flex-col gap-5" >
            {workspaces?.map((workspace)=>(
                 <WorkspaceCard key={workspace?._id} workspace={workspace} />
            ))}
        </div>
      ) : isError ? (
        <p className="text-gray-500 text-sm text-center">
          Error loading workspaces.please try again
        </p>
      ) : (
        <EmptyWorkspace />
      )}
    </div>
  );
}

export default page;
  