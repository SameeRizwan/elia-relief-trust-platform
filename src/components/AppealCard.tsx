"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface AppealProps {
    id: string;
    title: string;
    description: string;
    image: string;
    raised: number;
    goal: number;
    category: string;
    index: number;
    donorCount?: number;
}

export function AppealCard({ id, title, description, image, raised, goal, category, index, donorCount = 0 }: AppealProps) {
    const percentage = Math.min(100, Math.round((raised / goal) * 100));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
        >
            {/* Image Container with Hover Zoom */}
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#0F5E36]">
                    {category}
                </div>
                {donorCount > 0 && (
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1.5">
                        <Heart className="w-3 h-3 fill-current" />
                        {donorCount} Donors
                    </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-[#0F5E36] transition-colors">{title}</h3>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
                    {description}
                </p>

                {/* Progress Bar */}
                <div className="mt-auto space-y-3">
                    <div className="flex justify-between text-sm font-medium">
                        <span className="text-[#0F5E36]">Raised: £{raised.toLocaleString()}</span>
                        <span className="text-gray-400">Goal: £{goal.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${percentage}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-[#0F5E36] rounded-full"
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <Link href={`/donate/${id}`} className="flex-1">
                            <Button className="w-full bg-[#0F5E36] hover:bg-[#0b4628] text-white font-bold h-12 rounded-xl shadow-lg shadow-green-900/10">
                                Donate Now
                            </Button>
                        </Link>
                        <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50">
                            <Heart size={20} />
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
