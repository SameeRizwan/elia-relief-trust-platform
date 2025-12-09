"use client";

import { useState } from "react";
import { CAUSES } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info, ShoppingCart } from "lucide-react";

const CATEGORIES = ["Popular Appeals", "Other Appeals"];
const PRESET_AMOUNTS = [20, 50, 100, 250];

export function DonationList() {
    const { addToCart } = useCart();
    const [activeTab, setActiveTab] = useState("Popular Appeals");
    const [expandedCauseId, setExpandedCauseId] = useState<string | null>(null);
    const [amount, setAmount] = useState<number>(50);
    const [customAmount, setCustomAmount] = useState<string>("");

    // Simple logic to split causes for the tabs
    const popularCauses = CAUSES.slice(0, 5);
    const otherCauses = CAUSES.slice(5);

    const displayedCauses = activeTab === "Popular Appeals" ? popularCauses : otherCauses;

    const handleExpand = (id: string) => {
        if (expandedCauseId === id) {
            setExpandedCauseId(null);
        } else {
            setExpandedCauseId(id);
            setAmount(50); // Reset default
            setCustomAmount("");
        }
    };

    const handleAddToCart = (cause: any) => {
        const finalAmount = customAmount ? parseFloat(customAmount) : amount;
        if (!finalAmount || finalAmount <= 0) return;

        addToCart({
            id: cause.id,
            title: cause.title,
            amount: finalAmount,
            type: "single" // default for now
        });

        // Optional user feedback here?
        setExpandedCauseId(null);
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Tabs */}
            <div className="flex rounded-lg overflow-hidden border border-[#0F5E36] mb-8">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        className={`flex-1 py-4 text-center font-bold text-lg transition-colors ${activeTab === cat
                                ? "bg-[#0F5E36] text-white"
                                : "bg-white text-[#0F5E36] hover:bg-green-50"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="space-y-3 pb-32">
                {displayedCauses.map((cause) => {
                    const isExpanded = expandedCauseId === cause.id;

                    return (
                        <div key={cause.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">

                            {/* Header (Clickable) */}
                            <button
                                onClick={() => handleExpand(cause.id)}
                                className="w-full flex items-center justify-between p-5 text-left"
                            >
                                <span className={`font-bold text-lg ${isExpanded ? "text-[#0F5E36]" : "text-gray-800"}`}>
                                    {cause.title}
                                </span>
                                <div className="text-[#0F5E36]">
                                    {isExpanded ? "−" : "+"}
                                </div>
                            </button>

                            {/* Expanded Content */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden bg-gray-50 border-t border-gray-100"
                                    >
                                        <div className="p-6">
                                            <p className="text-gray-600 mb-6">{cause.description}</p>

                                            {/* Amount Grid */}
                                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
                                                {PRESET_AMOUNTS.map((val) => (
                                                    <button
                                                        key={val}
                                                        onClick={() => { setAmount(val); setCustomAmount(""); }}
                                                        className={`py-3 rounded-lg font-bold border transition-all ${amount === val && !customAmount
                                                                ? "bg-[#0F5E36] text-white border-[#0F5E36]"
                                                                : "bg-white text-gray-700 border-gray-200 hover:border-[#0F5E36]"
                                                            }`}
                                                    >
                                                        £{val}
                                                    </button>
                                                ))}
                                                <input
                                                    type="number"
                                                    placeholder="Other"
                                                    value={customAmount}
                                                    onChange={(e) => { setCustomAmount(e.target.value); setAmount(0); }}
                                                    className="col-span-1 sm:col-span-1 px-3 rounded-lg border border-gray-200 focus:border-[#0F5E36] focus:outline-none text-center font-bold text-black"
                                                />
                                            </div>

                                            <div className="flex gap-4">
                                                <Button
                                                    onClick={() => handleAddToCart(cause)}
                                                    className="flex-1 bg-[#0F5E36] hover:bg-[#0b4628] h-12 text-lg font-bold"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <ShoppingCart size={20} />
                                                        Add to Cart
                                                    </div>
                                                </Button>
                                                <Button variant="outline" className="h-12 w-12 border-gray-300 text-gray-500">
                                                    <Info size={20} />
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
