import { fontsFamily } from "@/constants/Fonts";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

import { SplashScreen } from "@/components/SplashScreen";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    [fontsFamily.regular]: require("../assets/fonts/Poppins-Regular.ttf"),
    [fontsFamily.medium]: require("../assets/fonts/Poppins-Medium.ttf"),
    [fontsFamily.bold]: require("../assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded || !isAppReady) {
    return (
      <SplashScreen
        onFinish={(isCancelled) => !isCancelled && setIsAppReady(true)}
      />
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="+not-found" /> */}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
