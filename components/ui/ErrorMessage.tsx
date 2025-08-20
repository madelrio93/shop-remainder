import { StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../ThemedText";

export const ErrorMessage = () => {
  const insets = useSafeAreaInsets();

  return (
    <Animated.View
      style={[styles.errorContainer, { top: insets.top }]}
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}
    >
      <ThemedText type="default" style={{ color: "#fff" }}>
        Something went wrong, please try again.
      </ThemedText>a
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    width: "100%",
    padding: 20,
    alignItems: "center",
    backgroundColor: "#ee3847ff",
    position: "absolute",
  },
});
