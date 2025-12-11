"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading, isAdmin, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Don't redirect if on login page
        if (pathname === "/admin/login") return;

        if (!loading) {
            if (!user || !isAdmin) {
                router.push("/admin/login");
            }
        }
    }, [user, loading, isAdmin, router, pathname]);

    // Show loading while checking auth
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="animate-spin text-[#0F5E36]" size={48} />
            </div>
        );
    }

    // If on login page, render without layout
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    // If not admin, show nothing (redirect will happen)
    if (!user || !isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="animate-spin text-[#0F5E36]" size={48} />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
                    <h2 className="text-sm font-medium text-gray-500">Welcome Back, Admin</h2>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={logout}
                            className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                        >
                            Logout
                        </button>
                        <div className="w-8 h-8 rounded-full bg-[#0F5E36]/10 flex items-center justify-center text-[#0F5E36] font-bold text-xs">
                            AD
                        </div>
                    </div>
                </header>
                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
