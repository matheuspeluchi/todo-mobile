import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const BaseContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        style="light"
        animated
      />
      {children}
    </View>
  );
};

export default BaseContainer;
