"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, AlertCircle, Shield } from "lucide-react";

export default function AdminSetupPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const makeAdmin = async () => {
        if (!user) {
            setError("You must be logged in first");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                role: "admin",
                displayName: user.displayName || "Admin",
                createdAt: new Date().toISOString()
            });
            setSuccess(true);
        } catch (err: any) {
            console.error("Error creating admin user:", err);
            setError("Failed to create admin user: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="w-16 h-16 bg-[#0F5E36]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="text-[#0F5E36] w-8 h-8" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Setup</h1>
                <p className="text-gray-500 mb-6">
                    Make your current account an admin user
                </p>

                {!user ? (
                    <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg mb-6">
                        <p className="font-medium">Not logged in</p>
                        <p className="text-sm mt-1">Please login first, then return to this page.</p>
                    </div>
                ) : (
                    <div className="bg-blue-50 text-blue-800 p-4 rounded-lg mb-6 text-left">
                        <p className="font-medium">Current User</p>
                        <p className="text-sm mt-1">{user.email}</p>
                        <p className="text-xs mt-1 text-blue-600">UID: {user.uid}</p>
                    </div>
                )}

                {success ? (
                    <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-center gap-2">
                        <CheckCircle size={20} />
                        <span>Admin user created! You can now access /admin/login</span>
                    </div>
                ) : (
                    <>
                        {error && (
                            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4 flex items-center gap-2">
                                <AlertCircle size={18} />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        <Button
                            onClick={makeAdmin}
                            disabled={loading || !user}
                            className="w-full bg-[#0F5E36] hover:bg-[#0b4628] text-white"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={18} />
                                    Setting up...
                                </>
                            ) : (
                                "Make Me Admin"
                            )}
                        </Button>
                    </>
                )}

                <p className="text-xs text-gray-400 mt-6">
                    ⚠️ Delete this page after setup for security
                </p>
            </div>
        </div>
    );
}
