"use client";

import { motion } from "framer-motion";
import { Calendar, Globe2 } from "lucide-react";
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
                            What Elia Relief Trust Do?
                        </h4>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-8">
                            <span className="text-[#0F5E36]">Elia Relief Trust</span> is a Humanitarian Aid and Disaster Relief Organisation in the UK
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-10">
                            Not only do we provide immediate relief to those in need, but we also focus on projects that empower and give individuals the opportunity to transform their lives for the better. With your support, they gain the skills and tools needed to build a brighter future, free from the grip of poverty.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-[#0F5E36]/10 rounded-full flex items-center justify-center text-[#0F5E36] shrink-0">
                                    <Calendar size={28} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-gray-900 mb-1">We have been operating for more than a decade</h3>
                                    <p className="text-gray-500">Established in 2013, serving humanity with integrity.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-[#0F5E36]/10 rounded-full flex items-center justify-center text-[#0F5E36] shrink-0">
                                    <Globe2 size={28} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-gray-900 mb-1">Provide and facilitate aid across more than 30 countries worldwide</h3>
                                    <p className="text-gray-500">From Gaza to Yemen, we go where the need is greatest.</p>
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
                                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop"
                                alt="Volunteer"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Floating Logo Badge */}
                        <div className="absolute bottom-10 -left-10 md:left-0 z-20 bg-white p-4 rounded-2xl shadow-xl">
                            <div className="text-center">
                                <span className="block text-3xl font-bold text-[#0F5E36]">10+</span>
                                <span className="text-xs text-gray-500 font-bold uppercase">Years of Service</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
