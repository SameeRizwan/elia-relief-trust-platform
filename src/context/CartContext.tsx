"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
    id: string;
    title: string;
    amount: number;
    type: "single" | "monthly";
};

interface CartContextType {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    totalAmount: number;
    itemCount: number;
    isLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("donation_cart");
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("donation_cart", JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addToCart = (newItem: CartItem) => {
        setItems(prev => {
            // Check if item exists, if so update amount
            const existing = prev.find(i => i.id === newItem.id && i.type === newItem.type);
            if (existing) {
                return prev.map(i =>
                    (i.id === newItem.id && i.type === newItem.type)
                        ? { ...i, amount: i.amount + newItem.amount }
                        : i
                );
            }
            return [...prev, newItem];
        });
    };

    const removeFromCart = (id: string) => {
        setItems(prev => prev.filter(i => i.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
    const itemCount = items.length;

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, totalAmount, itemCount, isLoaded }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
