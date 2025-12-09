import { Droplets, Heart, GraduationCap, Utensils } from "lucide-react";

const stats = [
    { icon: Droplets, value: "150+", label: "Wells Built", color: "text-blue-500", bg: "bg-blue-50" },
    { icon: Utensils, value: "1M+", label: "Meals Served", color: "text-orange-500", bg: "bg-orange-50" },
    { icon: GraduationCap, value: "5,000", label: "Students Educated", color: "text-emerald-500", bg: "bg-emerald-50" },
    { icon: Heart, value: "2,500", label: "Orphans Sponsored", color: "text-red-500", bg: "bg-red-50" },
];

export function ImpactStats() {
    return (
        <div className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Global Impact</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Thanks to your generosity, we have been able to change lives across the globe. Here is a snapshot of what we have achieved together.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div key={i} className="flex flex-col items-center">
                                <div className={`w-16 h-16 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                                    <Icon size={32} />
                                </div>
                                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                                <p className="text-gray-600 font-medium">{stat.label}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
