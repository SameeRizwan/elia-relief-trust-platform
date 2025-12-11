"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BarChart3, TrendingUp, Users, Calendar } from "lucide-react";

export default function ReportsPage() {
    const [stats, setStats] = useState({
        totalRaised: 0,
        monthlyRaised: 0,
        totalDonors: 0,
        avgDonation: 0
    });
    const [recentDonations, setRecentDonations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Donations
                const donationsSnap = await getDocs(collection(db, "donations"));
                const donations = donationsSnap.docs.map(doc => ({ ...doc.data(), date: new Date(doc.data().date) }));

                // Calculate Total Raised
                let total = 0;
                let currentMonthTotal = 0;
                const now = new Date();
                const currentMonth = now.getMonth();
                const currentYear = now.getFullYear();

                donations.forEach((d: any) => {
                    const amount = Number(d.amount) || 0;
                    total += amount;
                    if (d.date.getMonth() === currentMonth && d.date.getFullYear() === currentYear) {
                        currentMonthTotal += amount;
                    }
                });

                // Unique Donors (by email)
                const uniqueDonors = new Set(donations.map((d: any) => d.donorEmail)).size;

                const avg = total / (donations.length || 1);

                setStats({
                    totalRaised: total,
                    monthlyRaised: currentMonthTotal,
                    totalDonors: uniqueDonors,
                    avgDonation: avg
                });

                // Recent Top Donations (for analytics list)
                const sorted = donations.sort((a: any, b: any) => b.amount - a.amount).slice(0, 5);
                setRecentDonations(sorted);

            } catch (error) {
                console.error("Error fetching report data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading reports...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">Export PDF</button>
                    <button className="px-4 py-2 bg-[#0F5E36] text-white hover:bg-[#0b4628] rounded-lg text-sm font-medium transition-colors">Export CSV</button>
                </div>
            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 text-[#0F5E36] flex items-center justify-center">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Raised</p>
                            <p className="text-2xl font-bold text-gray-900">£{stats.totalRaised.toLocaleString()}</p>
                        </div>
                    </div>
                    <p className="text-xs text-green-600 font-medium">+15% vs last year</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">This Month</p>
                            <p className="text-2xl font-bold text-gray-900">£{stats.monthlyRaised.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Donors</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.totalDonors}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                            <BarChart3 size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Avg. Donation</p>
                            <p className="text-2xl font-bold text-gray-900">£{Math.round(stats.avgDonation)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Donations Analysis */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Top High-Value Donations</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Donor</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Items</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {recentDonations.map(d => (
                                <tr key={d.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {d.donorName || "Guest"}
                                        <div className="text-xs text-gray-500">{d.donorEmail}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-[#0F5E36]">£{d.amount}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(d.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                                        {d.items?.map((i: any) => i.title).join(", ") || "General"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
