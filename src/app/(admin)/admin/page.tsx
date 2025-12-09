"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AdminPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({ totalDonations: 0, totalUsers: 0, families: 0 });

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/login");
                return;
            }
            // Simple role check (in reality, check Firestore user role)
            // For now, assume any logged in user can see this for DEMO puroposes 
            // or maybe restrict by specific email if the user asked.

            const fetchStats = async () => {
                // Mock stats fetching
                const usersSnap = await getDocs(collection(db, "users"));
                const familiesQuery = query(collection(db, "users"), where("isFamily", "==", true));
                const familiesSnap = await getDocs(familiesQuery);

                setStats({
                    totalDonations: 25420, // Mocked for now as we don't save donations to DB yet
                    totalUsers: usersSnap.size,
                    families: familiesSnap.size
                });
            }
            fetchStats();
        }
    }, [user, loading, router]);


    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold mb-8 text-gray-800">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500">Total Donations</h3>
                    <p className="text-3xl font-bold text-[#0F5E36]">${stats.totalDonations.toLocaleString()}</p>
                    <span className="text-green-500 text-sm font-medium">+12% from last month</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500">Registered Users</h3>
                    <p className="text-3xl font-bold text-[#0F5E36]">{stats.totalUsers}</p>
                    <span className="text-blue-500 text-sm font-medium">Active Community</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500">Verified Families</h3>
                    <p className="text-3xl font-bold text-[#0F5E36]">{stats.families}</p>
                    <span className="text-orange-500 text-sm font-medium">Needs Attention</span>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Recent Activity</h3>
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center justify-between py-3 border-b last:border-0 border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#0F5E36]/10 flex items-center justify-center text-[#0F5E36] font-bold">
                                    <span className="text-sm">JD</span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">John Doe donated $50</p>
                                    <p className="text-sm text-gray-500">Clean Water Project</p>
                                </div>
                            </div>
                            <span className="text-sm text-gray-400">2 mins ago</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
