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
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function Login() {
  const colorScheme = useColorScheme() ?? "light";
  const { signIn, setActive, isLoaded } = useSignIn();
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState<ClerkInputFieldErrorTypes>();

  const router = useRouter();

  const handleLogin = async () => {
    if (!isLoaded) return;
    // setErrors(false);
    try {
      const signInAttempt = await signIn.create({
        identifier: credentials.identifier,
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
        console.log(JSON.stringify(err, null, 2));
        setErrors({
          ...errors,
          ...clerkErrorMapping(err),
        });
      }
    }
  };

  const handleChangeText = (name: "identifier" | "password") => (text: string) => {
    errors && setErrors({} as ClerkInputFieldErrorTypes);

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
      {/* {errors && <ErrorMessage message="Something went wrong" />} */}
      <View style={styles.formContainer}>
        <ThemedText type="title">Login here</ThemedText>
        <View style={styles.form}>
          <TextInputField
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={credentials.identifier}
            onChangeText={handleChangeText("identifier")}
            errorMessage={errors?.identifier}
          />
          <TextInputField
            placeholder="Password"
            secureTextEntry
            value={credentials.password}
            onChangeText={handleChangeText("password")}
            errorMessage={errors?.password}
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
