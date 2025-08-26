import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { Switch, useColorScheme, View } from "react-native";

interface SettingSwitchItemProps {
  title: string;
  isEnabled: boolean;
  toggleSwitch: () => void;
}

export const SettingSwitchItem = ({
  title,
  isEnabled,
  toggleSwitch,
}: SettingSwitchItemProps) => {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <ThemedText style={{ fontSize: 14 }}>{title}</ThemedText>

      <Switch
        trackColor={{
          false: "#767577",
          true: Colors[colorScheme].secondary,
        }}
        thumbColor={isEnabled ? Colors[colorScheme].tint : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{ height: 25 }}
        accessibilityRole="switch"
      />
    </View>
  );
};
