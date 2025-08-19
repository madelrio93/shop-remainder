import { SocialConnectionsButton } from "@/components/SocialConnectionsButton";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { fontsFamily } from "@/constants/Fonts";
import { StyleSheet, useColorScheme, View } from "react-native";

export const SocialConnectionsBar = () => {
  const colorScheme = useColorScheme() ?? "light";
  return (
    <View style={{ gap: 10, marginTop: 20, alignItems: "center" }}>
      <ThemedText
        style={[{ color: Colors[colorScheme].text }, styles.linkIconTitle]}
      >
        Or continue with
      </ThemedText>

      <View style={styles.linksIconContainer}>
        <SocialConnectionsButton strategy="google" />
        <SocialConnectionsButton strategy="facebook" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  linkIconTitle: {
    fontWeight: "semibold",
    fontSize: 14,
    fontFamily: fontsFamily.medium,
  },
  linksIconContainer: {
    flexDirection: "row",
    gap: 10,
  },
});