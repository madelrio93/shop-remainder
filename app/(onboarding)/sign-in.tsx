import { SocialConnectionsBar } from "@/components/SocialConnectionsBar";
import { TextInputField } from "@/components/TextInputField";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { fontsFamily } from "@/constants/Fonts";
import { clerkErrorMapping } from "@/utils/clerkErrorMapper";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

type Credentials = {
  identifier: string;
  password: "";
};

type SignInErrors = Partial<Record<keyof Credentials | "api", string>>;

export default function Login() {
  const colorScheme = useColorScheme() ?? "light";
  const { signIn, setActive, isLoaded } = useSignIn();
  const [credentials, setCredentials] = useState<Credentials>({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState<SignInErrors>({});

  const router = useRouter();

  const handleLogin = async () => {
    if (!isLoaded) return;
    setErrors({});
    try {
      const signInAttempt = await signIn.create({
        identifier: credentials.identifier,
        password: credentials.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId! });

        router.replace("/(tabs)");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        setErrors({ api: "An unexpected error occurred." });
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        const mappedErrors = clerkErrorMapping(err);
        const newErrors: SignInErrors = {};
        if (mappedErrors.identifier)
          newErrors.identifier = mappedErrors.identifier;
        if (mappedErrors.password) newErrors.password = mappedErrors.password;
        if (Object.keys(newErrors).length === 0) {
          newErrors.api =
            err.errors[0]?.longMessage ??
            "Invalid credentials. Please try again.";
        }
        setErrors(newErrors);
      } else {
        console.error(JSON.stringify(err, null, 2));
        setErrors({ api: "An unknown error occurred. Please try again." });
      }
    }
  };

  const handleCredentialChange =
    (field: keyof Credentials) => (text: string) => {
      setCredentials({
        ...credentials,
        [field]: text,
      });

      if (errors[field] || errors.api) {
        setErrors((prev) => ({ ...prev, [field]: undefined, api: undefined }));
      }
    };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.formContainer}>
        <ThemedText type="title">Login here</ThemedText>
        <View style={styles.form}>
          <TextInputField
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={credentials.identifier}
            onChangeText={handleCredentialChange("identifier")}
            errorMessage={errors?.identifier}
          />
          <TextInputField
            placeholder="Password"
            secureTextEntry
            value={credentials.password}
            onChangeText={handleCredentialChange("password")}
            errorMessage={errors?.password}
          />
          <TouchableOpacity>
            <ThemedText
              type="defaultSemiBold"
              style={[
                styles.forgotPassword,
                { color: Colors[colorScheme].text },
              ]}
            >
              Forgot your password?
            </ThemedText>
          </TouchableOpacity>
          {errors.api && (
            <ThemedText style={styles.apiError}>{errors.api}</ThemedText>
          )}
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: Colors[colorScheme].tint },
            ]}
            onPress={handleLogin}
          >
            <ThemedText style={styles.buttonText}>Sign in</ThemedText>
          </TouchableOpacity>
          <Link
            href="/(onboarding)/sign-up"
            asChild
            style={[styles.button, styles.secondaryButton]}
          >
            <TouchableOpacity>
              <ThemedText
                style={[
                  styles.buttonText,
                  styles.secondaryButtonText,
                  { color: Colors[colorScheme].tint },
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
  forgotPassword: {
    textAlign: "right",
    fontSize: 14,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#fff",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  apiError: {
    color: "red",
    textAlign: "center",
  },
});
