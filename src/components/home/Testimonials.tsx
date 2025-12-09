export function Testimonials() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Donors Say</h2>
                    <div className="w-20 h-1 bg-[#0F5E36] mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-50 p-8 rounded-2xl relative">
                            <div className="text-[#0F5E36] text-6xl font-serif absolute top-4 left-6 opacity-20">"</div>
                            <p className="text-gray-600 italic mb-6 relative z-10 pt-4">
                                "I have been donating with Elia Relief Trust for 5 years. Their transparency and dedication to the ground work is unmatched. I know my money is safe."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-300 rounded-full" />
                                <div>
                                    <h4 className="font-bold text-gray-900">Sarah Jenkins</h4>
                                    <p className="text-sm text-gray-500">Regular Donor</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
