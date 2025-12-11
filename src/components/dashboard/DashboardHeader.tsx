"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Bell, Search, LogOut, User as UserIcon, Settings, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DashboardHeader = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-20">
            {/* Left: Title or Breadcrumbs */}
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
                {/* Search (Optional) */}
                <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
                    <Search size={16} className="text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm w-48 text-gray-700"
                    />
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                {/* User Profile Snippet & Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-3 pl-4 border-l border-gray-200 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                        <div className="flex flex-col items-end hidden sm:flex">
                            <span className="text-sm font-medium text-gray-900">{user?.displayName || "User"}</span>
                            <span className="text-xs text-gray-500 max-w-[150px] truncate">{user?.email}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#0F5E36] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                            {(user?.displayName?.charAt(0) || "U").toUpperCase()}
                        </div>
                        <ChevronDown size={16} className="text-gray-400" />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsDropdownOpen(false)}
                            />
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20 overflow-hidden">
                                <div className="px-4 py-3 border-b border-gray-100 sm:hidden">
                                    <p className="text-sm font-medium text-gray-900">{user?.displayName || "User"}</p>
                                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                </div>
                                <Link
                                    href="/dashboard/profile"
                                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0F5E36] transition-colors"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    <UserIcon size={16} />
                                    Profile
                                </Link>
                                <Link
                                    href="/dashboard/settings"
                                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0F5E36] transition-colors"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    <Settings size={16} />
                                    Settings
                                </Link>
                                <div className="border-t border-gray-100 mt-1">
                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut size={16} />
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
