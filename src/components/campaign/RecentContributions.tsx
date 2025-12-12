"use client";

import { useState, useEffect } from "react";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserCircle, Clock, Heart } from "lucide-react";
import { Donation } from "@/types";
import { formatDistanceToNow } from "date-fns";

export function RecentContributions({ campaignId }: { campaignId?: string }) {
    const [donations, setDonations] = useState<any[]>([]);
    const [filter, setFilter] = useState<'recent' | 'top'>('recent');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDonations = async () => {
            if (!campaignId) return;

            setLoading(true);
            try {
                // Determine query based on filter
                const donationsRef = collection(db, "donations");
                let q;

                if (filter === 'top') {
                    // Fetch top amounts globally (limit 50 to have enough buffer for filtering)
                    q = query(donationsRef, orderBy("amount", "desc"), limit(50));
                } else {
                    // Fetch recent globally
                    q = query(donationsRef, orderBy("createdAt", "desc"), limit(50));
                }

                const snapshot = await getDocs(q);
                let fetchedDonations = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Client-side filter
                if (campaignId) {
                    fetchedDonations = fetchedDonations.filter((d: any) =>
                        d.campaignIds && Array.isArray(d.campaignIds) && d.campaignIds.includes(campaignId)
                    );
                }

                // Slice to final limit
                setDonations(fetchedDonations.slice(0, 10));
            } catch (error) {
                console.error("Error fetching donations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDonations();
    }, [filter, campaignId]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Recent Contributions</h3>

                <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                        onClick={() => setFilter('recent')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${filter === 'recent' ? 'bg-white text-[#0F5E36] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        Recent
                    </button>
                    <button
                        onClick={() => setFilter('top')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${filter === 'top' ? 'bg-white text-[#0F5E36] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        Highest
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-8 text-gray-400">Loading contributions...</div>
                ) : donations.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">Be the first to donate!</div>
                ) : (
                    donations.map((donation) => (
                        <div key={donation.id} className="flex gap-4 p-4 rounded-lg bg-gray-50 border border-transparent hover:border-gray-200 transition-colors">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-[#e6f4ea] rounded-full flex items-center justify-center text-[#0F5E36]">
                                    <UserCircle size={24} />
                                </div>
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-gray-900">
                                            {donation.donorName || "Anonymous"}
                                        </p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                            <Clock size={12} />
                                            {donation.createdAt?.toDate ? formatDistanceToNow(donation.createdAt.toDate(), { addSuffix: true }) : "Just now"}
                                        </p>
                                    </div>
                                    <span className="font-bold text-[#0F5E36] bg-green-50 px-2 py-1 rounded text-sm">
                                        £{donation.amount?.toLocaleString()}
                                    </span>
                                </div>
                                {donation.comment && (
                                    <div className="mt-2 text-sm text-gray-600 bg-white p-2 rounded border border-gray-100 italic relative">
                                        <span className="absolute -top-1 left-4 w-2 h-2 bg-white border-t border-l border-gray-100 transform rotate-45"></span>
                                        "{donation.comment}"
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
