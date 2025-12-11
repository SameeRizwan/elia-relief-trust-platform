"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import Link from "next/link";

interface AppealFormProps {
    initialData?: any;
    onSubmit: (data: any) => Promise<void>;
    isLoading: boolean;
    buttonText: string;
}

export function AppealForm({ initialData, onSubmit, isLoading, buttonText }: AppealFormProps) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [targetAmount, setTargetAmount] = useState(initialData?.goalAmount || "");
    const [category, setCategory] = useState(initialData?.category || "Emergency");
    const [country, setCountry] = useState(initialData?.country || "");
    const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
    const [isUrgent, setIsUrgent] = useState(initialData?.isUrgent || false);
    const [isZakatEligible, setIsZakatEligible] = useState(initialData?.isZakatEligible || true);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
            setTargetAmount(initialData.goalAmount);
            setCategory(initialData.category);
            setCountry(initialData.country);
            setImageUrl(initialData.imageUrl);
            setIsUrgent(initialData.isUrgent);
            setIsZakatEligible(initialData.isZakatEligible);
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit({
            title,
            description,
            goalAmount: Number(targetAmount),
            category,
            country,
            imageUrl,
            isUrgent,
            isZakatEligible,
            slug: title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">

            {/* Basic Info */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Appeal Title</label>
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
                        placeholder="Describe the appeal..."
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
                            {buttonText}
                        </>
                    )}
                </Button>
            </div>

        </form>
    );
}
