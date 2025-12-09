"use client";

import { DonationList } from "@/components/donation/DonationList";
import { CartSummary } from "@/components/donation/CartSummary";

export default function DonatePage() {
    return (
        <div className="bg-gray-50 min-h-screen pb-32">
            {/* Header */}
            <div className="bg-[#0F5E36] text-white py-16 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Make a Donation</h1>
                    <p className="text-green-100 text-lg max-w-2xl mx-auto">
                        Your charity is a trust. We ensure 100% of your donation reaches those in need.
                    </p>
                </div>
            </div>

            {/* Warning / Info Banner */}
            <div className="bg-blue-50 border-b border-blue-100 py-3 text-center">
                <p className="text-blue-800 text-sm font-medium">
                    <span className="font-bold">100% Donation Policy</span> • Click on any appeal below to view details and donate.
                </p>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                <DonationList />
            </div>

            {/* Sticky Cart */}
            <CartSummary />
        </div>
    );
}
