import { SettingSwitchItem } from "@/components/SettingSwitchItem";
import { SignOutButton } from "@/components/SignOutButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ToggleTheme } from "@/components/ToggleTheme";
import { Divider } from "@/components/ui/Divider";
import { Colors } from "@/constants/Colors";
import { fontsFamily } from "@/constants/Fonts";
import { useUser } from "@clerk/clerk-expo";
import { Image, StyleSheet, useColorScheme, View } from "react-native";

export default function Settings() {
  const { user } = useUser();
  const colorScheme = useColorScheme() ?? "light";

  return (
    <ThemedView style={styles.container}>
      <View style={{ flex: 1, gap: 15 }}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: user?.imageUrl }} style={styles.profileImage} />
          <View>
            <ThemedText
              type="title"
              style={[
                {
                  color: Colors[colorScheme].text,
                  fontFamily: fontsFamily.bold,
                },
                styles.profileTitle,
              ]}
            >
              {user?.fullName}
            </ThemedText>
            <ThemedText
              style={[{ color: Colors[colorScheme].text, fontSize: 14 }]}
            >
              {user?.emailAddresses[0]?.emailAddress}
            </ThemedText>
          </View>
        </View>

        <View
          style={{
            backgroundColor: Colors[colorScheme].piperBackground,
            flex: 1,
            gap: 10,
            borderRadius: 20,
          }}
        >
          <View style={{ gap: 4, paddingHorizontal: 15, marginTop: 10 }}>
            <ThemedText type="title" style={{ fontSize: 18 }}>
              Notifications & Reminders
            </ThemedText>

            <View style={{ gap: 10 }}>
              <SettingSwitchItem
                title="Shopping Remainders"
                isEnabled
                toggleSwitch={() => {}}
              />
            </View>
          </View>

          <Divider style={{ marginTop: 5 }} />

          <View style={{ gap: 4, paddingHorizontal: 15 }}>
            <ThemedText type="title" style={{ fontSize: 18 }}>
              App Settings
            </ThemedText>

            <View style={{ gap: 10 }}>
              <ToggleTheme />
            </View>
          </View>
        </View>
      </View>

      <SignOutButton />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flex: 1,
    justifyContent: "space-between",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
