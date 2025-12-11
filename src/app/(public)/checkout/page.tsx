"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCart } from "@/context/CartContext";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { Loader2, User, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

// Replace with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function CheckoutPage() {
    const { items, totalAmount } = useCart();
    const { user, loading } = useAuth();
    const router = useRouter();
    const [clientSecret, setClientSecret] = useState("");

    // Checkout Mode: 'selection' (login vs guest), 'guest' (form), 'user' (form)
    const [checkoutMode, setCheckoutMode] = useState<'selection' | 'guest' | 'user'>('selection');

    // Donor Information State
    const [donorInfo, setDonorInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postcode: "",
        giftAid: false
    });
    const [step, setStep] = useState(1); // 1: Info, 2: Payment

    useEffect(() => {
        // Redirect if empty
        if (items.length === 0) {
            // router.push("/appeals");
        }
    }, [items, router]);

    // Handle Authentication Logic
    useEffect(() => {
        if (!loading) {
            if (user) {
                setCheckoutMode('user');
                // Pre-fill info if available (assuming user object has display name/email)
                // If you store more profile data in firestore 'users' collection, you might fetch it here.
                // For now, basic auth info:
                const names = user.displayName?.split(' ') || ["", ""];
                setDonorInfo(prev => ({
                    ...prev,
                    firstName: names[0] || prev.firstName,
                    lastName: names.slice(1).join(' ') || prev.lastName,
                    email: user.email || prev.email
                }));
            } else {
                // If not logged in, keep at selection (default) or if user already chose guest, stay guest
                if (checkoutMode === 'user') setCheckoutMode('selection');
            }
        }
    }, [user, loading]);

    const handleInfoSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Create PaymentIntent
        try {
            const res = await fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items, amount: totalAmount }),
            });
            const data = await res.json();

            if (data.clientSecret) {
                setClientSecret(data.clientSecret);
                // Save donor info to local storage or context if needed for post-success
                localStorage.setItem("donorInfo", JSON.stringify(donorInfo));
                setStep(2);
            } else {
                alert("Failed to initialize payment. Please check your connection.");
            }
        } catch (error) {
            console.error("Error init payment:", error);
            alert("Error initializing payment.");
        }
    };

    const appearance: any = {
        theme: 'stripe',
        variables: {
            colorPrimary: '#0F5E36',
        },
    };
    const options = {
        clientSecret,
        appearance,
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin text-[#0F5E36]" size={48} />
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="container mx-auto py-24 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <p>Please add some appeals to your donation cart.</p>
            </div>
        );
    }

    // Checking Options View
    if (checkoutMode === 'selection' && !user) {
        return (
            <div className="bg-gray-50 min-h-screen py-12 flex items-center justify-center">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">How would you like to checkout?</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Guest Option */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center hover:border-[#0F5E36] transition-colors cursor-pointer group" onClick={() => setCheckoutMode('guest')}>
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-50 transition-colors">
                                <User className="w-8 h-8 text-gray-600 group-hover:text-[#0F5E36]" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Guest Checkout</h2>
                            <p className="text-gray-500 mb-6">No account needed. Just enter your details and donate securely.</p>
                            <button className="w-full py-3 rounded-lg border-2 border-gray-200 font-bold text-gray-700 group-hover:border-[#0F5E36] group-hover:text-[#0F5E36] transition-all">
                                Continue as Guest
                            </button>
                        </div>

                        {/* Login Option */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center hover:border-[#0F5E36] transition-colors cursor-pointer group">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <UserCircle className="w-8 h-8 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Registered User</h2>
                            <p className="text-gray-500 mb-6">Login to access your saved details and donation history.</p>
                            <Link href="/login?redirect=/checkout" className="block w-full py-3 rounded-lg bg-[#0F5E36] text-white font-bold hover:bg-[#0b4628] transition-all">
                                Login to Donate
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Secure Donation Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">

                    {/* Left Column: Form/Payment */}
                    <div className="lg:w-2/3 space-y-6">

                        {/* Step 1: Donor Info */}
                        <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200 ${step === 2 ? 'opacity-50 pointer-events-none' : ''}`}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <span className="bg-[#0F5E36] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                                    Donor Details
                                </h2>
                                {step === 2 && <button onClick={() => setStep(1)} className="text-sm text-[#0F5E36] underline pointer-events-auto">Edit</button>}
                            </div>

                            {step === 1 && (
                                <form onSubmit={handleInfoSubmit} className="space-y-4">
                                    {user && (
                                        <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm mb-4">
                                            Logged in as <strong>{user.email}</strong>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                            <input required type="text" className="w-full p-2 border rounded-md" value={donorInfo.firstName} onChange={e => setDonorInfo({ ...donorInfo, firstName: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                            <input required type="text" className="w-full p-2 border rounded-md" value={donorInfo.lastName} onChange={e => setDonorInfo({ ...donorInfo, lastName: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <input required type="email" className="w-full p-2 border rounded-md" value={donorInfo.email} onChange={e => setDonorInfo({ ...donorInfo, email: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                            <input type="tel" className="w-full p-2 border rounded-md" value={donorInfo.phone} onChange={e => setDonorInfo({ ...donorInfo, phone: e.target.value })} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <input required type="text" className="w-full p-2 border rounded-md" value={donorInfo.address} onChange={e => setDonorInfo({ ...donorInfo, address: e.target.value })} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                            <input required type="text" className="w-full p-2 border rounded-md" value={donorInfo.city} onChange={e => setDonorInfo({ ...donorInfo, city: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
                                            <input required type="text" className="w-full p-2 border rounded-md" value={donorInfo.postcode} onChange={e => setDonorInfo({ ...donorInfo, postcode: e.target.value })} />
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <input type="checkbox" className="mt-1" checked={donorInfo.giftAid} onChange={e => setDonorInfo({ ...donorInfo, giftAid: e.target.checked })} />
                                            <div className="text-sm text-gray-700">
                                                <span className="font-bold block text-gray-900 mb-1">Gift Aid it! Boost your donation by 25p of Gift Aid for every £1 you donate.</span>
                                                I am a UK taxpayer and understand that if I pay less Income Tax and/or Capital Gains Tax in the current tax year than the amount of Gift Aid claimed on all my donations it is my responsibility to pay any difference.
                                            </div>
                                        </label>
                                    </div>

                                    <button type="submit" className="w-full bg-[#0F5E36] text-white py-3 rounded-lg font-bold hover:bg-[#0b4628] transition-colors mt-4">
                                        Continue to Payment
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Step 2: Payment */}
                        {step === 2 && clientSecret && (
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-in fade-in slide-in-from-bottom-4">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                                    <span className="bg-[#0F5E36] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                                    Payment Method
                                </h2>
                                <Elements options={options} stripe={stripePromise}>
                                    <CheckoutForm amount={totalAmount} />
                                </Elements>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Order Summary</h3>
                            <div className="space-y-4 max-h-[400px] overflow-y-auto mb-4">
                                {items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <span className="text-gray-600 line-clamp-1 flex-1 pr-4">{item.title}</span>
                                        <span className="font-medium text-gray-900">£{item.amount}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t pt-4 flex justify-between items-center">
                                <span className="font-bold text-gray-600">Total Donation</span>
                                <span className="font-extrabold text-2xl text-[#0F5E36]">£{totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="mt-6 text-xs text-gray-500 text-center">
                                Secure Payment processed by Stripe.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
