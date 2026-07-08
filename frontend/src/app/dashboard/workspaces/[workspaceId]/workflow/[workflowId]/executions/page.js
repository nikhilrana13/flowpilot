"use client"
import ExecutionEmptyState from "@/components/execution/ExecutionEmptyState";
import ExecutionHistoryCard from "@/components/execution/ExecutionHistoryCard";
import ExecutionHistoryCardShimmer from "@/components/execution/ExecutionHistoryCardShimmer";
import { useGetExecutionsQuery } from "@/redux/api/ExecutionApi";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const page = () => {
const params = useParams();
const workspaceId = params.workspaceId;
const workflowId = params.workflowId;
const [page, setPage] = useState(1);
const executionQuery = useGetExecutionsQuery(page);
const isLoading = executionQuery?.isLoading
const isError = executionQuery?.isError
const executions = executionQuery?.data?.data?.executions || [];
const pagination = executionQuery?.data?.data?.pagination || {};


  
  const start = pagination?.currentPage ? (pagination.currentPage - 1) * pagination.limit + 1 : 0;
  const end = Math.min(pagination?.currentPage * pagination?.limit, pagination?.totalExecutions)

  return (
    <div className="min-h-screen bg-[#0F0F13] p-8">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Execution History</h1>
          <p className="mt-2 text-[#A1A1AA]">
            View and monitor all workflow executions.
          </p>
        </div>
      </div>
      {/* Cards */}
        { isLoading ? (
          <div className="space-y-4">
            {[1,2,3,4].map((_,i)=>{
              return(
                <ExecutionHistoryCardShimmer key={i} />
              )
            })}
          </div>
        ):executions?.length > 0 ? (
           <div className="space-y-4 py-5">
            {executions?.map((execution)=>{
              return (
                  <ExecutionHistoryCard key={execution._id} execution={execution} href={`/dashboard/workspaces/${workspaceId}/workflow/${workflowId}/executions/${execution._id}`} />
              )
            })}
            {/* pagination */}
            {
              !isLoading && (
                pagination?.totalPages > 1 && (
                  <div className="w-full border-[#6a4dff]/20 py-4 px-6 items-center  border-t flex justify-between">
                    <div className='flex items-center gap-2'>
                      <span className="text-[#747474] text-[0.9rem] sm:text-[0.8rem] font-[600]">
                        Showing {start || "NA"}-{end || "NA"} of{" "}
                        {pagination?.totalExecutions || 0} Executions
                      </span>
                    </div>
                    {/* page button */}
                    <div>
                      <div className="flex items-center gap-3">
                        {/* Prev */}
                        <button
                          onClick={() => page > 1 && setPage((prev) => prev - 1)}
                          disabled={page === 1}
                          className="px-3 py-1 disabled:cursor-not-allowed cursor-pointer text-sm rounded-md border border-[#6a4dff]/20 text-white disabled:opacity-50"
                        >
                          Prev
                        </button>

                        {/* Page info */}
                        <span className="text-white text-sm">
                          {pagination?.currentPage} / {pagination?.totalPages}
                        </span>
                        {/* Next */}
                        <button
                          onClick={() =>
                            page < pagination?.totalPages && setPage((prev) => prev + 1)
                          }
                          disabled={page === pagination?.totalPages}
                          className="px-3 py-1 disabled:cursor-not-allowed cursor-pointer text-sm rounded-md border border-[#6a4dff]/20 text-white disabled:opacity-50"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )
            }
           </div>
        ): isError ? (
          <p className="text-red-500 text-sm text-center">
            Error loading executions.please try again
          </p>
        ):(
          <ExecutionEmptyState />
        )
        }
       
    </div>
  );
};

export default page;
