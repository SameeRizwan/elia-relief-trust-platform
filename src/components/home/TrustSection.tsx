import { ShieldCheck, HeartHandshake, Banknote, Globe2 } from "lucide-react";

export function TrustSection() {
    return (
        <section className="py-20 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">

                    <div className="flex flex-col items-center p-6 hover:bg-gray-50 rounded-xl transition-colors">
                        <div className="w-16 h-16 bg-[#0F5E36]/10 rounded-full flex items-center justify-center text-[#0F5E36] mb-4">
                            <Banknote size={32} />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-black">100% Donation Policy</h3>
                        <p className="text-gray-900 text-sm font-medium">Every penny you donate goes directly to the cause. We cover admin costs separately.</p>
                    </div>

                    <div className="flex flex-col items-center p-6 hover:bg-gray-50 rounded-xl transition-colors">
                        <div className="w-16 h-16 bg-[#0F5E36]/10 rounded-full flex items-center justify-center text-[#0F5E36] mb-4">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-black">Secure & Verified</h3>
                        <p className="text-gray-900 text-sm font-medium">We are a registered charity regulated by the Charity Commission.</p>
                    </div>

                    <div className="flex flex-col items-center p-6 hover:bg-gray-50 rounded-xl transition-colors">
                        <div className="w-16 h-16 bg-[#0F5E36]/10 rounded-full flex items-center justify-center text-[#0F5E36] mb-4">
                            <Globe2 size={32} />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-black">Global Reach</h3>
                        <p className="text-gray-900 text-sm font-medium">Active in over 30 countries delivering aid to those who need it most.</p>
                    </div>

                    <div className="flex flex-col items-center p-6 hover:bg-gray-50 rounded-xl transition-colors">
                        <div className="w-16 h-16 bg-[#0F5E36]/10 rounded-full flex items-center justify-center text-[#0F5E36] mb-4">
                            <HeartHandshake size={32} />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-black">Trusted by Thousands</h3>
                        <p className="text-gray-900 text-sm font-medium">Over 500,000 donors trust us to deliver their Zakat and Sadaqah.</p>
                    </div>

                </div>
            </div>
        </section>
    );
}
