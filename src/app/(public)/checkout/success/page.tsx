"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "@/context/CartContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from "firebase/firestore";
import { sendDonationEmail } from "@/lib/email";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string).catch((err) => {
    console.warn("Failed to load Stripe.js (likely network issue):", err);
    return null;
});

export default function CheckoutSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { items, totalAmount, clearCart } = useCart();
    const [status, setStatus] = useState("loading"); // loading, success, fail
    const [emailSent, setEmailSent] = useState(false);

    useEffect(() => {
        const clientSecret = searchParams.get("payment_intent_client_secret");
        if (!clientSecret) {
            setStatus("fail");
            return;
        }

        stripePromise.then((stripe) => {
            if (!stripe) return;
            stripe.retrievePaymentIntent(clientSecret).then(async ({ paymentIntent }) => {
                if (paymentIntent && paymentIntent.status === "succeeded") {

                    // Retrieve Donor Info from localStorage (not ideal but works for MVP without auth)
                    const donorInfoStr = localStorage.getItem("donorInfo");
                    const donorInfo = donorInfoStr ? JSON.parse(donorInfoStr) : null;

                    // Prevent duplicate writes if user refreshes (checking if cart is already empty might be a clue, or status check)
                    // For now, simple check: if cart is empty, maybe we already processed? 
                    // But clearCart happens at the end. 

                    if (status !== "success") {
                        setStatus("success");

                        // 1. Save to Firestore
                        if (items.length > 0) {
                            try {
                                const donationType = searchParams.get("donation_type") || "one-time";

                                await addDoc(collection(db, "donations"), {
                                    amount: totalAmount, // Or paymentIntent.amount / 100
                                    items: items,
                                    donorName: donorInfo ? `${donorInfo.firstName} ${donorInfo.lastName}` : "Guest Donor",
                                    donorEmail: donorInfo ? donorInfo.email : "guest@example.com",
                                    donorDetails: donorInfo,
                                    comment: (paymentIntent as any).metadata?.comment || "", // Save comment
                                    status: "Succeeded",
                                    paymentIntentId: paymentIntent.id,
                                    frequency: donationType,
                                    createdAt: serverTimestamp(),
                                    date: new Date().toISOString()
                                });

                                if (donationType === 'monthly') {
                                    await addDoc(collection(db, "subscriptions"), {
                                        amount: totalAmount,
                                        planName: items.length > 0 ? items[0].title : "Monthly Donation",
                                        email: donorInfo ? donorInfo.email : "guest@example.com",
                                        status: "Active",
                                        startDate: new Date().toISOString(),
                                        paymentIntentId: paymentIntent.id,
                                        createdAt: serverTimestamp()
                                    });
                                }

                                // Update Campaign Progress
                                for (const item of items) {
                                    if (item.id) {
                                        const campaignRef = doc(db, "campaigns", item.id);
                                        // Use updateDoc to atomically increment
                                        // We use unknown cast for increment because typescript sometimes complains about field value compatibility in simplified definitions
                                        await updateDoc(campaignRef, {
                                            raisedAmount: increment(item.amount),
                                            donorCount: increment(1)
                                        });
                                    }
                                }

                                // 2. Send Email
                                const appealTitle = items.length > 0 ? items[0].title + (items.length > 1 ? ` + ${items.length - 1} more` : "") : "Donation";
                                await sendDonationEmail(donorInfo ? donorInfo.email : "guest@example.com", totalAmount, appealTitle);
                                setEmailSent(true);

                                // 3. Clear Cart
                                clearCart();
                                localStorage.removeItem("donorInfo");

                            } catch (e) {
                                console.error("Error recording donation:", e);
                            }
                        }
                    }
                } else {
                    setStatus("fail");
                }
            });
        });
    }, [searchParams, items, totalAmount, clearCart, status]); // removed extraneous dependencies

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-[#0F5E36]" size={48} />
                <p className="ml-4 text-gray-600">Verifying donation...</p>
            </div>
        );
    }

    if (status === "fail") {
        return (
            <div className="container mx-auto py-24 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Failed or Cancelled</h1>
                <p className="mb-8">We could not process your donation.</p>
                <Link href="/checkout">
                    <Button>Try Again</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-[#0F5E36] w-10 h-10" />
                </div>

                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Thank You!</h1>
                <p className="text-gray-600 mb-8">Your donation has been successfully received.</p>

                <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left">
                    <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
                    <p className="font-mono text-xs text-gray-900 break-all">{searchParams.get("payment_intent_client_secret")?.split('_secret')[0]}</p>
                </div>

                <div className="space-y-3">
                    <Link href="/dashboard">
                        <Button className="w-full bg-[#0F5E36] hover:bg-[#0b4628]">View Your Dashboard</Button>
                    </Link>
                    <Link href="/">
                        <Button variant="outline" className="w-full">Return Home</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
