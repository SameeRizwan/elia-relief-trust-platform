"use client";

import { Droplets, Moon, Home, GraduationCap, ArrowRight, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
    return (
        <div className="bg-white">
            {/* Hero */}
            <div className="bg-[#0F5E36] py-24 text-center text-white">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-extrabold mb-6">Our Main Projects</h1>
                    <p className="text-xl max-w-2xl mx-auto opacity-90">
                        Targeted interventions to relieve poverty and build resilience.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-24 space-y-24">

                {/* Iftaar As-Saami */}
                <ProjectSection
                    icon={Moon}
                    title="Iftaar As-Saami (Feeding the Fasting)"
                    tags={["Seasonal", "Food Security"]}
                    image="https://images.unsplash.com/photo-1596627689975-d602325492d9?q=80&w=2070&auto=format&fit=crop"
                    description={
                        <>
                            <p className="mb-4">
                                One of our core and most beloved projects is <strong>Iftaar As-Saami</strong> — providing food to fasting families during the blessed month of Ramadan.
                            </p>
                            <p className="mb-4">
                                This project focuses on feeding families in some of the most impoverished regions of the Horn of Africa, where many struggle to secure even a single meal a day.
                            </p>
                            <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 my-6">
                                <h4 className="font-bold text-amber-900 mb-2">Through Iftaar As-Saami, your support helps:</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-amber-800"><ArrowRight size={16} /> Feed fasting families</li>
                                    <li className="flex items-center gap-2 text-amber-800"><ArrowRight size={16} /> Bring relief and dignity</li>
                                    <li className="flex items-center gap-2 text-amber-800"><ArrowRight size={16} /> Multiply reward during Ramadan</li>
                                </ul>
                            </div>
                        </>
                    }
                    reverse={false}
                    ctaLink="/appeals"
                    ctaText="Support Iftaar"
                />

                {/* Water Wells */}
                <ProjectSection
                    icon={Droplets}
                    title="Water Wells & Clean Water Projects"
                    tags={["WASH", "Sustainability"]}
                    image="https://images.unsplash.com/photo-1541976844346-a6a8d5b91980?q=80&w=2070&auto=format&fit=crop"
                    description={
                        <>
                            <p className="mb-4">
                                Access to clean water is a basic human right — yet millions still live without it.
                            </p>
                            <p className="mb-4">
                                We build <strong>water wells and sustainable water solutions</strong> to:
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                                <li className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg text-blue-900 font-medium">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full" /> Reduce illness
                                </li>
                                <li className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg text-blue-900 font-medium">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full" /> Save time spent walking for water
                                </li>
                                <li className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg text-blue-900 font-medium">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full" /> Support farming and livelihoods
                                </li>
                                <li className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg text-blue-900 font-medium">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full" /> Improve overall community health
                                </li>
                            </ul>
                            <p className="font-medium text-[#0F5E36]">Each water project benefits entire villages for years to come.</p>
                        </>
                    }
                    reverse={true}
                    ctaLink="/appeals"
                    ctaText="Build a Well"
                />

                {/* Building Masjids */}
                <ProjectSection
                    icon={Home}
                    title="Building Masjids & Madrasahs"
                    tags={["Infrastructure", "Community"]}
                    image="https://images.unsplash.com/photo-1564121211835-e88c852648ab?q=80&w=2070&auto=format&fit=crop"
                    description={
                        <>
                            <p className="mb-4">
                                Masjids and madrasahs are the heart of any community.
                            </p>
                            <div className="border-l-4 border-[#0F5E36] pl-6 my-6">
                                <p className="mb-2">We support the construction and development of:</p>
                                <ul className="space-y-2 font-medium text-gray-800">
                                    <li>• Masjids for prayer, unity, and learning</li>
                                    <li>• Madrasahs for Islamic and basic education</li>
                                </ul>
                            </div>
                            <p>
                                These projects nurture faith, education, and long-term community stability.
                            </p>
                        </>
                    }
                    reverse={false}
                    ctaLink="/appeals"
                    ctaText="Support Construction"
                />

                {/* Orphan Sponsorship */}
                <ProjectSection
                    icon={GraduationCap}
                    title="Orphan Sponsorship & Education Support"
                    tags={["Child Welfare", "Education"]}
                    image="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2940&auto=format&fit=crop"
                    description={
                        <>
                            <p className="mb-4">
                                Orphans are among the most vulnerable in society.
                            </p>
                            <p className="mb-4">
                                Through our sponsorship programmes, we aim to:
                            </p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center gap-3">
                                    <HeartHandshake size={20} className="text-[#0F5E36]" /> Support orphans with food, clothing, and education
                                </li>
                                <li className="flex items-center gap-3">
                                    <HeartHandshake size={20} className="text-[#0F5E36]" /> Provide stability and care
                                </li>
                                <li className="flex items-center gap-3">
                                    <HeartHandshake size={20} className="text-[#0F5E36]" /> Help children grow with dignity and hope
                                </li>
                            </ul>
                            <p className="font-bold text-gray-900">
                                Education remains a key focus in breaking the cycle of poverty.
                            </p>
                        </>
                    }
                    reverse={true}
                    ctaLink="/appeals"
                    ctaText="Sponsor an Orphan"
                />

            </div>

            {/* CTA */}
            <div className="bg-gray-50 py-20 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">Ready to make a massive impact?</h2>
                    <div className="flex justify-center gap-4">
                        <Link href="/donate">
                            <Button size="lg" className="bg-[#0F5E36] hover:bg-[#0a4428] text-white rounded-full px-12 py-6 text-xl shadow-xl">
                                Donate Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProjectSection({ icon: Icon, title, description, reverse, ctaLink, ctaText, tags, image }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
        >
            <div className="flex-1 space-y-6">
                <div className="flex gap-2 mb-4">
                    {tags.map((tag: string) => (
                        <span key={tag} className="text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-[#0F5E36] rounded-xl flex items-center justify-center text-white shrink-0">
                        <Icon size={24} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                </div>
                <div className="text-lg text-gray-600 leading-relaxed">
                    {description}
                </div>
                <div className="pt-4">
                    <Link href={ctaLink}>
                        <Button variant="outline" className="border-2 border-[#0F5E36] text-[#0F5E36] hover:bg-[#0F5E36] hover:text-white rounded-full">
                            {ctaText}
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="flex-1 w-full relative h-[400px] rounded-3xl overflow-hidden shadow-lg group">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>
        </motion.div>
    )
}
