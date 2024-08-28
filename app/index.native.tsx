import { Alert, Text, Image, StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";

import { PaymentSheetConfig } from "./../types";
import {
  initPaymentSheet as nativeInitPaymentSheet,
  presentPaymentSheet as nativePresentPaymentSheet,
} from "@stripe/stripe-react-native";

export const initPaymentSheet = async (
  paymentSheetConfig: PaymentSheetConfig
) => {
  return await nativeInitPaymentSheet(paymentSheetConfig);
};

export const presentPaymentSheet = async () => {
  return await nativePresentPaymentSheet();
};
import { ApplePay } from "@/components/ApplePay";
import { GooglePay } from "@/components/Googlepay";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <GooglePay />
      {/* <ApplePay /> */}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
