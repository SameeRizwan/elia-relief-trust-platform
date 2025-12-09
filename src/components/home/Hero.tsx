"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { QuickDonateWidget } from "./QuickDonateWidget";

export function Hero() {
    return (
        <div className="relative min-h-[700px] w-full overflow-hidden bg-slate-900 flex items-center">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />

            {/* Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2940&auto=format&fit=crop")' }}
            />

            <div className="relative z-20 container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20 pb-20">
                {/* Left Content */}
                <div className="text-white max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 mb-6"
                    >
                        <span className="bg-[#0F5E36] text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide">
                            Urgent Appeal
                        </span>
                        <span className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium">
                            100% Donation Policy
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
                    >
                        Hope For <br />
                        <span className="text-[#0F5E36]">Humanity</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-white font-medium mb-8 leading-relaxed drop-shadow-md"
                    >
                        Elia Relief Trust is dedicated to serving the most vulnerable. Your donation provides life-saving food, water, and shelter.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Link href="/appeals">
                            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black rounded-full px-8 py-6 text-lg font-bold bg-transparent transition-all">
                                View Active Appeals
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Right Widget */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-center lg:justify-end"
                >
                    <QuickDonateWidget />
                </motion.div>
            </div>
        </div>
    );
}
