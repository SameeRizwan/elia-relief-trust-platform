"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { seedData } from "@/lib/seed"; // Add import

export default function AdminDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({
        totalDonations: 0,
        registeredUsers: 0,
        verifiedFamilies: 0,
        recentDonations: [] as any[]
    });

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        } else if (user) {
            // Fetch stats...
            const fetchStats = async () => {
                try {
                    // Fetch Users
                    const usersSnap = await getDocs(collection(db, "users"));
                    const familiesQuery = query(collection(db, "users"), where("isFamily", "==", true));
                    const familiesSnap = await getDocs(familiesQuery);

                    // Fetch Donations
                    const donationsSnap = await getDocs(collection(db, "donations"));
                    let totalAmount = 0;
                    const allDonations: any[] = [];

                    donationsSnap.forEach(doc => {
                        const data = doc.data();
                        totalAmount += data.amount || 0;
                        allDonations.push({ id: doc.id, ...data });
                    });

                    // Sort by date desc
                    allDonations.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                    setStats({
                        totalDonations: totalAmount,
                        registeredUsers: usersSnap.size,
                        verifiedFamilies: familiesSnap.size,
                        recentDonations: allDonations.slice(0, 5)
                    });

                } catch (error) {
                    console.error("Error fetching stats:", error);
                }
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
                    <p className="text-3xl font-bold text-[#0F5E36]">£{stats.totalDonations.toLocaleString()}</p>
                    <span className="text-green-500 text-sm font-medium">Lifetime received</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500">Registered Users</h3>
                    <p className="text-3xl font-bold text-[#0F5E36]">{stats.registeredUsers}</p>
                    <span className="text-blue-500 text-sm font-medium">Active Community</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500">Verified Families</h3>
                    <p className="text-3xl font-bold text-[#0F5E36]">{stats.verifiedFamilies}</p>
                    <span className="text-orange-500 text-sm font-medium">Needs Attention</span>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Recent Activity</h3>
                <div className="space-y-4">
                    {stats.recentDonations.map(donation => {
                        const appealTitle = donation.items && donation.items.length > 0
                            ? donation.items[0].title + (donation.items.length > 1 ? ` +${donation.items.length - 1} more` : "")
                            : "General Donation";

                        return (
                            <div key={donation.id} className="flex items-center justify-between py-3 border-b last:border-0 border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#0F5E36]/10 flex items-center justify-center text-[#0F5E36] font-bold">
                                        <span className="text-sm">{(donation.donorName || "G").charAt(0)}</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{donation.donorName || "Guest"} donated £{donation.amount}</p>
                                        <p className="text-sm text-gray-500">{appealTitle}</p>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-400">{new Date(donation.date).toLocaleDateString()}</span>
                            </div>
                        );
                    })}
                    {stats.recentDonations.length === 0 && (
                        <p className="text-gray-500 text-center py-4">No recent activity.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
