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