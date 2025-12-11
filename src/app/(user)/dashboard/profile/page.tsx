"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin } from "lucide-react";

export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-[#0F5E36] text-white flex items-center justify-center font-bold text-3xl">
                        {(user?.displayName?.charAt(0) || "U").toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{user?.displayName || "User"}</h2>
                        <p className="text-gray-500">{user?.email}</p>
                    </div>
                </div>

                <div className="p-6 grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <User size={16} /> Full Name
                            </label>
                            <input
                                type="text"
                                value={user?.displayName || ""}
                                disabled
                                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Mail size={16} /> Email Address
                            </label>
                            <input
                                type="email"
                                value={user?.email || ""}
                                disabled
                                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <h3 className="font-medium text-gray-900 mb-4">Account Actions</h3>
                        <div className="flex gap-3">
                            {/* Placeholder for future edit functionality */}
                            <Button variant="outline" className="opacity-50 cursor-not-allowed">Edit Profile (Coming Soon)</Button>
                            <Button variant="destructive" className="opacity-50 cursor-not-allowed">Delete Account</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
