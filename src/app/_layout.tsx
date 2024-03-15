import { SplashScreen, Slot } from "expo-router";
import { useEffect } from "react";
import * as Font from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, fontError] = Font.useFonts({
    Lato: require("../../assets/fonts/Lato.ttf"),
    RobotoBlack: require("../../assets/fonts/Roboto-Black.ttf"),
    RobotoBlackItalic: require("../../assets/fonts/Roboto-BlackItalic.ttf"),
    RobotoBold: require("../../assets/fonts/Roboto-Bold.ttf"),
    RobotoRegular: require("../../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../../assets/fonts/Roboto-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Render the children routes now that all the assets are loaded.
  return <Slot />;
}
