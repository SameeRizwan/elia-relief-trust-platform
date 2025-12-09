"use client";

import { useState, useEffect } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { CAUSES } from "@/data/mockData";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState(CAUSES);

    useEffect(() => {
        if (query.trim() === "") {
            setResults([]);
        } else {
            const lower = query.toLowerCase();
            setResults(CAUSES.filter(c => c.title.toLowerCase().includes(lower) || c.description.toLowerCase().includes(lower)));
        }
    }, [query]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-24 px-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                        <Search className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search appeals..."
                            className="flex-1 text-lg outline-none placeholder:text-gray-400"
                            autoFocus
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="max-h-[60vh] overflow-y-auto p-2">
                        {results.length === 0 && query !== "" && (
                            <p className="p-4 text-center text-gray-500">No appeals found matching "{query}"</p>
                        )}
                        {results.length === 0 && query === "" && (
                            <p className="p-4 text-center text-gray-500 text-sm">Type to start searching...</p>
                        )}

                        {results.map(cause => (
                            <Link
                                key={cause.id}
                                href={`/donate/${cause.id}`}
                                onClick={onClose}
                                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg group transition-colors"
                            >
                                <img src={cause.image} alt={cause.title} className="w-16 h-16 object-cover rounded-md" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 group-hover:text-[#0F5E36] transition-colors">{cause.title}</h4>
                                    <p className="text-xs text-gray-500 line-clamp-1">{cause.description}</p>
                                </div>
                                <ArrowRight size={16} className="text-gray-300 group-hover:text-[#0F5E36]" />
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
