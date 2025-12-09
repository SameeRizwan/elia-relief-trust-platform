"use client";

import { useState } from "react";
import { CAUSES } from "@/data/mockData";
import { AppealCard } from "@/components/AppealCard";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Filter } from "lucide-react";

const CATEGORIES = ["All", "Emergency", "Water", "Orphans", "Zakat", "Famine"];

export default function AppealsPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredCauses = activeCategory === "All"
        ? CAUSES
        : CAUSES.filter(c => c.category === activeCategory);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">

            {/* Page Header */}
            <div className="bg-white border-b border-gray-200 pt-12 pb-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Current <span className="text-[#0F5E36]">Appeals</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl">
                        Choose a cause to support today. Your donation is a lifeline for those in desperate need.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-12 items-center">
                    <div className="bg-white px-4 py-2 rounded-full border border-gray-200 flex items-center gap-2 mr-2 text-sm font-medium text-gray-500">
                        <Filter size={16} />
                        Filter by:
                    </div>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 ${activeCategory === cat
                                    ? "bg-[#0F5E36] text-white shadow-md shadow-green-900/20 transform scale-105"
                                    : "bg-white text-gray-600 hover:bg-gray-100 border border-transparent hover:border-gray-200"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Animated Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredCauses.map((cause, index) => (
                            <AppealCard
                                key={cause.id}
                                {...cause}
                                index={index}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Missing Content? CTA Section */}
                {filteredCauses.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No active appeals found in this category.</p>
                        <Button
                            onClick={() => setActiveCategory("All")}
                            variant="link"
                            className="text-[#0F5E36] font-bold"
                        >
                            View All Appeals
                        </Button>
                    </div>
                )}
            </div>

            {/* "Where Most Needed" Banner */}
            <div className="container mx-auto px-4 mt-20">
                <div className="bg-[#0F5E36] rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Can't Decide Where to Donate?</h2>
                        <p className="text-xl text-green-100 mb-8">
                            Donate to our "Where Most Needed" fund and we will ensure your aid reaches the most critical emergencies immediately.
                        </p>
                        <Button className="bg-white text-[#0F5E36] hover:bg-gray-100 font-bold px-10 py-6 text-lg rounded-full">
                            Donate to Most Needed Fund
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
}
