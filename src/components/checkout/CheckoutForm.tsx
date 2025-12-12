"use client";

import { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
    ExpressCheckoutElement
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function CheckoutForm({ amount, donationType, clientSecret }: { amount: number, donationType: 'one-time' | 'monthly', clientSecret: string }) {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const redirectClientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!redirectClientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(redirectClientSecret).then(({ paymentIntent }) => {
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

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/checkout/success?donation_type=${donationType}`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message || "An unexpected error occurred.");
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions: any = {
        layout: "tabs",
    };

    const expressCheckoutOptions = {
        buttonTheme: {
            applePay: 'black',
            googlePay: 'black',
        },
        buttonType: {
            applePay: 'plain',
            googlePay: 'plain',
        },
        wallets: {
            applePay: 'always',
            googlePay: 'always',
        },
        layout: {
            maxColumns: 1,
            maxRows: 0,
        }
    } as const;

    return (
    const [elementsReady, setElementsReady] = useState({ payment: false, express: false });
    const isReady = elementsReady.payment && elementsReady.express;

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-6 relative min-h-[300px]">
            {/* Global Loader until both are ready */}
            {!isReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-50">
                    <Loader2 className="animate-spin text-[#0F5E36]" size={48} />
                </div>
            )}

            <div className={!isReady ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}>
                <PaymentElement
                    id="payment-element"
                    options={paymentElementOptions}
                    onReady={() => setElementsReady(prev => ({ ...prev, payment: true }))}
                />

                <Button
                    disabled={isLoading || !stripe || !elements || !isReady}
                    id="submit"
                    className="w-full bg-[#0F5E36] hover:bg-[#0b4628] h-12 text-lg font-bold mt-6"
                >
                    {isLoading ? <Loader2 className="animate-spin mr-2" /> : `Pay £${amount.toLocaleString()}`}
                </Button>
                {message && <div id="payment-message" className="text-red-500 text-sm mt-2">{message}</div>}

                {/* Express Checkout Element (Apple Pay, Google Pay) */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                    <ExpressCheckoutElement
                        options={expressCheckoutOptions}
                        onReady={() => setElementsReady(prev => ({ ...prev, express: true }))}
                        onConfirm={async (event) => {
                            if (!stripe || !elements) return;

                            const { error } = await stripe.confirmPayment({
                                elements,
                                clientSecret: clientSecret,
                                confirmParams: {
                                    return_url: `${window.location.origin}/checkout/success?donation_type=${donationType}`,
                                },
                            });

                            if (error) {
                                setMessage(error.message || "Payment failed");
                            }
                        }} />
                </div>
            </div>
        </form>
    );
}
