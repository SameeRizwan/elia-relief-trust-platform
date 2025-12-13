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

        if (subscription.status === 'active') {
            // Subscription is already active (maybe 0 check or trial? Unlikely here but possible)
            // or paid immediately with existing customer options.
            // But we usually want to force a payment flow for 3DS or new card.
            // existingCustomers might have valid card.
            // If active, we might not need a client secret, but return one if PI exists for confirmation.
            console.log("Subscription automatically active/paid:", subscription.id);
        }

        let paymentIntent: string | Stripe.PaymentIntent | null | undefined;
        let invoice: Stripe.Invoice | string | null | undefined = subscription.latest_invoice;

        if (invoice && typeof invoice === 'string') {
            // Fallback: If expansion failed or returned ID, retrieve manually
            console.log("Retrieving invoice manually:", invoice);
            invoice = await stripe.invoices.retrieve(invoice, {
                expand: ['payment_intent']
            });
        }

        if (invoice && typeof invoice !== 'string') {
            console.log("Invoice status:", invoice.status, "ID:", invoice.id);

            // If invoice is draft, finalize it
            if (invoice.status === 'draft') {
                console.log("Finalizing draft invoice...");
                invoice = await stripe.invoices.finalizeInvoice(invoice.id, { expand: ['payment_intent'] });
            }

            paymentIntent = (invoice as any).payment_intent;

            // If invoice is open but has NO payment_intent, create one manually
            if (!paymentIntent && invoice.status === 'open' && invoice.amount_remaining > 0) {
                console.log("No PaymentIntent on open invoice. Creating one manually...");

                const newPaymentIntent = await stripe.paymentIntents.create({
                    amount: invoice.amount_remaining,
                    currency: invoice.currency,
                    customer: customer.id,
                    metadata: {
                        invoice_id: invoice.id,
                        subscription_id: subscription.id
                    },
                    // Setting up for future payments
                    setup_future_usage: 'off_session',
                    // Automatic payment methods
                    automatic_payment_methods: {
                        enabled: true,
                    },
                });

                paymentIntent = newPaymentIntent;
            } else if (paymentIntent && typeof paymentIntent === 'string') {
                // Fallback: Retrieve PI if still string
                console.log("Retrieving PI manually:", paymentIntent);
                paymentIntent = await stripe.paymentIntents.retrieve(paymentIntent);
            }
        }

        if (paymentIntent && typeof paymentIntent !== 'string') {
            return NextResponse.json({
                clientSecret: paymentIntent.client_secret,
                subscriptionId: subscription.id
            });
        }

        // If we are here, we failed to get a PI.
        // Check if invoice is paid (amount_remaining=0)
        if (invoice && typeof invoice !== 'string' && invoice.status === 'paid') {
            return NextResponse.json({
                message: "Subscription created and paid previously",
                subscriptionId: subscription.id,
                status: 'succeeded'
            });
        }

        console.error("Failed to extract payment intent. Subscription:", subscription.id, "Invoice:", JSON.stringify(invoice));
        return NextResponse.json({
            error: "Failed to create subscription payment intent. " + (invoice && typeof invoice !== 'string' ? `Invoice status: ${invoice.status}` : "")
        }, { status: 500 });

    } catch (error: any) {
        console.error("Subscription Error:", error);
        return NextResponse.json(
            { error: `Internal Server Error: ${error.message}` },
            { status: 500 }
        );
    }
}
