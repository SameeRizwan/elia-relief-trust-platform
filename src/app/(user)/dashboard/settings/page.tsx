"use client";

import { Bell, Shield, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

            <div className="space-y-6">
                {/* Notifications */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Bell className="text-[#0F5E36]" />
                        <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">Email Notifications</p>
                                <p className="text-sm text-gray-500">Receive updates about your donations and appeals.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F5E36]"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="text-[#0F5E36]" />
                        <h2 className="text-lg font-bold text-gray-900">Security</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">Change Password</p>
                                <p className="text-sm text-gray-500">Update your password regularly to keep your account secure.</p>
                            </div>
                            <Button variant="outline">Update</Button>
                        </div>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <CreditCard className="text-[#0F5E36]" />
                        <h2 className="text-lg font-bold text-gray-900">Payment Methods</h2>
                    </div>
                    <div className="space-y-4">
                        <p className="text-sm text-gray-500">Manage your saved cards and payment details in the Stripe Customer Portal.</p>
                        <Button variant="outline">Manage Billing</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
