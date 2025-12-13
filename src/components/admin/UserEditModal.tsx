"use client";

import { useState } from "react";
import { UserProfile, UserRole } from "@/types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface UserEditModalProps {
    user: UserProfile;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: () => void;
}

export default function UserEditModal({ user, isOpen, onClose, onUpdate }: UserEditModalProps) {
    const [role, setRole] = useState<UserRole>(user.role);
    const [status, setStatus] = useState<'active' | 'banned' | 'pending'>(user.status || 'active');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateDoc(doc(db, "users", user.uid), {
                role,
                status
            });
            onUpdate();
            onClose();
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                <h2 className="text-xl font-bold mb-6">Edit User: {user.displayName || user.email}</h2>

                <div className="space-y-4 mb-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value as UserRole)}
                            className="w-full rounded-lg border border-gray-300 p-2.5 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        >
                            <option value="user">User</option>
                            <option value="donor">Donor</option>
                            <option value="volunteer">Volunteer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as any)}
                            className="w-full rounded-lg border border-gray-300 p-2.5 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        >
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="banned">Banned</option>
                        </select>
                    </div>

                    {status === 'banned' && (
                        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100 flex gap-2">
                            <span>⚠️</span>
                            <p>This user will be prevented from accessing the platform.</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                        disabled={loading}
                    >
                        {loading && <span className="animate-spin text-lg">⏳</span>}
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
