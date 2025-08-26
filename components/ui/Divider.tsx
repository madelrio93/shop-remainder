import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

export const Divider = ({ style }: { style: StyleProp<ViewStyle> }) => {
  return <View style={[styles.divider, style]} />;
};

const styles = StyleSheet.create({
  divider: {
    backgroundColor: "#e0e0e0",
    height: 1,
    width: "100%",
  },
});
