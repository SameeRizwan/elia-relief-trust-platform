"use client";

import { useState, useEffect } from "react";
import { useStripe, useElements, PaymentElement, PaymentRequestButtonElement } from "@stripe/react-stripe-js";
import { PaymentRequest } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Loader2, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function CheckoutForm({ clientSecret }: { clientSecret: string }) {
    const stripe = useStripe();
    const elements = useElements();
    const { totalAmount, items, clearCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);

    useEffect(() => {
        if (!stripe) return;

        const pr = stripe.paymentRequest({
            country: 'GB',
            currency: 'gbp',
            total: {
                label: 'Donation Total',
                amount: totalAmount * 100,
            },
            requestPayerName: true,
            requestPayerEmail: true,
        });

        // Check the availability of the Payment Request API.
        pr.canMakePayment().then((result) => {
            if (result) {
                setPaymentRequest(pr);
            }
        });

        pr.on('paymentmethod', async (ev) => {
            // Confirm the PaymentIntent with the payment method returned from the Payment Request Button
            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                { payment_method: ev.paymentMethod.id },
                { handleActions: false }
            );

            if (confirmError) {
                // Report to the browser that the payment failed, prompting it to
                // re-show the payment interface, or show an error message and close
                // the payment interface.
                ev.complete('fail');
                setMessage(confirmError.message ?? "Payment failed");
            } else {
                // Report to the browser that the confirmation was successful, prompting
                // it to close the browser payment method collection interface.
                ev.complete('success');

                // Check if the PaymentIntent requires any actions
                if (paymentIntent.status === "requires_action") {
                    // Let Stripe.js handle the rest of the payment flow.
                    const { error } = await stripe.confirmCardPayment(clientSecret);
                    if (error) {
                        setMessage(error.message ?? "Payment failed during confirmation");
                    } else {
                        // Success handled by main logic possibly, or we duplicate here?
                        // Ideally we rely on the same success logic.
                        handleSuccess(paymentIntent.id);
                    }
                } else {
                    // Success
                    handleSuccess(paymentIntent.id);
                }
            }
        });

    }, [stripe, totalAmount, clientSecret]);

    const handleSuccess = async (paymentIntentId: string) => {
        setSuccess(true);
        // Record donation in Firestore
        try {
            await addDoc(collection(db, "donations"), {
                userId: user?.uid || "guest",
                userEmail: user?.email || "guest@example.com",
                amount: totalAmount,
                items: items,
                status: "succeeded",
                stripePaymentIntentId: paymentIntentId,
                createdAt: serverTimestamp(),
            });
            console.log("Donation recorded in Firestore");
        } catch (err) {
            console.error("Error recording donation:", err);
        }
        clearCart();
        setTimeout(() => {
            router.push("/dashboard");
        }, 3000);
    };

    useEffect(() => {
        if (!stripe) return;

        const clientSecretParam = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecretParam) return;

        stripe.retrievePaymentIntent(clientSecretParam).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required", // Handle redirect manually or show success inline
        });

        if (error) {
            setMessage(error.message ?? "An unexpected error occurred.");
            setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            handleSuccess(paymentIntent.id);
        } else {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="text-center py-12">
                <CheckCircle className="mx-auto h-16 w-16 text-[#0F5E36] mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Donation Successful!</h2>
                <p className="text-gray-600 mb-6">Thank you for your generosity. May it be accepted.</p>
                <p className="text-sm text-gray-400">Redirecting to your dashboard...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {paymentRequest && (
                <div className="mb-6">
                    <PaymentRequestButtonElement options={{ paymentRequest }} />
                    <div className="relative mt-6 text-center">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Or pay with card</span>
                        </div>
                    </div>
                </div>
            )}

            <PaymentElement />

            {message && (
                <div className="p-4 bg-red-50 text-red-600 text-sm rounded-lg">
                    {message}
                </div>
            )}

            <Button
                disabled={isLoading || !stripe || !elements}
                className="w-full bg-[#0F5E36] hover:bg-[#0b4628] text-white font-bold h-12 text-lg"
            >
                {isLoading ? <Loader2 className="animate-spin mr-2" /> : `Pay £${totalAmount.toLocaleString()}`}
            </Button>
        </form>
    );
}
