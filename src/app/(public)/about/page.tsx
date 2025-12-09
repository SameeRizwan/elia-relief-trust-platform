import { ShieldCheck, Heart, Globe, Users, Target, BookOpen } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-slate-900 text-white py-32 overflow-hidden">
                <div className="absolute inset-0 bg-[#0F5E36]/20 mix-blend-overlay z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2940&auto=format&fit=crop")' }}
                />
                <div className="container mx-auto px-4 relative z-20 text-center">
                    <span className="text-[#0F5E36] font-bold tracking-widest uppercase mb-4 block">Who We Are</span>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight">
                        Serving Humanity,<br />Without Compromise
                    </h1>
                    <p className="text-xl max-w-2xl mx-auto text-gray-200 leading-relaxed">
                        We are a 100% donation policy charity working across the globe to save lives and empower communities.
                    </p>
                </div>
            </div>

            {/* 100% Donation Policy - Key Feature */}
            <div className="bg-[#0F5E36] text-white py-16">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
                    <div className="bg-white/10 p-6 rounded-full">
                        <ShieldCheck size={48} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-2">100% Donation Policy</h2>
                        <p className="text-lg opacity-90 max-w-2xl">
                            Every single penny of your Zakat, Sadaqah, and Lillah goes directly to the cause. We do not deduct any administrative costs or fees from your donation. Our operations are funded by Gift Aid and separate donations specifically for admin.
                        </p>
                    </div>
                </div>
            </div>

            {/* Our Story & Mission */}
            <div className="py-24 container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                            <p>
                                Established in 2013, we started with a simple vision: to provide a transparent, efficient, and impactful way for people to help those in need. What began as a small group of volunteers delivering food packs has grown into a global movement.
                            </p>
                            <p>
                                We believe that charity is not just about giving money; it's about restoring dignity. Whether it's building a home for a widow in Syria, digging a well in Somalia, or sponsoring an orphan in Gaza, we ensure that your aid delivers long-term sustainable change.
                            </p>
                            <p>
                                Our team is on the ground in over 15 countries, ensuring that aid reaches the most vulnerable quickly and effectively. We are accountable to Allah first, and then to you, our donors.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 h-64 flex flex-col justify-center items-center text-center">
                                <Globe className="w-12 h-12 text-[#0F5E36] mb-4" />
                                <h3 className="font-bold text-xl mb-2 text-gray-900">15+ Countries</h3>
                                <p className="text-sm text-gray-700 font-medium">Delivering aid globally</p>
                            </div>
                            <div className="bg-slate-900 text-white p-8 rounded-2xl border border-gray-100 h-64 flex flex-col justify-center items-center text-center">
                                <Target className="w-12 h-12 text-[#0F5E36] mb-4" />
                                <h3 className="font-bold text-xl mb-2">Zero Admin Fee</h3>
                                <p className="text-sm text-gray-400">100% goes to the cause</p>
                            </div>
                        </div>
                        <div className="space-y-6 pt-12">
                            <div className="bg-green-50 p-8 rounded-2xl border border-green-100 h-64 flex flex-col justify-center items-center text-center">
                                <Users className="w-12 h-12 text-[#0F5E36] mb-4" />
                                <h3 className="font-bold text-xl mb-2 text-gray-900">1 Million+</h3>
                                <p className="text-sm text-gray-700 font-medium">Beneficiaries served</p>
                            </div>
                            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 h-64 flex flex-col justify-center items-center text-center">
                                <BookOpen className="w-12 h-12 text-[#0F5E36] mb-4" />
                                <h3 className="font-bold text-xl mb-2 text-gray-900">Islamic Values</h3>
                                <p className="text-sm text-gray-700 font-medium">Guided by Sunnah</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-gray-50 py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                        <div className="w-20 h-1 bg-[#0F5E36] mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <div className="w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center text-[#0F5E36] mb-6">
                                <ShieldCheck size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Transparency</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We pride ourselves on complete transparency. We provide feedback reports for your donations, so you can see exactly where your money went and who it helped.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <div className="w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center text-[#0F5E36] mb-6">
                                <Heart size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Compassion</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We treat every beneficiary with dignity and respect. Our aid is not just a handout; it is a hand up to help them stand on their own feet.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <div className="w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center text-[#0F5E36] mb-6">
                                <Target size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Accountability</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We are regularly audited and hold ourselves to the highest standards of governance. We fear Allah in our handling of Amanah (Trust).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
