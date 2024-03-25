import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import { Platform, View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const BaseContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? insets.top : 0,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
      >
        <StatusBar
          backgroundColor="transparent"
          style={Platform.OS === "ios" ? "dark" : "light"}
          animated
        />
        {children}
      </View>
    </SafeAreaProvider>
  );
};

export default BaseContainer;
