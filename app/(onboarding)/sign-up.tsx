import { SocialConnectionsBar } from "@/components/SocialConnectionsBar";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Colors } from "@/constants/Colors";
import { fontsFamily } from "@/constants/Fonts";
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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<boolean>(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    if (!isLoaded) return;

    try {
      const data = await signUp.create({
        emailAddress: credentials.email,
        password: credentials.password,
      });

      console.log({ data });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        setErrors(true);
      }

      console.error(JSON.stringify(err, null, 2));
    }
    console.log("Registering with:", credentials.email, credentials.password);
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

  const handleChangeText = (name: "email" | "password") => (text: string) => {
    errors && setErrors(false);

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
      {errors && <ErrorMessage />}
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
                onChangeText={handleChangeText("email")}
                keyboardType="email-address"
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
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: Colors[colorScheme].tint,
                    color: Colors[colorScheme].text,
                  },
                ]}
                placeholder="Confirm Password"
                placeholderTextColor={Colors[colorScheme].text}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
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
    // marginTop: 60,
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
