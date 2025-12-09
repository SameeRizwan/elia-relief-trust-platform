"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function OrphansPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Orphan Sponsorships</h1>
                <Button className="bg-[#0F5E36] hover:bg-[#0b4628] text-white gap-2">
                    <Plus size={16} />
                    Add Orphan Profile
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                        <div className="h-48 bg-gray-100 relative">
                            {/* Image Placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                No Image
                            </div>
                        </div>
                        <div className="p-5 flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg text-gray-900">Ahmed Al-Sayed</h3>
                                <span className="bg-[#0F5E36]/10 text-[#0F5E36] text-xs px-2 py-1 rounded-md font-medium">Age 10</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                Ahmed lost his father last year and lives with his mother and 3 siblings in minimal conditions.
                            </p>
                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-sm font-medium text-green-600">Available for Sponsorship</span>
                                <div className="text-sm font-bold text-gray-900">$40/mo</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
