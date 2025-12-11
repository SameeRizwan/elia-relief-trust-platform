"use client";

import { useRouter } from "next/navigation"; // Add import

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trash2, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { db } from "@/lib/firebase"; // Add import
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Add import
import { Loader2 } from "lucide-react"; // Add import
import { sendDonationEmail } from "@/lib/email"; // Add import

export function CartSummary() {
    const { items, totalAmount, removeFromCart, clearCart } = useCart(); // Destructure clearCart
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter(); // Add useRouter hook if not already imported (Need to adding import too)

    const handleCheckout = () => {
        setIsOpen(false);
        router.push("/checkout");
    };

    if (items.length === 0) return null;

    return (
        <>
            {/* Sticky Bottom Bar */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-50 p-4 pb-6"
            >
                <div className="container mx-auto flex items-center justify-between gap-4">

                    {/* Toggle Details (Mobile mainly) */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 text-gray-700 hover:text-[#0F5E36]"
                    >
                        <div className="relative">
                            <Heart size={24} />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                {items.length}
                            </span>
                        </div>
                        <span className="font-bold text-lg hidden sm:inline">Current Donation</span>
                    </button>

                    {/* Total & Checkout */}
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase font-bold">Total Amount</p>
                            <p className="text-2xl font-extrabold text-[#0F5E36]">£{totalAmount.toLocaleString()}</p>
                        </div>
                        <Button
                            onClick={handleCheckout}
                            disabled={loading}
                            className="bg-[#0F5E36] hover:bg-[#0b4628] h-12 px-8 text-lg font-bold shadow-lg shadow-green-900/20"
                        >
                            {loading ? <Loader2 className="animate-spin mr-2" /> : "Checkout"}
                            {!loading && <ArrowRight className="ml-2" size={20} />}
                        </Button>
                    </div>
                </div>
                {/* Payment Methods */}

            </motion.div>

            {/* Expanded List Modal (Simple Overlay for now) */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 z-40"
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            className="fixed bottom-[88px] left-0 right-0 bg-white z-40 rounded-t-2xl shadow-xl max-h-[60vh] overflow-y-auto"
                        >
                            <div className="container mx-auto p-6">
                                <h3 className="text-xl font-bold mb-4 text-black">Your Donation Cart</h3>
                                <div className="space-y-4">
                                    {items.map((item, idx) => (
                                        <div key={`${item.id}-${idx}`} className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-0">
                                            <div>
                                                <p className="font-bold text-gray-900">{item.title}</p>
                                                <p className="text-sm text-gray-500 capitalize">{item.type} Donation</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="font-bold text-[#0F5E36]">£{item.amount}</span>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
