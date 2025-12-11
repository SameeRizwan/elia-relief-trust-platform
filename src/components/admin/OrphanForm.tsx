"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import Link from "next/link";

interface OrphanFormProps {
    initialData?: any;
    onSubmit: (data: any) => Promise<void>;
    isLoading: boolean;
    buttonText: string;
}

export function OrphanForm({ initialData, onSubmit, isLoading, buttonText }: OrphanFormProps) {
    const [name, setName] = useState(initialData?.name || "");
    const [age, setAge] = useState(initialData?.age || "");
    const [gender, setGender] = useState(initialData?.gender || "Male");
    const [country, setCountry] = useState(initialData?.country || "");
    const [story, setStory] = useState(initialData?.story || "");
    const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
    const [monthlyCost, setMonthlyCost] = useState(initialData?.monthlyCost || "30");
    const [status, setStatus] = useState(initialData?.status || "Available");

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setAge(initialData.age);
            setGender(initialData.gender);
            setCountry(initialData.country);
            setStory(initialData.story);
            setImageUrl(initialData.imageUrl);
            setMonthlyCost(initialData.monthlyCost);
            setStatus(initialData.status);
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit({
            name,
            age: Number(age),
            gender,
            country,
            story,
            imageUrl,
            monthlyCost: Number(monthlyCost),
            status,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Orphan Profile</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#0F5E36] focus:border-[#0F5E36]" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input required type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#0F5E36] focus:border-[#0F5E36]" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#0F5E36] focus:border-[#0F5E36]">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input required type="text" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#0F5E36] focus:border-[#0F5E36]" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Story / Bio</label>
                <textarea required rows={4} value={story} onChange={(e) => setStory(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#0F5E36] focus:border-[#0F5E36]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input required type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#0F5E36] focus:border-[#0F5E36]" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#0F5E36] focus:border-[#0F5E36]">
                        <option value="Available">Available</option>
                        <option value="Sponsored">Sponsored</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Cost (£)</label>
                    <input required type="number" value={monthlyCost} onChange={(e) => setMonthlyCost(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#0F5E36] focus:border-[#0F5E36]" />
                </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                <Link href="/admin/orphans">
                    <Button type="button" variant="outline">Cancel</Button>
                </Link>
                <Button type="submit" disabled={isLoading} className="bg-[#0F5E36] hover:bg-[#0b4628] text-white min-w-[120px]">
                    {isLoading ? <Loader2 className="animate-spin" /> : <><Save size={18} className="mr-2" />{buttonText}</>}
                </Button>
            </div>
        </form>
    );
}
