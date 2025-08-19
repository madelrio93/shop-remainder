import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { fontsFamily } from "@/constants/Fonts";
import { useSignIn } from "@clerk/clerk-expo";
import AntDesignIcons from "@expo/vector-icons/AntDesign";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function Login() {
  const colorScheme = useColorScheme() ?? "light";
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });

        router.replace("/(tabs)");
      } else {
        console.log(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ThemedView
      style={[
        { backgroundColor: Colors[colorScheme].background },
        styles.container,
      ]}
    >
      <View style={{ width: "100%", alignItems: "center" }}>
        <ThemedText type="title">Login here</ThemedText>
        <View style={styles.formContainer}>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: Colors[colorScheme].tint,
                color: Colors[colorScheme].text,
              },
            ]}
            placeholder="Email"
            placeholderTextColor={Colors[colorScheme].text}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            style={[
              styles.input,
              {
                borderColor: Colors[colorScheme].tint,
                color: Colors[colorScheme].text,
              },
            ]}
            placeholder="Password"
            placeholderTextColor={Colors[colorScheme].text}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity>
            <ThemedText
              type="defaultSemiBold"
              style={{
                textAlign: "right",
                color: Colors[colorScheme].text,
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              Forgot your password?
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: Colors[colorScheme].tint,
              },
            ]}
            onPress={handleLogin}
          >
            <ThemedText style={styles.buttonText}>Sign in</ThemedText>
          </TouchableOpacity>
          <Link
            href="/(onboarding)/sign-up"
            asChild
            style={[
              styles.button,
              {
                backgroundColor: "#ffff",
              },
            ]}
          >
            <TouchableOpacity>
              <ThemedText
                style={[
                  styles.buttonText,
                  {
                    color: Colors[colorScheme].tint,
                    fontSize: 16,
                    fontWeight: "bold",
                  },
                ]}
              >
                Create new account
              </ThemedText>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View style={{ gap: 10, marginTop: 20, alignItems: "center" }}>
        <ThemedText
          style={[{ color: Colors[colorScheme].text }, styles.linkIconTitle]}
        >
          Or continue with
        </ThemedText>

        <View style={styles.linksIconContainer}>
          <AntDesignIcons name="google" size={24} style={styles.linkIcon} />
          <AntDesignIcons
            name="facebook-square"
            size={24}
            style={styles.linkIcon}
          />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: 60,
    gap: 10,
  },
  formContainer: {
    width: "100%",
    marginTop: 40,
    padding: 20,
    gap: 20,
  },
  input: {
    height: 64,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: "#F1F4FF",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
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
  linkIconTitle: {
    fontWeight: "semibold",
    fontSize: 14,
    fontFamily: fontsFamily.medium,
  },
  linksIconContainer: {
    flexDirection: "row",
    gap: 10,
  },
  linkIcon: {
    backgroundColor: "#ECECEC",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
