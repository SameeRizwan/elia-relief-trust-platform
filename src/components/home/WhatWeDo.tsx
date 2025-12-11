"use client";

import { motion } from "framer-motion";
import { MapPin, Heart, Globe2 } from "lucide-react";
import Image from "next/image";

export function WhatWeDo() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-[#0F5E36] font-bold uppercase tracking-widest text-sm mb-4">
                            About Elia Relief Trust
                        </h4>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-8">
                            Serving the
                            <span className="text-[#0F5E36]"> Horn of Africa</span> with Compassion
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            <strong>Elia Relief Trust</strong> is a UK-based charity dedicated to relieving poverty and supporting vulnerable communities, with a strong focus on <strong className="text-[#0F5E36]">Somalia, Ethiopia, and Kenya</strong>.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed mb-10">
                            Our work centres around providing food, clean water, education, and essential support, while also investing in long-term projects that help communities become more self-sufficient and resilient.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-[#0F5E36]/10 rounded-full flex items-center justify-center text-[#0F5E36] shrink-0">
                                    <MapPin size={28} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-gray-900 mb-1">Focused on the Horn of Africa</h3>
                                    <p className="text-gray-500">Somalia, Ethiopia, Kenya — where the need is greatest.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-[#0F5E36]/10 rounded-full flex items-center justify-center text-[#0F5E36] shrink-0">
                                    <Heart size={28} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-gray-900 mb-1">Faith-Inspired, Inclusive Impact</h3>
                                    <p className="text-gray-500">Guided by Islamic values, serving all in need.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-[#0F5E36]/10 rounded-full flex items-center justify-center text-[#0F5E36] shrink-0">
                                    <Globe2 size={28} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-gray-900 mb-1">UK-Based, Global Reach</h3>
                                    <p className="text-gray-500">Fundraising in England, delivering aid to Africa.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Image with Blob */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        {/* Green Blob Background */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0F5E36]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
                        <div className="absolute -bottom-8 -left-8 w-[400px] h-[400px] bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />

                        {/* Circular Image Container */}
                        <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full border-8 border-white shadow-2xl overflow-hidden z-10">
                            <Image
                                src="/assets/horn-of-africa-map.jpg"
                                alt="Helping communities in the Horn of Africa"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute bottom-10 -left-10 md:left-0 z-20 bg-white p-4 rounded-2xl shadow-xl">
                            <div className="text-center">
                                <span className="block text-3xl font-bold text-[#0F5E36]">4+</span>
                                <span className="text-xs text-gray-500 font-bold uppercase">Years of Service</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
