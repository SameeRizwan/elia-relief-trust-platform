"use client";

import { motion } from "framer-motion";
import { Moon, Users, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function IftaarSection() {
    return (
        <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 bg-[#0F5E36] px-4 py-2 rounded-full mb-6">
                            <Moon size={18} />
                            <span className="font-bold text-sm uppercase tracking-wide">Ramadan Appeal</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                            Iftaar As-Saami
                        </h2>
                        <p className="text-2xl text-[#0F5E36] font-arabic mb-6">
                            إفطار الصائم
                        </p>
                        <p className="text-xl text-gray-300 leading-relaxed mb-8">
                            <em>"Whoever provides food for a fasting person to break his fast, will have a reward similar to his, without anything being diminished from the reward of the fasting person."</em>
                        </p>
                        <p className="text-gray-400 mb-8">— Sunan At-Tirmidhi</p>

                        <div className="bg-white/5 backdrop-blur rounded-2xl p-6 mb-8">
                            <h3 className="font-bold text-xl mb-4">Our Ramadan Journey</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#0F5E36] rounded-full flex items-center justify-center text-sm font-bold">1</div>
                                    <p><strong>Year 1:</strong> 10-20 families reached</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#0F5E36] rounded-full flex items-center justify-center text-sm font-bold">2</div>
                                    <p><strong>Year 2:</strong> 50 families reached</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#0F5E36] rounded-full flex items-center justify-center text-sm font-bold">3</div>
                                    <p><strong>Year 3:</strong> 200 families reached (5-7 people per household)</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white text-[#0F5E36] rounded-full flex items-center justify-center text-sm font-bold">?</div>
                                    <p><strong>This Year:</strong> With your help, we can reach even more!</p>
                                </div>
                            </div>
                        </div>

                        <Link href="/donate">
                            <Button size="lg" className="bg-[#0F5E36] hover:bg-[#0a4428] text-white rounded-full px-8 py-6 text-lg font-bold">
                                Feed a Fasting Family
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Right Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-6"
                    >
                        <div className="bg-white/5 backdrop-blur rounded-2xl p-8 text-center">
                            <div className="w-16 h-16 bg-[#0F5E36] rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users size={32} />
                            </div>
                            <span className="block text-4xl font-bold text-[#0F5E36] mb-2">200+</span>
                            <span className="text-gray-400">Families Fed Last Ramadan</span>
                        </div>

                        <div className="bg-white/5 backdrop-blur rounded-2xl p-8 text-center">
                            <div className="w-16 h-16 bg-[#0F5E36] rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart size={32} />
                            </div>
                            <span className="block text-4xl font-bold text-[#0F5E36] mb-2">1,200+</span>
                            <span className="text-gray-400">People Reached</span>
                        </div>

                        <div className="col-span-2 bg-gradient-to-r from-[#0F5E36] to-[#0a4428] rounded-2xl p-8 text-center">
                            <p className="text-xl mb-2">Imagine the reward of every fast you helped break.</p>
                            <p className="text-2xl font-bold text-white">SubhanAllah.</p>
                        </div>

                        <div className="col-span-2 bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                            <p className="text-gray-300 italic">
                                "What began among friends has become something real — built on sincerity, trust, and a shared commitment to serve those most in need."
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
