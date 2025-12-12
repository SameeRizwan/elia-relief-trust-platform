"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Loader2, Heart, ArrowLeft, Share2, Check, Users, Target, Calendar } from "lucide-react";
import Link from "next/link";
import { AppealCard } from "@/components/AppealCard";
import { RecentContributions } from "@/components/campaign/RecentContributions";

export default function CampaignDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { addToCart } = useCart();

    const [campaign, setCampaign] = useState<any>(null);
    const [relatedCampaigns, setRelatedCampaigns] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCampaign = async () => {
            if (!id) return;
            try {
                const docRef = doc(db, "campaigns", id as string);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const campaignData = { id: docSnap.id, ...data };
                    setCampaign(campaignData);

                    // Fetch related campaigns in same category
                    if (data.category) {
                        const relatedQuery = query(
                            collection(db, "campaigns"),
                            where("category", "==", data.category),
                            limit(4)
                        );
                        const relatedSnap = await getDocs(relatedQuery);
                        const related = relatedSnap.docs
                            .filter(d => d.id !== id)
                            .slice(0, 3)
                            .map(d => ({ id: d.id, ...d.data() }));
                        setRelatedCampaigns(related);
                    }
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
        router.push(`/donate/${campaign.id}`);
    };

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: campaign?.title,
                text: campaign?.description?.substring(0, 100),
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
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
                <h1 className="text-2xl font-bold mb-4">Campaign Not Found</h1>
                <p className="text-gray-600 mb-8">The campaign you are looking for does not exist or has been removed.</p>
                <Button onClick={() => router.push("/appeals")}>View All Appeals</Button>
            </div>
        );
    }

    const percentage = Math.min(((campaign.raisedAmount || 0) / (campaign.goalAmount || 1)) * 100, 100);

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px]">
                <img
                    src={campaign.imageUrl || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2670&auto=format&fit=crop"}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                <div className="absolute top-6 left-6">
                    <Button
                        variant="ghost"
                        className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border border-white/30"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="container mx-auto max-w-6xl">
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                {campaign.category || "General"}
                            </span>
                            {campaign.isZakatEligible && (
                                <span className="bg-blue-500/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                                    <Check size={12} /> Zakat Eligible
                                </span>
                            )}
                            {campaign.isUrgent && (
                                <span className="bg-red-500/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    Urgent
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-3xl">{campaign.title}</h1>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 max-w-6xl py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Description */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 text-center">
                                <Target className="mx-auto mb-2 text-[#0F5E36]" size={24} />
                                <p className="text-2xl font-bold text-gray-900">£{campaign.goalAmount?.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">Goal</p>
                            </div>
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 text-center">
                                <Heart className="mx-auto mb-2 text-[#0F5E36]" size={24} />
                                <p className="text-2xl font-bold text-gray-900">£{campaign.raisedAmount?.toLocaleString() || 0}</p>
                                <p className="text-xs text-gray-500">Raised</p>
                            </div>
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 text-center">
                                <Users className="mx-auto mb-2 text-[#0F5E36]" size={24} />
                                <p className="text-2xl font-bold text-gray-900">{campaign.donorCount || 0}</p>
                                <p className="text-xs text-gray-500">Donors</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Campaign</h2>
                            <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                                {campaign.description}
                            </div>
                        </div>

                        {/* Location if available */}
                        {campaign.country && (
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-2">Location</h3>
                                <p className="text-gray-600">{campaign.country}</p>
                            </div>
                        )}
                    </div>

                    {/* Right: Donation CTA */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-28">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Heart className="text-[#0F5E36] fill-current" />
                                Support this cause
                            </h3>

                            {/* Progress */}
                            <div className="mb-8">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-2xl font-bold text-[#0F5E36]">£{campaign.raisedAmount?.toLocaleString() || 0}</span>
                                    <span className="text-sm text-gray-500 font-medium">of £{campaign.goalAmount?.toLocaleString()}</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="bg-[#0F5E36] h-full rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-2">{Math.round(percentage)}% of goal reached</p>
                            </div>

                            <Button
                                onClick={handleDonate}
                                className="w-full bg-[#0F5E36] hover:bg-[#0b4628] text-white h-14 text-lg font-bold rounded-xl shadow-lg shadow-green-900/10 transition-all hover:scale-[1.02] active:scale-[0.98] mb-4"
                            >
                                Donate Now
                            </Button>

                            <Button
                                variant="outline"
                                onClick={handleShare}
                                className="w-full border-gray-200 text-gray-600 hover:text-[#0F5E36] hover:border-[#0F5E36] h-12 font-medium rounded-xl"
                            >
                                <Share2 className="mr-2 h-4 w-4" /> Share Campaign
                            </Button>

                            <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
                                <Check size={12} /> Secure 256-bit SSL Encrypted payment
                            </p>
                        </div>
                    </div>
                </div>

                {/* Related Campaigns */}
                {relatedCampaigns.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Campaigns</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedCampaigns.map((c, index) => (
                                <AppealCard
                                    key={c.id}
                                    id={c.id}
                                    title={c.title}
                                    description={c.description}
                                    image={c.imageUrl}
                                    raised={c.raisedAmount || 0}
                                    goal={c.goalAmount || 10000}
                                    category={c.category}
                                    index={index}
                                    donorCount={c.donorCount || 0}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
