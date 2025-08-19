import { Colors } from "@/constants/Colors";
import { fontsFamily } from "@/constants/Fonts";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme
} from "react-native";
import { ThemedText } from "./ThemedText";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const colorScheme = useColorScheme() ?? "light";
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log("Signed out successfully");

      router.replace("/(onboarding)/sign-in");
      
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          borderWidth: 2,
          borderColor: Colors[colorScheme].tint,
        },
      ]}
      onPress={handleSignOut}
    >
      <ThemedText
        type="defaultSemiBold"
        style={[styles.buttonText, { color: Colors[colorScheme].tint }]}
      >
        Logout
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#CBD6FF",
    shadowOffset: { width: -1, height: 11 },
    shadowOpacity: 1,
    shadowRadius: 19,
    elevation: 19,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    fontFamily: fontsFamily.regular,
  },
});