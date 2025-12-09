"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe";
import PaymentForm from "@/components/PaymentForm";
import { CAUSES } from "@/data/mockData";
import { Button } from "@/components/ui/button";

const stripePromise = getStripe();

export default function DonatePage() {
    const { id } = useParams();
    const cause = CAUSES.find((c) => c.id === id);

    const [clientSecret, setClientSecret] = useState("");
    const [amount, setAmount] = useState(10); // Default $10

    const PRESET_AMOUNTS = [10, 20, 50, 100, 200];

    useEffect(() => {
        if (amount > 0) {
            // Create PaymentIntent
            fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount }),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret));
        }
    }, [amount]);

    if (!cause) return <div className="text-center py-20">Cause not found</div>;

    const appearance = {
        theme: 'stripe' as const,
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: Cause Details */}
                <div>
                    <div className="rounded-xl overflow-hidden mb-6 shadow-md">
                        <img src={cause.image} alt={cause.title} className="w-full h-80 object-cover" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">{cause.title}</h1>
                    <p className="text-gray-600 text-lg leading-relaxed">{cause.description}</p>

                    <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                        <h3 className="font-semibold text-blue-900 mb-2">Your Impact</h3>
                        <p className="text-blue-800">
                            Your donation helps us reach our goal of ${cause.goal.toLocaleString()}.
                            Every dollar counts towards making a real difference.
                        </p>
                    </div>
                </div>

                {/* Right: Payment */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 h-fit sticky top-24">
                    <h2 className="text-2xl font-bold mb-6">Make a Donation</h2>

                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Amount</label>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {PRESET_AMOUNTS.map((val) => (
                                <button
                                    key={val}
                                    onClick={() => setAmount(val)}
                                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${amount === val
                                            ? "bg-blue-600 text-white border-blue-600 ring-2 ring-blue-200"
                                            : "bg-white text-gray-700 border-gray-200 hover:border-blue-400"
                                        }`}
                                >
                                    ${val}
                                </button>
                            ))}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Or Enter Custom Amount</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="number"
                                    min="1"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="block w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {clientSecret ? (
                        <Elements options={options} stripe={stripePromise}>
                            <PaymentForm amount={amount} />
                        </Elements>
                    ) : (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    )}

                    <p className="text-xs text-center text-gray-400 mt-4">
                        Secure payments powered by Stripe. Apple Pay and Google Pay included.
                    </p>
                </div>
            </div>
        </div>
    );
}
