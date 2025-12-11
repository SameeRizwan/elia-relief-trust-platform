"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { Loader2, Database } from "lucide-react";

const SEED_DATA = [
    {
        title: "Iftar as-saami",
        description: "Provide comprehensive Iftar meals for fasting families during Ramadan. Your contribution ensures that the most vulnerable have food to break their fast with dignity.",
        category: "Ramadan",
        goalAmount: 50000,
        raisedAmount: 12500,
        imageUrl: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=2832&auto=format&fit=crop",
        isUrgent: true,
        active: true,
        country: "Global"
    },
    {
        title: "Monthly Sponsorship",
        description: "Support a family with a monthly food pack. Regular giving allows us to plan effectively and provide consistent avenues of support for destitute families.",
        category: "General",
        goalAmount: 100000,
        raisedAmount: 45000,
        imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2940&auto=format&fit=crop",
        isUrgent: false,
        active: true,
        country: "Global"
    },
    {
        title: "Build Masjid and Madrasah",
        description: "Construct a spiritual center for communities. This project includes a prayer hall and educational facilities to nurture the next generation.",
        category: "Sadaqah Jariyah",
        goalAmount: 25000,
        raisedAmount: 8000,
        imageUrl: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=2864&auto=format&fit=crop",
        isUrgent: false,
        active: true,
        country: "Malawi"
    },
    {
        title: "Sponsor an Orphan",
        description: "Change a child's life forever. Your sponsorship provides education, healthcare, food, and clothing to an orphaned child, giving them hope for a brighter future.",
        category: "Orphans",
        goalAmount: 150000,
        raisedAmount: 92000,
        imageUrl: "https://images.unsplash.com/photo-1502086223501-681a6a817456?q=80&w=2940&auto=format&fit=crop",
        isUrgent: false,
        active: true,
        country: "Somalia"
    },
    {
        title: "Build Well",
        description: "Provide clean, safe drinking water to heavy drought-affected areas. A water well saves hours of walking for women and children and prevents waterborne diseases.",
        category: "Water",
        goalAmount: 7500,
        raisedAmount: 2500,
        imageUrl: "https://images.unsplash.com/photo-1581242163695-19d0acacd468?q=80&w=2940&auto=format&fit=crop",
        isUrgent: true,
        active: true,
        country: "Kenya"
    }
];

export function SeedButton() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const handleSeed = async () => {
        // if (!confirm("Are you sure you want to seed the database? This might create duplicates if run multiple times.")) return;


        setLoading(true);
        setStatus("Starting...");

        try {
            const collectionRef = collection(db, "campaigns");
            let addedCount = 0;

            for (const item of SEED_DATA) {
                // Optional: Check duplication (simple title check)
                const q = query(collectionRef, where("title", "==", item.title));
                const snapshot = await getDocs(q);

                if (snapshot.empty) {
                    await addDoc(collectionRef, {
                        ...item,
                        createdAt: new Date(),
                        slug: item.title.toLowerCase().replace(/ /g, "-")
                    });
                    addedCount++;
                }
            }

            setStatus(`Seeding complete! Added ${addedCount} items.`);
        } catch (error) {
            console.error("Seeding failed", error);
            setStatus("Error seeding data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-4 p-4 border rounded-lg bg-yellow-50 my-4">
            <Button
                onClick={handleSeed}
                disabled={loading}
                variant="outline"
                className="bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200"
            >
                {loading ? <Loader2 className="animate-spin mr-2" /> : <Database className="mr-2" size={16} />}
                Seed Initial Data
            </Button>
            {status && <span className="text-sm font-medium text-yellow-800">{status}</span>}
        </div>
    );
}
