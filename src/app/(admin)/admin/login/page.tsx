"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, User, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function AdminLoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Hardcoded admin credentials
        const ADMIN_USERNAME = "admin";
        const ADMIN_PASSWORD = "Elia@2024!";

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            // Store admin session in localStorage
            localStorage.setItem("isAdminLoggedIn", "true");
            localStorage.setItem("adminLoginTime", Date.now().toString());
            router.push("/admin");
        } else {
            setError("Invalid username or password");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="relative w-12 h-16">
                                <Image
                                    src="/assets/elia-logo.jpg"
                                    alt="Elia Relief Trust"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-extrabold text-[#0F5E36] tracking-tight leading-none">
                                    ELIA
                                </span>
                                <span className="text-xs font-bold text-gray-900 tracking-wider">
                                    RELIEF TRUST
                                </span>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                        Admin Login
                    </h1>
                    <p className="text-gray-500 text-center mb-8 text-sm">
                        Enter your credentials to access the admin panel
                    </p>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                            <AlertCircle size={18} />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0F5E36] focus:border-transparent outline-none"
                                    placeholder="admin"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0F5E36] focus:border-transparent outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#0F5E36] text-white py-3 rounded-lg font-bold hover:bg-[#0b4628] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-gray-500 text-sm mt-6">
                    This is a restricted area. Unauthorized access is prohibited.
                </p>
            </div>
        </div>
    );
}
