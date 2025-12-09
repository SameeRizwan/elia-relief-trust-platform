"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export function QuickDonateWidget() {
    const [amount, setAmount] = useState(50);
    const [type, setType] = useState<"single" | "monthly">("single");
    const [customAmount, setCustomAmount] = useState("");
    const { addToCart } = useCart();
    const router = useRouter();

    const presets = [20, 50, 100, 200, 500];

    const handleDonate = () => {
        addToCart({
            id: `quick-${Date.now()}`,
            title: `General ${type === 'monthly' ? 'Monthly ' : ''}Donation`,
            amount: amount,
            type: type
        });
        router.push('/donate');
    };

    return (
        <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full relative z-30">
            <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
                <button
                    onClick={() => setType("single")}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${type === "single"
                        ? "bg-white text-[#0F5E36] shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Single Donation
                </button>
                <button
                    onClick={() => setType("monthly")}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${type === "monthly"
                        ? "bg-white text-[#0F5E36] shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Monthly Donation
                </button>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
                {presets.map((val) => (
                    <button
                        key={val}
                        onClick={() => { setAmount(val); setCustomAmount(""); }}
                        className={`py-3 rounded-lg font-bold border-2 transition-all ${amount === val && !customAmount
                            ? "border-[#0F5E36] bg-green-50 text-[#0F5E36]"
                            : "border-gray-100 bg-white text-gray-600 hover:border-green-200"
                            }`}
                    >
                        £{val} {/* UK Currency for One Ummah feel */}
                    </button>
                ))}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">£</span>
                    <input
                        type="number"
                        placeholder="Other"
                        value={customAmount}
                        onChange={(e) => { setCustomAmount(e.target.value); setAmount(Number(e.target.value)); }}
                        className="w-full h-full pl-6 pr-2 rounded-lg border-2 border-gray-100 font-bold text-black focus:border-[#0F5E36] focus:outline-none"
                    />
                </div>
            </div>

            <div className="mb-6">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded checked:bg-[#0F5E36] flex items-center justify-center">
                        {/* Checkbox visual placeholder */}
                    </div>
                    <span>I want to gift aid this donation</span>
                </label>
            </div>

            <Button
                onClick={handleDonate}
                className="w-full py-6 text-lg font-bold bg-[#0F5E36] hover:bg-[#0b4628] text-white shadow-lg shadow-green-900/20"
            >
                Donate £{amount} Now
            </Button>

            <p className="text-center text-xs text-gray-400 mt-4">
                Secure donation powered by Stripe
            </p>
        </div>
    );
}
