"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Add logic to save to Firestore 'contact_messages'
    };

    return (
        <div className="bg-white min-h-screen w-full">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
                    <p className="text-gray-600 text-lg">
                        Have questions about our work or want to get involved? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#0F5E36]/10 rounded-lg flex items-center justify-center text-[#0F5E36] shrink-0">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                                <p className="text-gray-600">+44 121 123 4567</p>
                                <p className="text-sm text-gray-500 mt-1">Mon-Fri 9am-5pm</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#0F5E36]/10 rounded-lg flex items-center justify-center text-[#0F5E36] shrink-0">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                                <p className="text-gray-600">info@eliarelieftrust.org</p>
                                <p className="text-sm text-gray-500 mt-1">We rely to all emails within 24h</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#0F5E36]/10 rounded-lg flex items-center justify-center text-[#0F5E36] shrink-0">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">Head Office</h3>
                                <p className="text-gray-600">123 Charity Lane,<br />Birmingham, UK</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        {submitted ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                                    <Send size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                <p className="text-gray-600">Thank you for reaching out. We will get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Your Name</label>
                                    <input type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0F5E36] outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                                    <input type="email" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0F5E36] outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Message</label>
                                    <textarea rows={4} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0F5E36] outline-none"></textarea>
                                </div>
                                <Button type="submit" className="w-full bg-[#0F5E36] hover:bg-[#0b4628] text-white font-bold py-6 text-lg shadow-lg">
                                    Send Message
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
