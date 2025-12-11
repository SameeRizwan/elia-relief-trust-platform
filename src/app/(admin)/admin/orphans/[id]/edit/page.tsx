"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { OrphanForm } from "@/components/admin/OrphanForm";

export default function EditOrphanPage() {
    const router = useRouter();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        const fetchOrphan = async () => {
            if (!params.id) return;
            try {
                const docRef = doc(db, "orphans", params.id as string);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setInitialData(docSnap.data());
                } else {
                    alert("Orphan not found");
                    router.push("/admin/orphans");
                }
            } catch (error) {
                console.error("Error fetching orphan", error);
            }
        };
        fetchOrphan();
    }, [params.id, router]);

    const handleSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const docRef = doc(db, "orphans", params.id as string);
            await updateDoc(docRef, data);
            router.push("/admin/orphans");
        } catch (error) {
            console.error("Error updating orphan:", error);
            alert("Failed to update orphan");
        } finally {
            setIsLoading(false);
        }
    };

    if (!initialData) return <div>Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/orphans" className="text-gray-500 hover:text-gray-900 transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold mb-6">Edit Orphan Profile</h1>
            </div>

            <OrphanForm
                initialData={initialData}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                buttonText="Update Profile"
            />
        </div>
    );
}
