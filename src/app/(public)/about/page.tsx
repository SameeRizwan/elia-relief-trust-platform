"use client";

import { ShieldCheck, Heart, Globe, Users, Target, BookOpen, Clock, MapPin, Droplets, Baby, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-slate-900 text-white py-32 overflow-hidden">
                <div className="absolute inset-0 bg-[#0F5E36]/30 mix-blend-overlay z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2940&auto=format&fit=crop")' }}
                />
                <div className="container mx-auto px-4 relative z-20 text-center">
                    <span className="text-[#0F5E36] font-bold tracking-widest uppercase mb-4 block bg-white/10 backdrop-blur inline-block px-4 py-1 rounded-full">Who We Are</span>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                        About Elia Relief Trust
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto text-gray-200 leading-relaxed font-light">
                        Restoring Dignity. Building Hope. Transforming Lives.
                    </p>
                </div>
            </div>

            {/* PAGE 1: About Elia Relief Trust */}
            <section className="py-24 container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="prose prose-lg text-gray-700 leading-relaxed"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Elia Relief Trust</h2>
                        <p className="text-lg">
                            Elia Relief Trust is a UK-based charity dedicated to relieving poverty and supporting vulnerable communities, with a strong focus on the <strong>Horn of Africa</strong> — including <strong>Somalia, Ethiopia, and Kenya</strong>.
                        </p>
                        <p>
                            We work to provide food, clean water, education, and essential support to families facing hardship, while also investing in long-term projects that help communities become more self-sufficient and resilient.
                        </p>

                        <div className="my-8 space-y-4">
                            <h3 className="text-xl font-bold text-[#0F5E36]">Our work supports:</h3>
                            <ul className="space-y-3 list-none pl-0">
                                <li className="flex items-center gap-3">
                                    <Baby size={20} className="text-[#0F5E36]" /> Children and young people
                                </li>
                                <li className="flex items-center gap-3">
                                    <Users size={20} className="text-[#0F5E36]" /> Elderly and vulnerable individuals
                                </li>
                                <li className="flex items-center gap-3">
                                    <Heart size={20} className="text-[#0F5E36]" /> Families and communities affected by poverty
                                </li>
                            </ul>
                        </div>

                        <div className="mb-8 space-y-4">
                            <h3 className="text-xl font-bold text-[#0F5E36]">We help by:</h3>
                            <ul className="space-y-3 list-none pl-0">
                                <li className="flex items-center gap-3">
                                    <ShieldCheck size={20} className="text-[#0F5E36]" /> Providing direct aid and services
                                </li>
                                <li className="flex items-center gap-3">
                                    <Globe size={20} className="text-[#0F5E36]" /> Supporting local organisations and communities
                                </li>
                                <li className="flex items-center gap-3">
                                    <Target size={20} className="text-[#0F5E36]" /> Delivering projects that create lasting impact
                                </li>
                            </ul>
                        </div>

                        <p className="italic text-gray-600 border-l-4 border-[#0F5E36] pl-4">
                            While our projects are focused in the Horn of Africa, we also carry out fundraising, outreach, and community work throughout England.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1541976844346-a6a8d5b91980?q=80&w=2070&auto=format&fit=crop"
                                alt="Elia Relief Trust work"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-xl shadow-xl max-w-sm hidden md:block">
                            <p className="text-lg font-medium text-gray-800">
                                "What began as a small effort among friends has grown into a registered charity built on sincerity, transparency, and trust."
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* PAGE 2: Vision & Mission */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#0F5E36] font-bold uppercase tracking-widest">Our Purpose</span>
                        <h2 className="text-4xl font-bold text-gray-900 mt-2">Vision & Mission</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Vision */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full"
                        >
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                                <Globe size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                            <p className="text-gray-600 leading-relaxed text-lg flex-grow">
                                A future where communities in the Horn of Africa are free from extreme poverty, have access to clean water, education, and places of worship, and are empowered to build self-sufficient and dignified lives.
                            </p>
                        </motion.div>

                        {/* Mission */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full"
                        >
                            <div className="w-16 h-16 bg-green-50 text-[#0F5E36] rounded-full flex items-center justify-center mb-6">
                                <Target size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                            <p className="text-gray-600 mb-6">
                                To relieve poverty and improve the lives of people in Somalia, Ethiopia, and Kenya by:
                            </p>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start gap-3"><ArrowRight size={18} className="mt-1 text-[#0F5E36] shrink-0" /> Providing food and emergency relief</li>
                                <li className="flex items-start gap-3"><ArrowRight size={18} className="mt-1 text-[#0F5E36] shrink-0" /> Delivering clean and sustainable water solutions</li>
                                <li className="flex items-start gap-3"><ArrowRight size={18} className="mt-1 text-[#0F5E36] shrink-0" /> Supporting education through madrasahs and schools</li>
                                <li className="flex items-start gap-3"><ArrowRight size={18} className="mt-1 text-[#0F5E36] shrink-0" /> Building masjids and community spaces</li>
                                <li className="flex items-start gap-3"><ArrowRight size={18} className="mt-1 text-[#0F5E36] shrink-0" /> Sponsoring orphans and vulnerable children</li>
                            </ul>
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <p className="font-bold text-[#0F5E36] text-lg text-center">We aim not only to provide immediate aid, but also to create lasting change.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* PAGE 4: Where We Work */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[#0F5E36] font-bold uppercase tracking-widest">Our Reach</span>
                            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-6">Where We Work – The Horn of Africa</h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                The Horn of Africa faces unique challenges including drought, food insecurity, displacement, and limited access to education and healthcare.
                            </p>

                            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Primary Focus Countries:</h3>
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
                                    <span className="font-bold text-gray-900 block">Somalia</span>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
                                    <span className="font-bold text-gray-900 block">Ethiopia</span>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
                                    <span className="font-bold text-gray-900 block">Kenya</span>
                                </div>
                            </div>

                            <div className="bg-[#0F5E36] text-white p-8 rounded-2xl">
                                <h4 className="font-bold text-lg mb-4">Why focus here?</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2">✔ Build strong local partnerships</li>
                                    <li className="flex items-center gap-2">✔ Respond quickly to urgent needs</li>
                                    <li className="flex items-center gap-2">✔ Deliver aid efficiently</li>
                                    <li className="flex items-center gap-2">✔ Create sustainable, community-led solutions</li>
                                </ul>
                            </div>
                        </div>
                        <div className="relative h-[500px] bg-slate-100 rounded-3xl overflow-hidden">
                            {/* Placeholder generic map or image */}
                            <Image
                                src="https://images.unsplash.com/photo-1523705480679-b7d05321d51e?q=80&w=2030&auto=format&fit=crop"
                                alt="Map of Horn of Africa region"
                                fill
                                className="object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-8">
                                <p className="text-white font-medium text-lg">Focusing our efforts where the need is greatest.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PAGE 6: Our Story */}
            <section className="py-24 bg-gradient-to-b from-[#0F5E36]/5 to-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900">Our Story – How It All Began</h2>
                    </div>

                    <div className="bg-white p-8 md:p-14 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-[#0F5E36]" />

                        <div className="text-center mb-10">
                            <p className="text-3xl text-[#0F5E36] font-arabic mb-4">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
                            <h3 className="text-2xl font-bold text-gray-800">Alhamdulillah… our journey began quietly.</h3>
                        </div>

                        <div className="space-y-6 text-lg text-gray-700 leading-relaxed font-light">
                            <p>
                                Four years ago, it started with nothing more than an Instagram page and a sincere intention — to help our brothers and sisters across the Horn of Africa.
                            </p>
                            <p>
                                In our very first Ramadan, we supported just <strong>10–20 families</strong>, reaching out through WhatsApp messages and doing whatever we could with what little we had.
                            </p>
                            <div className="flex items-center gap-4 py-2">
                                <div className="h-px bg-gray-200 flex-grow" />
                                <span className="text-[#0F5E36] font-bold">Growth</span>
                                <div className="h-px bg-gray-200 flex-grow" />
                            </div>
                            <p>
                                The following year, Allah allowed us to grow to <strong>50 families</strong>.
                            </p>
                            <p>
                                Then came <strong>Iftaar As-Saami</strong> — feeding the fasting person.
                            </p>
                            <p>
                                Last year, with your support, we fed <strong>200 families</strong>, each household supporting <strong>5–7 people</strong>.
                                <br />
                                <span className="italic">Imagine the reward of every fast you helped break. SubhanAllah.</span>
                            </p>

                            <div className="bg-[#0F5E36]/5 p-6 rounded-xl border border-[#0F5E36]/10 my-8">
                                <p className="font-bold text-gray-900 text-xl mb-2">And today… Allah has opened a new door.</p>
                                <p>By His mercy, we are now an <strong>officially registered UK charity</strong>.</p>
                                <p className="text-sm mt-2 text-gray-600">What began as a small effort has become something real — built on sincerity, growth, and trust.</p>
                            </div>

                            <p>Now we enter a new chapter:</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#0F5E36] rounded-full" /><span className="text-sm">Expanding Iftaar As-Saami</span></div>
                                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#0F5E36] rounded-full" /><span className="text-sm">Building masjids</span></div>
                                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#0F5E36] rounded-full" /><span className="text-sm">Supporting madrasahs</span></div>
                                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#0F5E36] rounded-full" /><span className="text-sm">Creating water wells</span></div>
                                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#0F5E36] rounded-full" /><span className="text-sm">Helping build homes</span></div>
                                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#0F5E36] rounded-full" /><span className="text-sm">Supporting orphans</span></div>
                            </div>

                            <p className="mt-8 font-medium">
                                From friends raising funds among themselves… to a charity committed to long-term impact.
                            </p>
                            <p className="font-medium text-[#0F5E36]">
                                The journey continues — and it only gets better from here, in shā’ Allāh.
                            </p>
                            <p className="text-sm text-gray-500 italic mt-4 border-t pt-4">
                                May Allah place endless barakah in this charity and reward everyone who has stood with us from the beginning. Ameen.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PAGE 5: Charitable Objects */}
            <section className="py-20 bg-slate-900 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">Our Charitable Objects</h2>
                    <blockquote className="text-2xl md:text-3xl font-serif max-w-4xl mx-auto leading-relaxed opacity-90">
                        &ldquo;Relieve poverty and improve the lives of people in need in Somalia, Ethiopia, and Kenya by providing food, clean water, clothing, access to basic healthcare, and support for education, as well as helping communities become more self-sufficient through small development projects.&rdquo;
                    </blockquote>
                    <p className="mt-8 text-gray-400">Elia Relief Trust • Officially Registered UK Charity</p>
                </div>
            </section>
        </div>
    );
}
