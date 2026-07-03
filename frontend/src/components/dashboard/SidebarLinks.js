import { LayoutDashboard, FolderKanban, Workflow, Activity, BarChart3, PlugZap, Settings, ChevronDown, } from "lucide-react";
export const sidebarLinks = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Workspaces",
        icon: FolderKanban,
        children: [
            {
                label: "My Workspaces",
                href: "/dashboard/workspaces",
            },
            {
                label: "Create Workspace",
                href: "/dashboard/workspaces/create",
            },
        ],
    },
    {
        label: "Workflows",
        icon: Workflow,
        children: [
            {
                label: "All Workflows",
                href: "/dashboard/workflows",
            },
            {
                label: "Create Workflow",
                href: "/dashboard/workflows/create",
            },
            {
                label: "Executions",
                href: "/dashboard/executions",
            },
        ],
    },
    {
        label: "Integrations",
        href: "/dashboard/integrations",
        icon: PlugZap,
    },
    {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];