"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Droplets, Sun, AlertTriangle } from "lucide-react";

export function WhyHornOfAfrica() {
    return (
        <section className="py-24 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h4 className="text-[#0F5E36] font-bold uppercase tracking-widest text-sm mb-4">
                        Our Focus Region
                    </h4>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                        Why the Horn of Africa?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Somalia, Ethiopia, and Kenya face some of the world's most severe humanitarian challenges. Our focus on this region allows us to make the greatest impact.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                    >
                        <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-4">
                            <Sun size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Severe Drought</h3>
                        <p className="text-gray-600">
                            The region faces recurring cycles of devastating drought, destroying crops and livestock.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                    >
                        <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                            <Droplets size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Water Scarcity</h3>
                        <p className="text-gray-600">
                            Millions lack access to clean water, leading to disease and increased child mortality.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                    >
                        <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center text-red-500 mb-4">
                            <AlertTriangle size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Food Insecurity</h3>
                        <p className="text-gray-600">
                            Over 20 million people face severe hunger and malnutrition across the region.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                    >
                        <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-[#0F5E36] mb-4">
                            <MapPin size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Displacement</h3>
                        <p className="text-gray-600">
                            Conflict and climate change have displaced millions from their homes.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link href="/about">
                        <Button variant="outline" size="lg" className="border-2 border-[#0F5E36] text-[#0F5E36] hover:bg-[#0F5E36] hover:text-white rounded-full px-8 py-6 text-lg font-bold">
                            Learn More About Our Work
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
