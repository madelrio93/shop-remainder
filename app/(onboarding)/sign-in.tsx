import { SocialConnectionsBar } from "@/components/SocialConnectionsBar";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Colors } from "@/constants/Colors";
import { fontsFamily } from "@/constants/Fonts";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
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
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<boolean>(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (!isLoaded) return;
    setErrors(false);
    try {
      const signInAttempt = await signIn.create({
        identifier: credentials.email,
        password: credentials.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });

        router.replace("/(tabs)");
      } else {
        console.log(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        setErrors(true);
      }
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handleChangeText =
    (name: "email" | "password") => (text: string) => {
      errors && setErrors(false);

      setCredentials({
        ...credentials,
        [name]: text
      })
    };

  return (
    <ThemedView
      style={[
        { backgroundColor: Colors[colorScheme].background },
        styles.container,
      ]}
    >
      {errors && <ErrorMessage />}
      <View style={styles.formContainer}>
        <ThemedText type="title">Login here</ThemedText>
        <View style={styles.form}>
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
            value={credentials.email}
            nativeID="email-input"
            onChangeText={handleChangeText("email")}
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
            value={credentials.password}
            onChangeText={handleChangeText("password")}
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

      <SocialConnectionsBar />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  formContainer: {
    width: "100%",
    marginTop: 60,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  form: {
    width: "100%",
    marginTop: 20,
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
});
