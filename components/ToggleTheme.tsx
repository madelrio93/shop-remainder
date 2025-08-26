import { useState } from "react";
import { Appearance, useColorScheme } from "react-native";
import { SettingSwitchItem } from "./SettingSwitchItem";

interface ToggleThemeProps {
  switchItemTitle?: string;
}

export const ToggleTheme = ({
  switchItemTitle = "Dark Theme",
}: ToggleThemeProps) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === "dark");

  const toggleTheme = () => {
    const newScheme = isDark ? "light" : "dark";
    Appearance.setColorScheme(newScheme);
    setIsDark(!isDark);
  };

  return (
    <SettingSwitchItem
      title={switchItemTitle}
      isEnabled={isDark}
      toggleSwitch={toggleTheme}
    />
  );
};
