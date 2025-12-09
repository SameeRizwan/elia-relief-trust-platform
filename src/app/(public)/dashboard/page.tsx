"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [userData, setUserData] = useState<any>(null);

    const [activeTab, setActiveTab] = useState("Overview");

    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState("");

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        } else if (user) {
            // Fetch additional user data
            const fetchUserData = async () => {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                    setNewName(docSnap.data().firstName || "");
                }
            }
            fetchUserData();
        }
    }, [user, loading, router]);

    const handleUpdateProfile = async () => {
        if (!user || !newName.trim()) return;
        try {
            const docRef = doc(db, "users", user.uid);
            await setDoc(docRef, { ...userData, firstName: newName }, { merge: true });
            setUserData({ ...userData, firstName: newName });
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };

    if (loading || !user) {
        return <div className="min-h-screen flex items-center justify-center bg-white text-gray-900">Loading...</div>;
    }

    const renderContent = () => {
        switch (activeTab) {
            case "Overview":
                return (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-sm font-medium text-gray-500">Total Donated</h3>
                                <p className="text-3xl font-bold text-[#0F5E36]">$0.00</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-sm font-medium text-gray-500">Lives Impacted</h3>
                                <p className="text-3xl font-bold text-[#0F5E36]">0</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-sm font-medium text-gray-500">Active Sponsorships</h3>
                                <p className="text-3xl font-bold text-[#0F5E36]">0</p>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold mb-6 text-gray-800">Recent Donations</h2>
                        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Cause</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    <tr>
                                        <td className="px-6 py-8 whitespace-nowrap text-sm text-gray-500 text-center" colSpan={4}>
                                            <div className="flex flex-col items-center justify-center py-8">
                                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                                    <span className="text-2xl">🤲</span>
                                                </div>
                                                <p className="font-medium text-gray-900">No donations yet</p>
                                                <p className="text-gray-500 text-sm mb-4">Your generosity starts here.</p>
                                                <button onClick={() => router.push('/donate')} className="text-[#0F5E36] font-bold hover:underline">Make your first donation</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                );
            case "Donation History":
                return (
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Full Donation History</h2>
                        <p className="text-gray-500">You haven't made any donations yet.</p>
                        <button onClick={() => router.push('/donate')} className="mt-4 bg-[#0F5E36] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#0b4628]">Donate Now</button>
                    </div>
                );
            case "My Sponsorships":
                return (
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">My Sponsorships</h2>
                        <p className="text-gray-500 mb-6">You are not sponsoring any orphans yet.</p>
                        <button onClick={() => router.push('/appeals')} className="bg-[#0F5E36] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#0b4628]">Sponsor an Orphan</button>
                    </div>
                );
            case "Profile Settings":
                return (
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Profile Settings</h2>
                            {!isEditing && (
                                <button onClick={() => setIsEditing(true)} className="text-[#0F5E36] hover:underline font-medium text-sm">Edit Profile</button>
                            )}
                        </div>
                        <form className="max-w-md space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg outline-none ${isEditing ? 'border-[#0F5E36] text-gray-900 bg-white' : 'border-gray-200 text-gray-500 bg-gray-50'}`}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" value={user?.email || ""} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0F5E36] outline-none bg-gray-50 text-gray-500" disabled />
                                <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
                            </div>
                            {isEditing && (
                                <div className="flex gap-2">
                                    <button type="button" onClick={handleUpdateProfile} className="bg-[#0F5E36] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#0b4628]">Save Changes</button>
                                    <button type="button" onClick={() => { setIsEditing(false); setNewName(userData?.firstName || ""); }} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-300">Cancel</button>
                                </div>
                            )}
                        </form>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-white"> {/* Force white background */}
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8 text-[#0F5E36]">My Dashboard</h1>

                <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
                    {/* Sidebar */}
                    <div className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                            <div className="p-6 bg-[#0F5E36] text-white">
                                <p className="font-bold text-lg">{userData?.firstName || "Donor User"}</p>
                                <p className="text-xs text-green-100">{user?.email || "donor@elia.org"}</p>
                            </div>
                            <nav className="p-2 space-y-1">
                                {[
                                    { name: "Overview" },
                                    { name: "Donation History" },
                                    { name: "My Sponsorships" },
                                    { name: "Profile Settings" },
                                ].map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => setActiveTab(item.name)}
                                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === item.name ? 'bg-green-50 text-[#0F5E36]' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </nav>
                            <div className="p-4 border-t border-gray-100">
                                <button className="text-red-500 text-sm font-medium hover:text-red-700">Sign Out</button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}
