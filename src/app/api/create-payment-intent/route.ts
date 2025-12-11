import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-11-17.clover",
    // typescript: true,
});

export async function POST(request: Request) {
    try {
        const { amount, items, email, name } = await request.json();

        // Calculate order amount (though client sent it, ideally validation happens here)
        // For now, trust the client's 'amount' for MVP, but strictly should recalc from database

        let customerId: string | undefined;

        if (email) {
            const existingCustomers = await stripe.customers.list({ email: email, limit: 1 });
            if (existingCustomers.data.length > 0) {
                customerId = existingCustomers.data[0].id;
            } else {
                const customer = await stripe.customers.create({
                    email,
                    name: name || undefined,
                });
                customerId = customer.id;
            }
        }

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: "gbp",
            customer: customerId,
            // Restrict to 'card' to remove Revolut/Amazon Pay but keep Google/Apple Pay (wallets included in card)
            // payment_method_types: ['card'],
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                // Add useful metadata about the donation
                items_summary: items.map((i: any) => i.title).join(", ").substring(0, 500),
            },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error: any) {
        console.error("Internal Error:", error);
        return NextResponse.json(
            { error: `Internal Server Error: ${error.message}` },
            { status: 500 }
        );
    }
}
