"use client";

import { AuthProvider } from "@/context/AuthContext";

import { CartProvider } from "@/context/CartContext";
import NextTopLoader from 'nextjs-toploader';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <CartProvider>
                <NextTopLoader color="#0F5E36" showSpinner={false} />
                {children}
            </CartProvider>
        </AuthProvider>
    );
}
