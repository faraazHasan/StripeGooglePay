import {
  PlatformPayButton,
  usePlatformPay,
  PlatformPay,
} from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";

const fetchPaymentIntentClientSecret = async () => {
  // Fetch payment intent created on the server, see above
  const response = await fetch("http://10.0.2.2:3002/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currency: "usd",
    }),
  });
  const { client_secret, customer } = await response.json();

  return client_secret;
};

export const GooglePay: React.FC = () => {
  const { isPlatformPaySupported, confirmPlatformPayPayment } =
    usePlatformPay();
  const [isGooglePaySupported, setIsGooglePaySupported] = useState(false);
  useEffect(() => {
    (async function () {
      setIsGooglePaySupported(
        await isPlatformPaySupported({ googlePay: { testEnv: true } })
      );
    })();
  }, [isPlatformPaySupported]);

  const pay = async () => {
    try {
      const client_secret = await fetchPaymentIntentClientSecret();
      if (!client_secret) return;

      const { error } = await confirmPlatformPayPayment(client_secret, {
        googlePay: {
          testEnv: true,
          merchantName: "com.stripe_app",
          merchantCountryCode: "US",
          currencyCode: "USD",
          billingAddressConfig: {
            format: PlatformPay.BillingAddressFormat.Full,
            isPhoneNumberRequired: true,
            isRequired: true,
          },
        },
      });

      if (error) {
        Alert.alert("Payment Error", error.message);
        return;
      }
      Alert.alert("Success", "The payment was confirmed successfully.");
    } catch (error) {
      Alert.alert("Error", "An error occurred during payment.");
      console.error("Payment error:", error);
    }
  };

  return (
    <View>
      {isGooglePaySupported && (
        <PlatformPayButton
          type={PlatformPay.ButtonType.Pay}
          onPress={pay}
          style={{
            width: "100%",
            height: 50,
          }}
        />
      )}
    </View>
  );
};
