"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { AppealForm } from "@/components/admin/AppealForm";

export default function NewCampaignPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            await addDoc(collection(db, "campaigns"), {
                ...data,
                raisedAmount: 0,
                active: true,
                createdAt: serverTimestamp(),
            });

            router.push("/admin/campaigns");
        } catch (error) {
            console.error("Error creating campaign:", error);
            alert("Failed to create campaign");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/campaigns" className="text-gray-500 hover:text-gray-900 transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold mb-6">Create New Appeal</h1>
            </div>

            <AppealForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                buttonText="Create Appeal"
            />
        </div>
    );
}
