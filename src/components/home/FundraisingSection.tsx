"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link"; // Import Link
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { useEffect, useState } from "react";

export function FundraisingSection() {
    const { addToCart } = useCart();
    const router = useRouter();
    const [featured, setFeatured] = useState<any>(null);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                // Try to find an Urgent campaign first
                const q = query(collection(db, "campaigns"), where("isUrgent", "==", true), limit(1));
                const snapshot = await getDocs(q);

                if (!snapshot.empty) {
                    const doc = snapshot.docs[0];
                    setFeatured({ id: doc.id, ...doc.data() });
                } else {
                    // Fallback to any campaign
                    const fallbackQ = query(collection(db, "campaigns"), limit(1));
                    const fallbackSnap = await getDocs(fallbackQ);
                    if (!fallbackSnap.empty) {
                        const doc = fallbackSnap.docs[0];
                        setFeatured({ id: doc.id, ...doc.data() });
                    }
                }
            } catch (error) {
                console.error("Error fetching featured campaign:", error);
            }
        };
        fetchFeatured();
    }, []);

    const handleDonate = () => {
        if (!featured) return;
        addToCart({
            id: featured.id,
            title: featured.title,
            amount: 50,
            type: 'single'
        });
        router.push('/donate'); // Or open cart?
    }

    if (!featured) return null; // Or loading skeleton

    // Calculate percentage for progress bar
    const percentage = Math.min(((featured.raisedAmount || 0) / (featured.goalAmount || 1)) * 100, 100);

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
                            View All Appeals
                        </Button>
                    </Link>
                </div>

                {/* Featured Campaign Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
                    {/* Image Side */}
                    <div className="lg:w-1/2 relative min-h-[400px]">
                        <img
                            src={featured.imageUrl || "https://images.unsplash.com/photo-1606092195730-5d7b9af1ef4d?q=80&w=2670&auto=format&fit=crop"}
                            alt={featured.title}
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

                        <h3 className="text-3xl font-bold text-gray-900 mb-4">{featured.title}</h3>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed line-clamp-3">
                            {featured.description}
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
                                <span className="text-3xl font-extrabold text-[#0F5E36]">£{featured.raisedAmount?.toLocaleString()}</span>
                                <span className="text-gray-400 font-medium">/ £{featured.goalAmount?.toLocaleString()}</span>
                                <span className="text-gray-900 font-bold ml-auto"><span className="text-black text-xl">12</span> Donors</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                <div className="bg-[#0F5E36] h-full rounded-full" style={{ width: `${percentage}%` }} />
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
