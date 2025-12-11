"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { OrphanForm } from "@/components/admin/OrphanForm";

export default function NewOrphanPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            await addDoc(collection(db, "orphans"), {
                ...data,
                createdAt: serverTimestamp(),
            });
            router.push("/admin/orphans");
        } catch (error) {
            console.error("Error creating orphan:", error);
            alert("Failed to create orphan");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/orphans" className="text-gray-500 hover:text-gray-900 transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold mb-6">Register New Orphan</h1>
            </div>

            <OrphanForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                buttonText="Register Orphan"
            />
        </div>
    );
}
