"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Home, Heart, Settings, LogOut, User } from "lucide-react";
import Image from "next/image";

const Sidebar = () => {
    const pathname = usePathname();
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const navItems = [
        { name: "Overview", href: "/dashboard", icon: Home },
        { name: "My Donations", href: "/dashboard", icon: Heart }, // Pointing to dashboard for now as it has history
        { name: "Profile", href: "/dashboard/profile", icon: User },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ];

    return (
        <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-30">
            <div className="p-6 flex items-center justify-center border-b border-gray-100">
                <Link href="/" className="flex items-center gap-3">
                    <div className="relative w-10 h-14">
                        <Image
                            src="/assets/elia-logo.jpg"
                            alt="Elia Relief Trust"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-extrabold text-[#0F5E36] tracking-tight leading-none">
                            ELIA
                        </span>
                        <span className="text-[10px] font-bold text-gray-900 tracking-wider">
                            RELIEF TRUST
                        </span>
                    </div>
                </Link>
            </div>

            <div className="flex-1 py-6 flex flex-col gap-1 px-3">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                ? "bg-green-50 text-[#0F5E36] font-medium"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <item.icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <LogOut size={20} />
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
