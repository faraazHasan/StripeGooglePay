import {
  PlatformPayButton,
  usePlatformPay,
  PlatformPay,
} from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

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

export const ApplePay: React.FC = () => {
  const { isPlatformPaySupported, confirmPlatformPayPayment } =
    usePlatformPay();
  const [isApplePaySupported, setIsApplePaySupported] = useState(false);

  useEffect(() => {
    (async function () {
      setIsApplePaySupported(await isPlatformPaySupported());
    })();
  }, [isPlatformPaySupported]);

  const pay = async () => {
    try {
      const clientSecret = await fetchPaymentIntentClientSecret();
      const { error } = await confirmPlatformPayPayment(clientSecret, {
        applePay: {
          cartItems: [
            {
              label: "Example item name",
              amount: "14.00",
              paymentType: PlatformPay.PaymentType.Immediate,
            },
            {
              label: "Total",
              amount: "12.75",
              paymentType: PlatformPay.PaymentType.Immediate,
            },
          ],
          merchantCountryCode: "US",
          currencyCode: "USD",
          requiredShippingAddressFields: [
            PlatformPay.ContactField.PostalAddress,
          ],
          requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
        },
      });
      if (error) {
        // handle error
      } else {
        Alert.alert("Success", "Check the logs for payment intent details.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during payment.");
      console.error("Payment error:", error);
    }
  };

  return (
    <View>
      {isApplePaySupported && (
        <PlatformPayButton
          onPress={pay}
          type={PlatformPay.ButtonType.Order}
          appearance={PlatformPay.ButtonStyle.Black}
          borderRadius={4}
          style={{
            width: "100%",
            height: 50,
          }}
        />
      )}
    </View>
  );
};
