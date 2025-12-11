"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, Heart, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { SearchModal } from "@/components/SearchModal";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Navbar() {
    const { user } = useAuth();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isAppealsOpen, setIsAppealsOpen] = useState(false);
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const { items } = useCart();

    // Fetch campaigns for dropdown
    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const q = query(collection(db, "campaigns"), limit(6));
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    title: doc.data().title,
                }));
                setCampaigns(data);
            } catch (error) {
                console.error("Error fetching campaigns:", error);
            }
        };
        fetchCampaigns();
    }, []);

    // Safety check for cart items length to avoid hydration mismatch if needed, 
    // but simplified here. Using 0 as default if undefined.
    const cartCount = items?.length || 0;

    return (
        <>
            <nav className="border-b sticky top-0 bg-white z-50 shadow-sm">
                <div className="container mx-auto px-4 h-24 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative w-12 h-16">
                            <Image
                                src="/assets/elia-logo.jpg"
                                alt="Elia Relief Trust"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-extrabold text-[#0F5E36] tracking-tight leading-none">
                                ELIA
                            </span>
                            <span className="text-sm font-bold text-gray-900 tracking-wider">
                                RELIEF TRUST
                            </span>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {/* Appeals Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsAppealsOpen(true)}
                            onMouseLeave={() => setIsAppealsOpen(false)}
                        >
                            <button className="flex items-center gap-1 text-base font-medium text-gray-700 hover:text-[#0F5E36] transition-colors">
                                Appeals
                                <ChevronDown size={16} className={`transition-transform ${isAppealsOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isAppealsOpen && (
                                <div className="absolute top-full left-0 pt-2 min-w-[220px]">
                                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden">
                                        <Link
                                            href="/appeals"
                                            className="block px-4 py-2.5 text-sm font-bold text-[#0F5E36] hover:bg-green-50 transition-colors border-b border-gray-100"
                                        >
                                            View All Appeals
                                        </Link>
                                        {campaigns.map((campaign) => (
                                            <Link
                                                key={campaign.id}
                                                href={`/appeals/${campaign.id}`}
                                                className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-[#0F5E36] transition-colors truncate"
                                            >
                                                {campaign.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link href="/projects" className="text-gray-600 hover:text-[#0F5E36] font-medium transition-colors">
                            Projects
                        </Link>
                        <Link href="/zakat" className="text-gray-600 hover:text-[#0F5E36] font-medium transition-colors">
                            Zakat
                        </Link>
                        <Link href="/about" className="text-gray-600 hover:text-[#0F5E36] font-medium transition-colors">
                            About Us
                        </Link>
                        <Link href="/contact" className="text-base font-medium text-gray-700 hover:text-[#0F5E36] transition-colors">
                            Contact
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Search Icon */}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 text-gray-600 hover:text-[#0F5E36] transition-colors"
                        >
                            <Search size={24} />
                        </button>

                        {/* Cart Icon */}
                        <Link href="/donate" className="p-2 text-gray-600 hover:text-[#0F5E36] transition-colors relative">
                            <Heart size={24} />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-[#0F5E36] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <div className="h-6 w-px bg-gray-200 mx-1"></div>

                        {user ? (
                            <Link href="/dashboard" className="text-sm font-bold text-gray-600 hover:text-[#0F5E36] hidden sm:block">
                                Dashboard
                            </Link>
                        ) : (
                            <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-gray-900 hidden sm:block">
                                Login
                            </Link>
                        )}
                        <Link href="/donate" className="bg-[#0F5E36] text-white px-3 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-base font-bold hover:bg-[#0b4628] transition-all shadow-md hover:shadow-lg flex items-center gap-1 sm:gap-2">
                            <span className="hidden sm:inline">Donate Now</span>
                            <span className="sm:hidden">Donate</span>
                            <Heart size={14} className="sm:w-4 sm:h-4" fill="currentColor" />
                        </Link>
                    </div>
                </div>
            </nav>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
