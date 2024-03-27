import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import CheckView from "../checkView";
import moment from "moment";
import "moment/locale/pt-br";
import { styles } from "./styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SwipebleRightContent from "../swipebleRightContent";
import SwipebleLeftContent from "../swipebleLeftContent";
import { TaskProps } from "@/types";

interface ITaskProps {
  task: TaskProps;
  toggle: (id: string) => void;
  action: (id: string) => void;
}

const Task: React.FC<ITaskProps> = ({ task, toggle, action }) => {
  const { id, description, doneAt, estimatedAt } = task;
  const doneStyle = doneAt
    ? { textDecorationLine: "line-through" as "line-through" }
    : { textDecorationLine: undefined as undefined };

  const date = doneAt ? doneAt : estimatedAt;
  const formattedDate = moment(date)
    .locale("pt-br")
    .format("dddd, D [de] MMMM [às] hh:MM");
  const removeTask = (direction: string) => {
    if (direction === "left") action(task.id!);
  };
  return (
    <GestureHandlerRootView>
      <Swipeable
        onSwipeableOpen={(direction) => removeTask(direction)}
        renderRightActions={() => (
          <SwipebleRightContent taskId={task.id!} action={action} />
        )}
        renderLeftActions={() => <SwipebleLeftContent />}
      >
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => toggle(id!)}>
            <View style={[styles.checkContainer]}>
              <CheckView doneAt={doneAt} />
            </View>
          </TouchableWithoutFeedback>
          <View>
            <Text style={[styles.description, doneStyle]}>{description}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default Task;
