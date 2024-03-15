import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const BaseContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="black" translucent style="light" animated />
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default BaseContainer;
