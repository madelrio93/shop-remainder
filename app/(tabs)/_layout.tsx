import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function TabsLayout() {
  const { isSignedIn } = useUser();
  // If the user is not signed in, redirect to the sign-in page
  if (!isSignedIn) {
    return <Redirect href="/(onboarding)/sign-in" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Home" }} />
    </Stack>
  );
}
