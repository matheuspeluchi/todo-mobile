import { logout } from "@/services/userService";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Avatar, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./styles";
import { useSession } from "@/context";
import { UserProps } from "@/types";

const CustomDrawerContent: React.FC = (props: any) => {
  const { colors } = useTheme();
  const { user: stringUser, isUserLoading, signOut } = useSession();
  const user = stringUser ? (JSON.parse(stringUser!) as UserProps) : null;
  const signout = () => {
    logout();
    router.navigate("/login/");
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <View style={styles.header}>
          <Avatar.Image
            source={{
              uri:
                user?.avatarUrl ||
                "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
            }}
          />
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
          onPress={signout}
          activeTintColor={colors.secondary}
          label={"Sair"}
          labelStyle={{
            fontFamily: "Roboto",
            fontSize: 20,
            color: colors.primary,
          }}
          icon={() => <Icon name="sign-out" size={20} color={colors.primary} />}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawerContent;
