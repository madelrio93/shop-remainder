import { Colors } from "@/constants/Colors";
import {
    StyleSheet,
    TextInput,
    TextInputProps,
    useColorScheme,
    View,
} from "react-native";
import { ThemedText } from "./ThemedText";

interface TextInputFieldProps extends TextInputProps {
  errorMessage?: string;
}

export const TextInputField = ({
  errorMessage,
  ...props
}: TextInputFieldProps) => {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <View>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: Colors[colorScheme][!errorMessage ? "tint" : "error"],
            color: Colors[colorScheme][!errorMessage ? "tint" : "error"],
          },
        ]}
        placeholderTextColor={Colors[colorScheme].text}
        {...props}
      />
      {!!errorMessage && (
        <ThemedText style={{ color: Colors[colorScheme].error }}>
          {errorMessage}
        </ThemedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});
