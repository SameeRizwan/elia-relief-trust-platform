"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function FamilyRegistrationPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        familyName: "",
        familyMembers: "",
        description: "",
        needs: "",
    });
    const [submitting, setSubmitting] = useState(false);

    if (!loading && !user) {
        router.push("/login?redirect=/family-registration");
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (user) {
                await updateDoc(doc(db, "users", user.uid), {
                    isFamily: true, // Mark as family
                    familyData: {
                        ...formData,
                        status: "pending", // Admin needs to approve
                        appliedAt: new Date().toISOString()
                    }
                });
                alert("Application submitted successfully!");
                router.push("/dashboard");
            }
        } catch (error) {
            console.error(error);
            alert("Error submitting application");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h1 className="text-3xl font-bold mb-2">Register as a Family</h1>
                <p className="text-gray-600 mb-8">Tell us about your situation so we can help connect you with donors.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Family Name</label>
                        <input
                            required
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.familyName}
                            onChange={(e) => setFormData({ ...formData, familyName: e.target.value })}
                            placeholder="e.g. The Smith Family"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Family Members</label>
                        <input
                            required
                            type="number"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.familyMembers}
                            onChange={(e) => setFormData({ ...formData, familyMembers: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Story</label>
                        <textarea
                            required
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe your situation..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Specific Needs</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.needs}
                            onChange={(e) => setFormData({ ...formData, needs: e.target.value })}
                            placeholder="e.g. Food, Rent, Medical supplies"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {submitting ? "Submitting..." : "Submit Application"}
                    </button>
                </form>
            </div>
        </div>
    );
}
