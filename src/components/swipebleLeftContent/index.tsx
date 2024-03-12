import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./styles";

const SwipebleLeftContent: React.FC = () => {
  return (
    <View style={styles.root}>
      <Icon name="trash" size={20} color="#FFF" style={styles.icon}></Icon>
      <Text style={styles.text}>Excluir</Text>
    </View>
  );
};

export default SwipebleLeftContent;
