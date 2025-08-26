import { TabBarButton } from "@/components/ui/TabBarButton";
import { Colors } from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { AntDesign } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Redirect, Tabs } from "expo-router";
import React from "react";

import { useColorScheme } from "react-native";

const tabs = [
  {
    name: "shop-list",
    title: "Shop Remainder List",
    headerShow: false,
    icon: <Feather name="list" />,
  },
  {
    name: "scan-receipt",
    title: "Scan",
    headerShow: false,
    icon: <AntDesign name="scan1" />,
  },
  {
    name: "index",
    title: "Home",
    headerShow: false,
    icon: <AntDesign name="home" />,
  },
  {
    name: "history",
    title: "History",
    headerShow: false,
    icon: <MaterialIcons name="history" />,
  },
  {
    name: "settings",
    title: "Settings",
    headerShow: true,
    icon: <AntDesign name="setting" />,
  },
];

export default function TabsLayout() {
  const { isSignedIn } = useUser();
  const colorScheme = useColorScheme() ?? "light";

  if (!isSignedIn) {
    return <Redirect href="/(onboarding)/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor:
            Colors[colorScheme][colorScheme === "light" ? "white" : "black"],
        },
        headerTintColor: Colors[colorScheme].text,
        sceneStyle: {
          backgroundColor: Colors[colorScheme].background,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            // tabBarShowLabel: false,
            headerShown: tab.headerShow,
            headerStyle: {
              backgroundColor: Colors[colorScheme].background,
            },
            headerTintColor: Colors[colorScheme].text,
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            tabBarButton: (props) => (
              <TabBarButton {...props} icon={tab.icon} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
