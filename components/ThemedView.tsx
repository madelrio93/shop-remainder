import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
  safe?: boolean;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  safe,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const insets = useSafeAreaInsets();

  const paddingStyle = !safe
    ? {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }
    : undefined;

  return (
    <View style={[{ backgroundColor }, paddingStyle, style]} {...otherProps} />
  );
}
