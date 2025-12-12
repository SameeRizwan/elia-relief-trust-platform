"use client";

import { useEffect, useState } from "react";
import {
    PaymentRequestButtonElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ExpressDonationButtonProps {
    amount: number;
    clientSecret: string;
    onSuccess?: () => void;
}

export function ExpressDonationButton({ amount, clientSecret, onSuccess }: ExpressDonationButtonProps) {
    const stripe = useStripe();
    const router = useRouter();
    const [paymentRequest, setPaymentRequest] = useState<any>(null);
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        if (!stripe || !amount) return;

        const pr = stripe.paymentRequest({
            country: 'GB',
            currency: 'gbp',
            total: {
                label: 'Donation Total',
                amount: Math.round(amount * 100),
            },
            requestPayerName: true,
            requestPayerEmail: true,
            requestPayerPhone: true,
        });

        pr.canMakePayment().then((result) => {
            if (result) {
                setPaymentRequest(pr);
                setIsAvailable(true);
            }
        });

        // Handle the payment
        pr.on('paymentmethod', async (ev) => {
            // We have the clientSecret props passed down (from an intent created with amount but no user details yet)

            // Confirm the PaymentIntent with the method gathered
            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                { payment_method: ev.paymentMethod.id },
                { handleActions: false }
            );

            if (confirmError) {
                // Report to the browser that the payment failed
                ev.complete('fail');
                console.error("Express Pay Error:", confirmError);
            } else {
                // Report success
                ev.complete('success');

                // Final confirmation step if needed (server-side confirm is essentially robust, 
                // but client-side needs to handle next actions if any, though confirmCardPayment handles it usually).
                // Check if we need to handle actions

                const { error, paymentIntent: finalIntent } = await stripe.confirmCardPayment(clientSecret);

                if (finalIntent && finalIntent.status === 'succeeded') {
                    if (onSuccess) {
                        onSuccess();
                    } else {
                        // Default Redirect
                        router.push("/checkout/success?donation_type=one-time");
                    }
                } else if (error) {
                    console.error("Final confirm error", error);
                }
            }
        });

    }, [stripe, amount, clientSecret, router, onSuccess]);

    if (!isAvailable) {
        return null;
    }

    return (
        <div className="w-full mb-6">
            <PaymentRequestButtonElement options={{ paymentRequest }} />
            <div className="relative mt-6 mb-2">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">Or continue manually</span>
                </div>
            </div>
        </div>
    );
}
