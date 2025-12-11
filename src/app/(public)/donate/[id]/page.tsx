"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Loader2, Heart, ArrowLeft, Share2, Check } from "lucide-react";

export default function DonatePage() {
    const { id } = useParams();
    const router = useRouter();
    const { addToCart } = useCart();

    // State
    const [campaign, setCampaign] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState(30); // Default amount
    const [customAmount, setCustomAmount] = useState("");

    const PRESET_AMOUNTS = [30, 50, 100, 200, 500];

    useEffect(() => {
        const fetchCampaign = async () => {
            if (!id) return;
            try {
                const docRef = doc(db, "campaigns", id as string);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setCampaign({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.error("Campaign not found");
                }
            } catch (err) {
                console.error("Error fetching campaign:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCampaign();
    }, [id]);

    const handleDonate = () => {
        if (!campaign) return;

        const finalAmount = customAmount ? parseFloat(customAmount) : amount;

        if (finalAmount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        addToCart({
            id: campaign.id,
            title: campaign.title,
            amount: finalAmount,
            type: 'single', // or monthly if selected
            image: campaign.imageUrl
        });

        // Redirect directly to checkout as per "Donate Now" expectation? 
        // Or open cart? User said "when i click donate... not working".
        // Let's go to checkout for a smooth "Donate" experience.
        router.push("/checkout");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-[#0F5E36]" size={48} />
            </div>
        );
    }

    if (!campaign) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-2xl font-bold mb-4">Appeal Not Found</h1>
                <p className="text-gray-600 mb-8">The appeal you are looking for does not exist or has been removed.</p>
                <Button onClick={() => router.push("/appeals")}>View All Appeals</Button>
            </div>
        );
    }

    const percentage = Math.min(((campaign.raisedAmount || 0) / (campaign.goalAmount || 1)) * 100, 100);

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-6xl">

                <Button variant="ghost" className="mb-8 hover:bg-transparent hover:text-[#0F5E36] -ml-4" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                            <div className="relative h-[400px]">
                                <img
                                    src={campaign.imageUrl || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2670&auto=format&fit=crop"}
                                    alt={campaign.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button className="bg-white/90 p-2 rounded-full shadow-sm hover:bg-white text-gray-700 transition-colors">
                                        <Share2 size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                        {campaign.category || "General"}
                                    </span>
                                    {campaign.isZakatEligible && (
                                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                                            <Check size={12} /> Zakat Eligible
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{campaign.title}</h1>

                                <div className="prose max-w-none text-gray-600 leading-relaxed font-sans mb-8 whitespace-pre-line">
                                    {campaign.description}
                                </div>

                                {/* Mock Updates Section? */}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Donation Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-24">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Heart className="text-[#0F5E36] fill-current" />
                                Support this cause
                            </h3>

                            {/* Progress */}
                            <div className="mb-8">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-2xl font-bold text-[#0F5E36]">£{campaign.raisedAmount?.toLocaleString() || 0}</span>
                                    <span className="text-sm text-gray-500 font-medium">raised of £{campaign.goalAmount?.toLocaleString()} goal</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                    <div className="bg-[#0F5E36] h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${percentage}%` }} />
                                </div>
                                <p className="text-xs text-gray-400 mt-2 text-right">{campaign.donorsCount || 0} supporters</p>
                            </div>

                            {/* Amount Selector */}
                            <div className="space-y-4 mb-8">
                                <label className="text-sm font-medium text-gray-700 block">Choose amount</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {PRESET_AMOUNTS.map((val) => (
                                        <button
                                            key={val}
                                            onClick={() => { setAmount(val); setCustomAmount(""); }}
                                            className={`py-3 rounded-lg border font-bold text-sm transition-all ${amount === val && !customAmount
                                                    ? "bg-[#0F5E36] text-white border-[#0F5E36] shadow-md transform scale-105"
                                                    : "bg-white text-gray-600 border-gray-200 hover:border-[#0F5E36] hover:text-[#0F5E36]"
                                                }`}
                                        >
                                            £{val}
                                        </button>
                                    ))}
                                </div>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">£</span>
                                    <input
                                        type="number"
                                        placeholder="Custom Amount"
                                        value={customAmount}
                                        onChange={(e) => { setCustomAmount(e.target.value); setAmount(0); }}
                                        className={`w-full pl-8 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#0F5E36] focus:border-transparent outline-none font-medium ${customAmount ? "border-[#0F5E36] bg-green-50 text-[#0F5E36]" : "border-gray-200"
                                            }`}
                                    />
                                </div>
                            </div>

                            <Button
                                onClick={handleDonate}
                                className="w-full bg-[#0F5E36] hover:bg-[#0b4628] text-white h-14 text-lg font-bold rounded-xl shadow-lg shadow-green-900/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Donate Now
                            </Button>

                            <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
                                <Check size={12} /> Secure 256-bit SSL Encrypted payment
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
