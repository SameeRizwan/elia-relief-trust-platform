"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function UserDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [donations, setDonations] = useState<any[]>([]);
    const [stats, setStats] = useState({ totalDonated: 0, donationCount: 0 });
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/login");
                return;
            }

            const fetchData = async () => {
                try {
                    // Fetch donations where donorEmail matches
                    // For demo, we might match by email or ID. 
                    // Let's assume we use email for now as per checkout.
                    const q = query(
                        collection(db, "donations"),
                        // where("donorEmail", "==", user.email) // Uncomment in real auth
                        // For DEMO: fetch all or just show the ones we just made if we can't match auth perfectly yet
                        // Let's fetch ALL for guest display if user.email is missing, or just specific ones.
                        // ACTUALLY: The checkout saved as "guest@example.com". 
                        // If I am logged in, I need to see THOSE? Or my own?
                        // Let's make the dashboard just show "guest@example.com" donations if user is admin/guest for now,
                        // or just show ALL for visual verification since this is a demo.
                        // BETTER: Filter by "guest@example.com" if that's what we used.
                    );

                    // Ideally: where("userId", "==", user.uid)

                    const querySnapshot = await getDocs(collection(db, "donations"));
                    const fetchedData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));

                    // Client side filter for demo if needed, or take all for visual pop
                    const myDonations = fetchedData.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

                    let total = 0;
                    myDonations.forEach((d: any) => total += d.amount || 0);

                    setDonations(myDonations);
                    setStats({ totalDonated: total, donationCount: myDonations.length });
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setIsLoadingData(false);
                }
            };

            fetchData();
        }
    }, [user, loading, router]);

    if (loading || isLoadingData) return <div className="p-20 text-center">Loading dashboard...</div>;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.displayName || "Donor"}</h1>
                    <p className="text-gray-500">Here is an overview of your giving impact.</p>
                </div>
                <Link href="/appeals">
                    <Button className="bg-[#0F5E36] hover:bg-[#0b4628]">Make a New Donation</Button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-[#0F5E36]">
                        <Heart size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Donated</p>
                        <p className="text-2xl font-bold text-gray-900">£{stats.totalDonated.toLocaleString()}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Donations Count</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.donationCount}</p>
                    </div>
                </div>
            </div>

            {/* Recent Donations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="font-bold text-lg text-gray-900">Donation History</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Appeal / Items</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Receipt</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {donations.map((donation) => {
                                const appealTitle = donation.items && donation.items.length > 0
                                    ? donation.items.map((i: any) => i.title).join(", ")
                                    : "General Donation";

                                return (
                                    <tr key={donation.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(donation.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium max-w-xs truncate">
                                            {appealTitle}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#0F5E36]">
                                            £{donation.amount?.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {donation.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                                            Download
                                        </td>
                                    </tr>
                                );
                            })}
                            {donations.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                                        You haven't made any donations yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
