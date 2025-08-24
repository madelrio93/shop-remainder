import { SocialConnectionsBar } from "@/components/SocialConnectionsBar";
import { TextInputField } from "@/components/TextInputField";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { fontsFamily } from "@/constants/Fonts";
import {
  clerkErrorMapping,
  ClerkInputFieldErrorTypes,
} from "@/utils/clerkErrorMapper";
import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function Register() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<
    {
      confirmPassword: string;
      apiResponse?: string;
    } & ClerkInputFieldErrorTypes
  >({
    identifier: "",
    email_address: "",
    password: "",
    confirmPassword: "",
  });
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    if (!isLoaded) return;

    if (credentials.confirmPassword !== credentials.password) {
      setErrors({
        ...errors,
        confirmPassword: "Passwords do not match",
      });
      return;
    }

    try {
      await signUp.create({
        emailAddress: credentials.email,
        password: credentials.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        setErrors({
          ...errors,
          ...clerkErrorMapping(err),
        });
      }
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/(tabs)");
      } else {
        console.log(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
    }
  };

  const handleChangeText =
    (name: "email" | "password" | "confirmPassword") => (text: string) => {
      errors && setErrors({} as any);

      setCredentials({
        ...credentials,
        [name]: text,
      });
    };

  return (
    <ThemedView
      style={[
        { backgroundColor: Colors[colorScheme].background },
        styles.container,
      ]}
    >
      {pendingVerification ? (
        <View
          style={[
            styles.formContainer,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <ThemedText type="title">Verify your email</ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: Colors[colorScheme].tint,
                color: Colors[colorScheme].text,
              },
            ]}
            placeholder="Enter your verification code"
            onChangeText={(code) => setCode(code)}
            placeholderTextColor={Colors[colorScheme].text}
            value={code}
            keyboardType="numeric"
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: Colors[colorScheme].tint },
            ]}
            onPress={onVerifyPress}
          >
            <ThemedText style={styles.buttonText}>Verify</ThemedText>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={{ width: "100%", alignItems: "center", marginTop: 60 }}>
            <ThemedText type="title">Create an account</ThemedText>
            <View style={styles.formContainer}>
              <TextInputField
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={credentials.email}
                onChangeText={handleChangeText("email")}
                errorMessage={errors.email_address}
              />
              <TextInputField
                placeholder="Password"
                secureTextEntry
                value={credentials.password}
                onChangeText={handleChangeText("password")}
                errorMessage={errors.password}
              />
              <TextInputField
                placeholder="Confirm Password"
                secureTextEntry
                value={credentials.confirmPassword}
                onChangeText={handleChangeText("confirmPassword")}
                errorMessage={errors.confirmPassword}
              />

              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: Colors[colorScheme].tint },
                ]}
                onPress={handleRegister}
              >
                <ThemedText style={styles.buttonText}>Register</ThemedText>
              </TouchableOpacity>
              <Link
                href="/(onboarding)/sign-in"
                asChild
                style={[
                  styles.button,
                  {
                    backgroundColor: "#ffff",
                    width: "100%",
                  },
                ]}
              >
                <TouchableOpacity>
                  <ThemedText
                    style={[
                      styles.buttonText,
                      {
                        color: Colors[colorScheme].text,
                        fontSize: 16,
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    Already have an account
                  </ThemedText>
                </TouchableOpacity>
              </Link>
            </View>
          </View>

          <SocialConnectionsBar />
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 10,
  },
  formContainer: {
    width: "100%",
    marginTop: 10,
    padding: 20,
    gap: 20,
  },
  input: {
    width: "100%",
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
    width: "100%",
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
