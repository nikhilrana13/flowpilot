"use client";
import StatsCard from "@/components/common/StatsCard";
import StatsCardShimmer from "@/components/common/StatsCardShimmer";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import RecentWorkflowCard from "@/components/workflow/RecentWorkflowCard";
import RecentWorkflowCardShimmer from "@/components/workflow/RecentWorkflowCardShimmer";
import { useGetDashboardStatsQuery } from "@/redux/api/DashboardApi";
import { ActivityIcon, FileClock, FolderKanban, Workflow } from "lucide-react";
import Link from "next/link";

const page = () => {
  const statsQuery = useGetDashboardStatsQuery();
  const stats = statsQuery?.data?.data?.stats;
  const recentWorkflows = statsQuery?.data?.data?.recentWorkflows || [];
  const loading = statsQuery?.isLoading
  // console.log("recent workflow",statsQuery)

  const statsData = [
    {
      title: "Active Workspaces",
      value: statsQuery.isError ? "--" : stats?.activeWorkspaces || 0,
      icon: FolderKanban,
    },
    {
      title: "Published Workflows",
      value: statsQuery.isError ? "--" : stats?.publishedWorkflows || 0,
      icon: Workflow,
    },
    {
      title: "Draft Workflows",
      value: statsQuery.isError ? "--" : stats?.draftWorkflows || 0,
      icon: FileClock,
    },
    {
      title: "Total Workflows",
      value: statsQuery.isError ? "--" : stats?.totalWorkflows || 0,
      icon: ActivityIcon,
    },
  ];
  return (
    <div className="flex flex-col gap-8 md:px-10 py-7 px-4">
      <WelcomeSection />
      {/* stats card */}
      {loading ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((_, i) => {
              return <StatsCardShimmer key={i} />;
            })}
          </div>
          <div className="flex flex-col gap-5 ">
            <div className="flex items-center justify-between">
              <h3 className="text-[1.2rem] font-medium">Recent Workflows</h3>
              <Link
                href="/dashboard/workflows"
                className="px-4 text-sm md:px-5 py-2 bg-gradient-to-r from-[#7C3AED] to-[#0566D9] text-white rounded-md  font-semibold"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => {
                return <RecentWorkflowCardShimmer key={i} />;
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {statsData?.map((item) => (
              <StatsCard key={item?.title} stats={item} />
            ))}
          </div>
          {/* recent workflows */}
          <div className="flex flex-col gap-5 ">
            <div className="flex items-center justify-between">
              <h3 className="text-[1.2rem] font-medium">Recent Workflows</h3>
              <Link
                href="/dashboard/workflows"
                className="px-4 text-sm md:px-5 py-2 bg-gradient-to-r from-[#7C3AED] to-[#0566D9] text-white rounded-md  font-semibold"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentWorkflows?.length ? (
                recentWorkflows?.map((workflow) => (
                  <RecentWorkflowCard key={workflow._id} workflow={workflow} />
                ))
              ) : (
                <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-[#27272A] bg-[#18181B]">
                  <p className="text-sm text-[#71717A]">No workflows yet.</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
