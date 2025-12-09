"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link"; // Import Link
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export function FundraisingSection() {
    const { addToCart } = useCart();
    const router = useRouter();

    const handleDonate = () => {
        addToCart({
            id: 'pakistan-flood',
            title: 'Pakistan Emergency Flood',
            amount: 50, // Default amount for quick action
            type: 'single'
        });
        router.push('/donate');
    }

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <p className="text-[#0F5E36] font-bold uppercase tracking-widest text-sm mb-2">Fundraising</p>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                            Start Fundraising with <br />
                            <span className="text-[#0F5E36]">Elia Relief Trust</span>
                        </h2>
                    </div>
                    <Link href="/appeals">
                        <Button variant="outline" className="border-[#0F5E36] text-[#0F5E36] hover:bg-green-50 font-bold px-8 py-6 rounded-lg">
                            See our campaigns
                        </Button>
                    </Link>
                </div>

                {/* Featured Campaign Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
                    {/* Image Side */}
                    <div className="lg:w-1/2 relative min-h-[400px]">
                        <img
                            src="https://images.unsplash.com/photo-1606092195730-5d7b9af1ef4d?q=80&w=2670&auto=format&fit=crop"
                            alt="Pakistan Flood"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full text-gray-800 shadow-lg backdrop-blur-sm transition-all hidden lg:block">
                            <ChevronLeft size={24} />
                        </button>
                    </div>

                    {/* Content Side */}
                    <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center relative">
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-50 hover:bg-gray-100 p-3 rounded-full text-gray-800 border border-gray-200 shadow-sm transition-all hidden lg:block">
                            <ChevronRight size={24} />
                        </button>

                        <h3 className="text-3xl font-bold text-gray-900 mb-4">Pakistan Emergency Flood</h3>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            Over 500 dead, 740 injured, and 1,700 families homeless in 24 hours. Heavy rain, landslides and flash floods have caused Pakistan's deadliest downpour...
                        </p>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                                <img src="/assets/elia-logo.jpg" alt="Elia" className="w-full h-full object-contain bg-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Started by</p>
                                <p className="font-bold text-[#0F5E36]">Elia Relief Trust</p>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="space-y-2 mb-8">
                            <div className="flex justify-between items-end">
                                <span className="text-3xl font-extrabold text-[#0F5E36]">£2,217.00</span>
                                <span className="text-gray-400 font-medium">/ £50,000.00</span>
                                <span className="text-gray-900 font-bold ml-auto"><span className="text-black text-xl">39</span> Donors</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                <div className="bg-[#0F5E36] h-full rounded-full w-[4.4%]" />
                            </div>
                        </div>

                        {/* Feedback / Action */}
                        <div className="flex items-center gap-4">
                            <Button onClick={handleDonate} className="flex-1 bg-[#0F5E36] hover:bg-[#0b4628] text-white font-bold h-14 rounded-xl text-lg shadow-lg shadow-green-900/10">
                                Donate Now <ArrowRight className="ml-2" />
                            </Button>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
