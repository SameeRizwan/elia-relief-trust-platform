import { ZakatCalculator } from "@/components/zakat/ZakatCalculator";

export const metadata = {
    title: "Zakat Calculator | Elia Relief Trust",
    description: "Calculate and pay your Zakat easily with our comprehensive tool.",
};

export default function ZakatPage() {
    return (
        <div className="bg-gray-50 min-h-screen">

            {/* Hero Section */}
            <section className="bg-[#0F5E36] text-white py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Purify Your Wealth
                    </h1>
                    <p className="text-xl md:text-2xl text-green-100 max-w-2xl mx-auto leading-relaxed">
                        Calculate your Zakat accurately and help transform lives across the world.
                    </p>
                </div>
                {/* Decorative background elements can correspond to designs */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="py-16 -mt-10 relative z-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <ZakatCalculator />
                </div>
            </section>

            {/* Educational Content / FAQ */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>

                    <div className="space-y-8">
                        <FAQItem
                            question="What is Zakat?"
                            answer="Zakat is one of the Five Pillars of Islam, a mandatory charitable contribution for all Muslims who meet the necessary criteria of wealth (Nisab). It is purification of one's wealth."
                        />
                        <FAQItem
                            question="What is Nisab?"
                            answer="Nisab is the minimum amount of wealth a Muslim must possess before they become liable to pay Zakat. It is equivalent to the value of 87.48g of gold or 612.36g of silver."
                        />
                        <FAQItem
                            question="When is Zakat due?"
                            answer="Zakat is due once a lunar year has passed (Hawl) on the wealth that meets the Nisab threshold. Many people choose to pay during Ramadan for greater rewards."
                        />
                        <FAQItem
                            question="Who receives Zakat?"
                            answer="Zakat is distributed to eight categories of people as defined in the Quran, including the poor, the needy, those in debt, and for the cause of Allah."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    return (
        <div className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
            <h3 className="text-xl font-bold text-gray-900 mb-3">{question}</h3>
            <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
    )
}
