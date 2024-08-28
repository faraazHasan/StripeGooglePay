import {
  StripePaymentIntentRequestBody,
  StripePaymentIntentResponse,
} from "@/types";

export async function createPaymentIntentClientSecret({
  amount,
  currency,
}: StripePaymentIntentRequestBody): Promise<StripePaymentIntentResponse> {
  try {
    const response = await fetch("http://localhost:3002/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency,
      }),
    });
    const { client_secret, customer } = await response.json();
    if (!client_secret || !customer) {
      const errorMessage = "Could not get clientSecret or customer from Stripe";
      throw new Error(errorMessage);
    }

    return { clientSecret: client_secret, customer: customer };
  } catch (error) {
    return {
      clientSecret: null,
      customer: null,
    };
  }
}
