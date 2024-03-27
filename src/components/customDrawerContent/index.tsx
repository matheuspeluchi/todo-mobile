import { useSession } from "@/context";
import { UserProps } from "@/types";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { Avatar, Divider, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./styles";
import Logo from "@assets/icon.png";

const CustomDrawerContent: React.FC = (props: any) => {
  const { colors } = useTheme();
  const { user: stringUser, isUserLoading, signOut } = useSession();
  const user = stringUser ? (JSON.parse(stringUser) as UserProps) : null;
  const signout = () => {
    signOut();
    router.navigate("/login/");
  };
  const style = styles(colors);

  return (
    !isUserLoading && (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props} scrollEnabled={false}>
          <View style={style.header}>
            <View style={style.title}>
              <Image source={Logo} style={style.logo} />
              <Text variant="displaySmall">Tarefas</Text>
            </View>
            <Divider />
            <View style={style.user}>
              <Avatar.Image
                style={style.avatar}
                source={{
                  uri:
                    user?.avatarUrl ||
                    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
                }}
              />
              <View style={style.userInfo}>
                <Text style={style.name}>{user!.name}</Text>
                <Text style={style.email}>{user!.email}</Text>
              </View>
            </View>
          </View>
          <Divider />

          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
    )
  );
};

export default CustomDrawerContent;
