"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Heart,
    History,
    CreditCard,
    Users,
    Settings,
    LogOut,
    LayoutDashboard
} from "lucide-react";

const donorNavItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Donation History", href: "/dashboard/history", icon: History },
    { name: "My Sponsorships", href: "/dashboard/sponsorships", icon: Users },
    { name: "Monthly Giving", href: "/dashboard/monthly", icon: Heart },
    { name: "Payment Methods", href: "/dashboard/payment-methods", icon: CreditCard },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DonorSidebar({ onLogout }: { onLogout: () => void }) {
    const pathname = usePathname();

    return (
        <div className="w-64 bg-white border-r border-gray-100 min-h-[calc(100vh-64px)] hidden md:flex flex-col">
            <div className="p-6">
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">My Account</h2>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {donorNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <Icon size={18} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={onLogout}
                    className="flex items-center gap-3 w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                >
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
