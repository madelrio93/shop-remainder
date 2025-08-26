import { SignOutButton } from "@/components/SignOutButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@clerk/clerk-expo";
import { StyleSheet } from "react-native";

export default function Settings() {
  const { user } = useUser();

  return (
    <ThemedView style={styles.container} safe>
      <ThemedText type="subtitle">
        Welcome, {user?.fullName || user?.emailAddresses[0]?.emailAddress}!
      </ThemedText>
      <SignOutButton />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
