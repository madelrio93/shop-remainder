import { Colors } from "@/constants/Colors";
import { useSSO, useUser } from "@clerk/clerk-expo";
import AntDesignIcons from "@expo/vector-icons/AntDesign";
import * as Linking from "expo-linking";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    useColorScheme,
} from "react-native";

interface SocialConnectionsButtonProps {
  strategy: "facebook" | "google" | "apple";
}

type AntDesignIconName = "facebook-square" | "google" | "apple1";

const getAntDesignIconName = (strategy: string): AntDesignIconName => {
  switch (strategy) {
    case "facebook":
      return "facebook-square";
    case "google":
      return "google";
    case "apple":
      return "apple1";
    default:
      return "google";
  }
};

const getStrategy = (strategy: string) => {
  switch (strategy) {
    case "facebook":
      return "oauth_facebook";
    case "google":
      return "oauth_google";
    case "apple":
      return "oauth_apple";
    default:
      return "oauth_google";
  }
};

export const SocialConnectionsButton = ({
  strategy,
}: SocialConnectionsButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme() ?? "light";
  const { startSSOFlow } = useSSO();
  const { user } = useUser();

  const onSocialLoginPress = useCallback(async () => {
    try {
      setIsLoading(true);
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: getStrategy(strategy),
        redirectUrl: Linking.createURL("/(onboarding)/sign-in"),
      });

      if (createdSessionId) {
        if (setActive) {
          await setActive({ session: createdSessionId });
        } else {
          console.warn("setActive is undefined.");
        }

        await user?.reload();
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  }, [user, strategy, startSSOFlow]);

  return (
    <TouchableOpacity onPress={onSocialLoginPress} disabled={isLoading} style={styles.linkIcon}>
      {isLoading ? (
        <ActivityIndicator size={24} color={Colors[colorScheme].tint} />
      ) : (
        <AntDesignIcons
          name={getAntDesignIconName(strategy) as any}
          size={24}
          style={{ color: Colors[colorScheme].tint }}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkIcon: {
    backgroundColor: "#ECECEC",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
