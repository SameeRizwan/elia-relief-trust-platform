import { CAUSES } from "@/data/mockData";
import { DonationCard } from "@/components/DonationCard";

export default function CausesPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Causes</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Choose a cause that resonates with you and help us make a real impact.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {CAUSES.map((cause) => (
                    <DonationCard key={cause.id} {...cause} />
                ))}
            </div>
        </div>
    );
}
