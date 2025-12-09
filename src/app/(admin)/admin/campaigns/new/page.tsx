"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

export default function NewCampaignPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const [category, setCategory] = useState("Emergency");
    const [country, setCountry] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isUrgent, setIsUrgent] = useState(false);
    const [isZakatEligible, setIsZakatEligible] = useState(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await addDoc(collection(db, "campaigns"), {
                title,
                description,
                goalAmount: Number(targetAmount),
                raisedAmount: 0,
                category,
                country,
                imageUrl,
                isUrgent,
                isZakatEligible,
                active: true,
                slug: title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
                createdAt: serverTimestamp(),
            });

            router.push("/admin/campaigns");
        } catch (error) {
            console.error("Error creating campaign:", error);
            alert("Failed to create campaign");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/campaigns" className="text-gray-500 hover:text-gray-900 transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Create New Campaign</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">

                {/* Basic Info */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Title</label>
                            <input
                                required
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#0F5E36] focus:border-[#0F5E36]"
                                placeholder="e.g. Pakistan Flood Relief"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                            <input
                                required
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#0F5E36] focus:border-[#0F5E36]"
                                placeholder="e.g. Pakistan"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            required
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#0F5E36] focus:border-[#0F5E36]"
                            placeholder="Describe the campaign..."
                        />
                    </div>
                </div>

                {/* Financials & Logic */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900 border-b pb-2 mt-6">Details & Goals</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount (£)</label>
                            <input
                                required
                                type="number"
                                value={targetAmount}
                                onChange={(e) => setTargetAmount(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#0F5E36] focus:border-[#0F5E36]"
                                placeholder="5000"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#0F5E36] focus:border-[#0F5E36]"
                            >
                                <option value="Emergency">Emergency</option>
                                <option value="Water">Water</option>
                                <option value="Clean Water">Water for Life</option>
                                <option value="Food">Food Pack</option>
                                <option value="Education">Education</option>
                                <option value="Orphans">Orphans</option>
                                <option value="Mosque">Mosque</option>
                                <option value="Medical">Medical</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input
                            required
                            type="url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#0F5E36] focus:border-[#0F5E36]"
                            placeholder="https://example.com/image.jpg"
                        />
                        <p className="text-xs text-gray-500 mt-1">Paste a public image link (Unsplash, etc.)</p>
                    </div>

                    <div className="flex gap-6 mt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isUrgent}
                                onChange={(e) => setIsUrgent(e.target.checked)}
                                className="rounded text-[#0F5E36] focus:ring-[#0F5E36]"
                            />
                            <span className="text-sm font-medium text-gray-700">Mark as Urgent</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isZakatEligible}
                                onChange={(e) => setIsZakatEligible(e.target.checked)}
                                className="rounded text-[#0F5E36] focus:ring-[#0F5E36]"
                            />
                            <span className="text-sm font-medium text-gray-700">Zakat Eligible</span>
                        </label>
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                    <Link href="/admin/campaigns">
                        <Button type="button" variant="outline">Cancel</Button>
                    </Link>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#0F5E36] hover:bg-[#0b4628] text-white min-w-[120px]"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : (
                            <>
                                <Save size={18} className="mr-2" />
                                Create Campaign
                            </>
                        )}
                    </Button>
                </div>

            </form>
        </div>
    );
}
