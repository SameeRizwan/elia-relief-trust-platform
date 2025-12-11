"use client";

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

    const handleCheckout = async () => {
        setLoading(true);
        try {
            // Create a donation record for each item (or one grouped record? User likely wants line items)
            // For simplicity in dashboards, let's create one 'Donation' transaction that contains items.
            // Or create individual donation records per appeal? 
            // Usually a Payment Intent covers multiple. 
            // Admin dash looks for 'Donations'. Let's structure it as one document per transaction.

            await addDoc(collection(db, "donations"), {
                amount: totalAmount,
                items: items,
                donorName: "Guest Donor", // Replace with auth user if available later
                donorEmail: "guest@example.com",
                status: "Succeeded",
                createdAt: serverTimestamp(),
                date: new Date().toISOString() // Fallback for UI that needs string
            });

            // Send Confirmation Email (Mock)
            const appealTitle = items.length > 0 ? items[0].title + (items.length > 1 ? ` + ${items.length - 1} more` : "") : "Donation";
            await sendDonationEmail("guest@example.com", totalAmount, appealTitle);

            clearCart();
            alert("Donation successful! Confirmation email sent.");
            setIsOpen(false);
        } catch (error) {
            console.error("Checkout failed", error);
            alert("Checkout failed. Please try again.");
        } finally {
            setLoading(false);
        }
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
                <div className="container mx-auto mt-4 pt-4 border-t border-gray-100 flex justify-end gap-3 opacity-70 grayscale hover:grayscale-0 transition-all">
                    <button className="h-10 px-6 bg-black text-white rounded-md flex items-center gap-2 font-medium text-sm hover:bg-gray-900">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 66.2 23.9 149.4 68.5 212.7 20 28.3 43.8 54.9 69 54.9 26.3 0 37.3-17.5 69.5-17.5 31.7 0 42 18 70.8 17.5 27 0 52-25.9 70.4-53.2-4.6-2.5-27-14.8-29.5-219.2zm-76.4-191c13.4-16 22-38.1 19.3-60.7-19.4 1.2-42.6 12.8-56.7 29.3-11.8 13.9-22 36.1-19.3 58.7 21.8 1.9 44.2-11.6 56.7-27.3z" /></svg>
                        Pay
                    </button>
                    <button className="h-10 px-6 bg-white border border-gray-200 text-gray-600 rounded-md flex items-center gap-2 font-medium text-sm hover:bg-gray-50">
                        <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                        Google Pay
                    </button>
                </div>
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
