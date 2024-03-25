import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, inMemoryPersistence } from "firebase/auth"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { Platform } from 'react-native';

// import {...} from "firebase/database";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGIN_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
};

const persistence = Platform.OS === 'web' ? inMemoryPersistence as any : getReactNativePersistence(ReactNativeAsyncStorage);
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, { persistence });
export const firestore = getFirestore(app);