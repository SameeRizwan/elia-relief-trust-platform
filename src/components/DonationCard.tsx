import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CauseProps {
    id: string;
    title: string;
    description: string;
    image: string;
    goal: number;
    raised: number;
}

export function DonationCard({ id, title, description, image, goal, raised }: CauseProps) {
    const progress = Math.min((raised / goal) * 100, 100);

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 overflow-hidden relative">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
            <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{description}</p>

                <div className="mt-auto space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                            <span className="text-[#0F5E36]">${raised.toLocaleString()}</span>
                            <span className="text-gray-500">of ${goal.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                            <div
                                className="bg-[#0F5E36] h-2.5 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    <Link href={`/donate/${id}`} passHref className="block">
                        <Button className="w-full bg-[#111] hover:bg-black text-white">
                            Donate Now
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
