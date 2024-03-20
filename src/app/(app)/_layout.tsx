import React from "react";
import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Text } from "react-native";
import { useSession } from "../../context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        initialRouteName="/"
        screenOptions={{
          headerShown: false,
          drawerType: "front",
          title: "Hoje",
        }}
      >
        <Drawer.Screen
          name="month"
          options={{
            title: "Mês",
          }}
        />
        <Drawer.Screen
          name="week"
          options={{
            title: "Semana",
          }}
        />

        <Drawer.Screen
          name="tomorrow"
          options={{
            title: "Amanhã",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
