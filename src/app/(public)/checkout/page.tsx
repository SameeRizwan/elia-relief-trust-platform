"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { Loader2 } from "lucide-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
    const { items, totalAmount, isLoaded } = useCart();
    const { user, loading } = useAuth();
    const router = useRouter();
    const [clientSecret, setClientSecret] = useState("");

    // Redirect if empty cart (only after loaded)
    useEffect(() => {
        if (isLoaded && items.length === 0) {
            router.push("/donate");
        }
    }, [items, isLoaded, router]);

    // Create PaymentIntent calling the API
    useEffect(() => {
        if (isLoaded && items.length > 0) {
            fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: totalAmount,
                    currency: "gbp", // Using GBP for Elia Relief Trust context
                    metadata: {
                        userId: user?.uid || "guest",
                        email: user?.email || "guest@example.com",
                        itemCount: items.length
                    }
                }),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret));
        }
    }, [items, totalAmount, user]);

    if (!isLoaded || items.length === 0) {
        return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#0F5E36]" size={40} /></div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-[#0F5E36] mb-8 text-center">Secure Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Order Summary */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                            <div className="space-y-4 mb-6">
                                {items.map((item, idx) => (
                                    <div key={`${item.id}-${idx}`} className="flex justify-between items-start border-b border-gray-50 pb-4 last:border-0">
                                        <div>
                                            <p className="font-bold text-gray-800">{item.title}</p>
                                            <p className="text-sm text-gray-500 capitalize">{item.type} Donation</p>
                                        </div>
                                        <p className="font-bold text-[#0F5E36]">£{item.amount}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <span className="font-bold text-lg text-gray-900">Total</span>
                                <span className="font-extrabold text-2xl text-[#0F5E36]">£{totalAmount.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* User Info (Pre-filled) */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Details</h2>
                            {loading ? (
                                <p>Loading user info...</p>
                            ) : user ? (
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500">Logged in as:</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-[#0F5E36] text-white flex items-center justify-center font-bold">
                                            {user.email?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{user.email}</p>
                                            <p className="text-xs text-[#0F5E36]">Donation will be linked to your account</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-600 text-sm">
                                    You are checking out as a <strong>Guest</strong>.
                                    <button onClick={() => router.push('/login?redirect=/checkout')} className="text-[#0F5E36] font-bold mx-1 hover:underline">Log in</button>
                                    to track your donation history.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Details</h2>
                        {clientSecret ? (
                            <Elements options={{ clientSecret, appearance: { theme: 'stripe' } }} stripe={stripePromise}>
                                <CheckoutForm clientSecret={clientSecret} />
                            </Elements>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                                <Loader2 className="animate-spin mb-2" size={32} />
                                <p>Initializing secure payment...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
