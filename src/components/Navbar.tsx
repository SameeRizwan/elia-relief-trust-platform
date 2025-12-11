"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";
import { SearchModal } from "@/components/SearchModal";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const { user } = useAuth();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { items } = useCart();

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
                        <Link href="/appeals" className="text-base font-medium text-gray-700 hover:text-[#0F5E36] transition-colors">
                            Appeals
                        </Link>
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
                        <Link href="/donate" className="bg-[#0F5E36] text-white px-6 py-3 rounded-full text-base font-bold hover:bg-[#0b4628] transition-all shadow-md hover:shadow-lg flex items-center gap-2">
                            Donate Now
                            <Heart size={16} fill="currentColor" />
                        </Link>
                    </div>
                </div>
            </nav>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
