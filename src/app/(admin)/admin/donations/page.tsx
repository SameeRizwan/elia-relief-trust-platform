"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Filter, Search } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function DonationsPage() {
    const [donations, setDonations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "donations"));
                const fetchedData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setDonations(fetchedData.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
            } catch (error) {
                console.error("Error fetching donations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDonations();
    }, []);

    const filteredDonations = donations.filter(donation => {
        const search = searchQuery.toLowerCase();
        const donorName = (donation.donorName || "").toLowerCase();
        const donorEmail = (donation.donorEmail || "").toLowerCase();

        // Check appeal titles
        const appealTitle = donation.items && donation.items.length > 0
            ? donation.items.map((i: any) => i.title).join(", ").toLowerCase()
            : "general donation";

        return donorName.includes(search) || donorEmail.includes(search) || appealTitle.includes(search);
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Donations</h1>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Filter size={16} />
                        Filter
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <Download size={16} />
                        Export CSV
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search donations by donor or appeal..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5E36]"
                        />
                    </div>
                </div>

                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appeal</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredDonations.map((donation) => {
                            // Assuming items[0] is the main appeal or listing 'Multiple'
                            const appealTitle = donation.items && donation.items.length > 0
                                ? donation.items.map((i: any) => i.title).join(", ")
                                : "General Donation";

                            return (
                                <tr key={donation.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-900">{donation.donorName || "Guest"}</div>
                                        <div className="text-xs text-gray-500">{donation.donorEmail}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                                        {appealTitle}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                        £{donation.amount?.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(donation.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${donation.status === "Succeeded" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                            }`}>
                                            {donation.status}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                        {filteredDonations.length === 0 && !loading && (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                    {searchQuery ? `No donations found matching "${searchQuery}"` : "No donations found yet."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
