import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./styles";

interface SwipebleRightProps {
  taskId?: number;
  action: (taskId: number | undefined) => void;
}

const SwipebleRightContent: React.FC<SwipebleRightProps> = ({
  taskId,
  action,
}) => {
  return (
    <TouchableOpacity style={styles.root} onPress={() => action(taskId)}>
      <Icon name="trash" size={30} color="#FFF"></Icon>
    </TouchableOpacity>
  );
};

export default SwipebleRightContent;
