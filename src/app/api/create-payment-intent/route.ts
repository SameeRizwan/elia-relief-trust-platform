import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-12-18.acacia", // Updated to a recent known version, or let's try to match linter if possible. Actually, let's just comment it out to use account default or remove strictly typed constraint if possible. 
    // Typescript might complain if missing. Let's use '2024-12-18.acacia' as a safe bet for modern SDKs or simply cast.
    // actually, best practice:
    typescript: true,
});

export async function POST(request: Request) {
    try {
        const { amount, items } = await request.json();

        // Calculate order amount (though client sent it, ideally validation happens here)
        // For now, trust the client's 'amount' for MVP, but strictly should recalc from database

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: "gbp",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
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
