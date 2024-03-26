import { useSession } from "@/context";
import { UserProps } from "@/types";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Avatar, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./styles";

const CustomDrawerContent: React.FC = (props: any) => {
  const { colors } = useTheme();
  const { user: stringUser, isUserLoading, signOut } = useSession();
  const user = stringUser ? (JSON.parse(stringUser!) as UserProps) : null;
  const signout = () => {
    signOut();
    router.navigate("/login/");
  };
  const style = styles(colors);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <View style={style.header}>
          <Text variant="displaySmall" style={style.title}>
            Tarefas
          </Text>
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
        <DrawerItemList {...props} />
        <DrawerItem
          onPress={signout}
          activeTintColor={colors.secondary}
          label={"Sair"}
          labelStyle={{
            fontFamily: "Roboto",
            fontSize: 20,
          }}
          icon={() => (
            <Icon name="sign-out" size={20} color={colors.secondary} />
          )}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawerContent;
