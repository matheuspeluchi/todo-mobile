import 'dotenv/config';

const appConfig = {
  "expo": {
    "name": "Todo",
    "slug": "todo",
    "scheme": "todo",
    "version": "1.0.1",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.matheuspeluchi.todo"
    },
    "android": {
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
      ["expo-router"],
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