"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    BarChart3,
    Users,
    HeartHandshake,
    Settings,
    FileText,
    LayoutDashboard,
    LogOut
} from "lucide-react";

const sidebarItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Campaigns", href: "/admin/campaigns", icon: HeartHandshake },
    { name: "Donations", href: "/admin/donations", icon: BarChart3 },
    { name: "Orphans", href: "/admin/orphans", icon: Users },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-[#0F5E36] min-h-screen flex flex-col text-white">
            <div className="p-6 border-b border-green-800">
                <h1 className="text-xl font-extrabold tracking-wider">ELIA ADMIN</h1>
                <p className="text-xs text-green-200 mt-1">Management Portal</p>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
                {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-white text-[#0F5E36] shadow-md"
                                    : "text-green-100 hover:bg-green-800 hover:text-white"
                            )}
                        >
                            <Icon size={18} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-green-800">
                <button className="flex items-center gap-3 w-full px-3 py-2 text-green-100 hover:text-white transition-colors text-sm font-medium hover:bg-green-800 rounded-lg">
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
