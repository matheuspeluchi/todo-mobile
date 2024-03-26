import CustomDrawerContent from "@/components/customDrawerContent";
import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { useSession } from "../../context";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

export type RootParamList = {
  [key: string]: undefined;
};

export default function AppLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return (
      <ActivityIndicator
        animating={true}
        size="large"
        color={MD2Colors.red800}
      />
    );
  }
  if (!session) {
    return <Redirect href="/login/" />;
  }
  const { colors } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props: any) => <CustomDrawerContent {...props} />}
        initialRouteName="/"
        screenOptions={{
          headerShown: false,
          drawerType: "front",
          drawerLabelStyle: {
            fontFamily: "Roboto",
            fontSize: 20,
            color: colors.primary,
          },

          drawerActiveTintColor: colors.secondary,
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Hoje",
            title: "Hoje",
          }}
        />
        <Drawer.Screen
          name="tomorrow"
          options={{
            title: "Amanhã",
          }}
        />
        <Drawer.Screen
          name="week"
          options={{
            title: "Semana",
          }}
        />
        <Drawer.Screen
          name="month"
          options={{
            title: "Mês",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
