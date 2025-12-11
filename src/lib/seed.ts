// Seed script for development - uses client Firebase SDK
// Can be triggered via a UI component or console

import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export const seedData = async () => {
    console.log("Seeding data...");

    // 1. Seed 'Iftar as-saami' if not exists
    const campaignQ = query(collection(db, "campaigns"), where("title", "==", "Iftar as-saami"));
    const campaignSnap = await getDocs(campaignQ);

    if (campaignSnap.empty) {
        await addDoc(collection(db, "campaigns"), {
            title: "Iftar as-saami",
            description: "Provide comprehensive Iftar meals for fasting families during Ramadan. Your contribution ensures that the most vulnerable have food to break their fast with dignity.",
            goalAmount: 50000,
            raisedAmount: 12500,
            imageUrl: "https://images.unsplash.com/photo-1606092195730-5d7b9af1ef4d?q=80&w=2670&auto=format&fit=crop",
            category: "Food",
            country: "Global",
            isUrgent: true,
            isZakatEligible: true,
            active: true,
            slug: "iftar-as-saami",
            createdAt: new Date(),
            donorsCount: 12 // Adding this field to match user request visual
        });
        console.log("Seeded Iftar campaign");
    }

    // 2. Seed Orphans
    const orphanQ = query(collection(db, "orphans"));
    const orphanSnap = await getDocs(orphanQ);
    if (orphanSnap.empty) {
        await addDoc(collection(db, "orphans"), {
            name: "Fatima",
            age: 8,
            gender: "Female",
            country: "Gaza",
            story: "Fatima lost her parents in the conflict and lives with her grandmother.",
            imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2670",
            monthlyCost: 30,
            status: "Available",
            createdAt: new Date()
        });
        await addDoc(collection(db, "orphans"), {
            name: "Ahmed",
            age: 10,
            gender: "Male",
            country: "Yemen",
            story: "Ahmed loves to study and wants to be a doctor.",
            imageUrl: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=2670",
            monthlyCost: 30,
            status: "Sponsored",
            createdAt: new Date()
        });
        console.log("Seeded Orphans");
    }
};
