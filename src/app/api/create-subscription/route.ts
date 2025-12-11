import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
    // Check if Stripe key is configured
    if (!process.env.STRIPE_SECRET_KEY) {
        console.error("STRIPE_SECRET_KEY is not configured");
        return NextResponse.json(
            { error: "Payment service not configured. Please contact support." },
            { status: 500 }
        );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2025-11-17.clover",
    });

    try {
        const { amount, email, name, items } = await request.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required for subscription" }, { status: 400 });
        }

        // 1. Find or Create Customer
        let customer;
        const existingCustomers = await stripe.customers.list({ email: email, limit: 1 });

        if (existingCustomers.data.length > 0) {
            customer = existingCustomers.data[0];
        } else {
            customer = await stripe.customers.create({
                email,
                name: name || undefined,
            });
        }

        // 2. Create a Price for the Subscription
        // In a real app, you might have fixed Price IDs. Here we create a one-off recurring price.
        const price = await stripe.prices.create({
            unit_amount: Math.round(amount * 100),
            currency: "gbp",
            recurring: { interval: "month" },
            product_data: {
                name: "Monthly Donation",
                metadata: {
                    items_summary: items?.map((i: any) => i.title).join(", ").substring(0, 500) || "Donation",
                }
            },
        });

        // 3. Create Subscription
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: price.id }],
            payment_behavior: "default_incomplete",
            payment_settings: { save_default_payment_method: "on_subscription" },
            expand: ["latest_invoice.payment_intent"],
            metadata: {
                // Add any necessary metadata
            }
        });

        if (subscription.latest_invoice && typeof subscription.latest_invoice !== 'string') {
            const invoice = subscription.latest_invoice as any;
            const paymentIntent = invoice.payment_intent;

            if (paymentIntent && typeof paymentIntent !== 'string') {
                const pi = paymentIntent as Stripe.PaymentIntent;
                return NextResponse.json({
                    clientSecret: pi.client_secret,
                    subscriptionId: subscription.id
                });
            }
        }

        return NextResponse.json({ error: "Failed to create subscription payment intent" }, { status: 500 });

    } catch (error: any) {
        console.error("Subscription Error:", error);
        return NextResponse.json(
            { error: `Internal Server Error: ${error.message}` },
            { status: 500 }
        );
    }
}
