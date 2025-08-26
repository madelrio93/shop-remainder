import { Colors } from "@/constants/Colors";
import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface TabBarButtonProps extends BottomTabBarButtonProps {
  icon: React.JSX.Element;
}

export const TabBarButton = ({
  icon: IconComponent,
  onPress,
  ...rest
}: TabBarButtonProps) => {
  const colorScheme = useColorScheme() ?? "light";

  const isSelected =
    Platform.OS === "android"
      ? rest["aria-selected"] ?? false
      : rest.accessibilityState?.selected ?? false;

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withSpring(isSelected ? 1 : 0, {
      damping: 15,
      stiffness: 120,
    });
  }, [isSelected, progress]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    const width = interpolate(progress.value, [0, 1], [40, 50]);
    const height = interpolate(progress.value, [0, 1], [40, 50]);
    const top = interpolate(progress.value, [0, 1], [0, -10]);
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ["transparent", Colors[colorScheme].tint]
    );

    return {
      width,
      height,
      top,
      backgroundColor,
    };
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Animated.View style={[styles.iconContainer, animatedContainerStyle]}>
        {React.cloneElement(IconComponent, {
          color: isSelected
            ? Colors[colorScheme].background
            : Colors[colorScheme].icon,
          size: isSelected ? 28 : 24,
          marginTop: !isSelected ? 12 : 0,
        })}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    position: "relative",
  },
  iconContainer: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
});
