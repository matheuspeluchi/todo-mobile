import React from "react";
import {
  ImageStyle,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";

interface AuthInputProps extends TextInputProps {
  style: ImageStyle | TextStyle | ViewStyle;
  icon?: string;
}

const AuthInput: React.FC<AuthInputProps> = ({
  style,
  icon = "",
  ...props
}) => {
  return (
    <View style={[styles.container, { ...style }]}>
      <Icon name={icon} size={20} style={styles.icon} />
      <TextInput style={styles.input} {...props}></TextInput>
    </View>
  );
};

export default AuthInput;
