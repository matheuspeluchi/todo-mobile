import 'dotenv/config';

const appConfig = {
  "expo": {
    "name": "Todo",
    "slug": "todo",
    "scheme": "todo",
    "version": "1.1.2",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "experiments": {
      "tsconfigPaths": true,
      "typedRoutes": true
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.matheuspeluchi.todo"
    },
    "android": {
      "compileSdkVersion": 35,
      "targetSdkVersion": 35,
      "googleServicesFile": process.env.GOOGLE_SERVICES_JSON,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.matheuspeluchi.todo"
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    },
    "plugins": [
      "expo-router",
      "expo-secure-store",
      "@react-native-google-signin/google-signin",
      [
        "expo-dev-launcher",
        {
          "launchModeExperimental": "most-recent"
        }
      ],
      [
        "expo-font",
        {
          "fonts": [
            "./assets/fonts/Lato.ttf",
            "./assets/fonts/Lato.ttf",
            "./assets/fonts/Roboto-Black.ttf",
            "./assets/fonts/Roboto-BlackItalic.ttf",
            "./assets/fonts/Roboto-Bold.ttf",
            "./assets/fonts/Roboto-Regular.ttf",
            "./assets/fonts/Roboto-Medium.ttf",
          ]
        }
      ]
    ],
    "extra": {
      "eas": {
        "projectId": "f1b7fbe1-6030-4032-b3a0-bc3720f643bd"
      },
    },
    "owner": "matheuspeluchi"
  }
}
export default appConfig;
