import React, { useCallback } from "react";
import TaskList from "./views/tasklist";
import { StyleSheet, View, StatusBar } from "react-native";
import * as Font from "expo-font";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
const App: React.FC = () => {
  const [fontsLoaded] = Font.useFonts({
    Lato: require("../assets/fonts/Lato.ttf"),
  });

  return (
    <>
      {fontsLoaded && (
        <View style={styles.root}>
          <StatusBar
            backgroundColor="transparent"
            translucent
            barStyle="light-content"
          />
          <TaskList />
        </View>
      )}
    </>
  );
};

export default App;
