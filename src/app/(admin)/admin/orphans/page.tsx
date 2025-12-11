"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function OrphansPage() {
    const [orphans, setOrphans] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchOrphans = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "orphans"));
                const fetched: any[] = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setOrphans(fetched);
            } catch (error) {
                console.error("Error fetching orphans:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrphans();
    }, []);

    const filteredOrphans = orphans.filter(orphan =>
        orphan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        orphan.country.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Orphans</h1>
                <Link href="/admin/orphans/new">
                    <Button className="bg-[#0F5E36] hover:bg-[#0b4628] text-white gap-2">
                        <Plus size={16} />
                        Register Orphan
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search orphans..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5E36]"
                        />
                    </div>
                </div>

                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name/Age</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredOrphans.map((orphan) => (
                            <tr key={orphan.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        {orphan.imageUrl && (
                                            <img src={orphan.imageUrl} alt={orphan.name} className="w-8 h-8 rounded-full object-cover" />
                                        )}
                                        <div>
                                            <div className="font-medium text-gray-900">{orphan.name}</div>
                                            <div className="text-xs text-gray-500">{orphan.age} years • {orphan.gender}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{orphan.country}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#0F5E36]">£{orphan.monthlyCost}/mo</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${orphan.status === "Available" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                        }`}>
                                        {orphan.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link href={`/admin/orphans/${orphan.id}/edit`} className="text-[#0F5E36] hover:text-[#0b4628]">Edit</Link>
                                </td>
                            </tr>
                        ))}
                        {filteredOrphans.length === 0 && !loading && (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                    No orphans found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
