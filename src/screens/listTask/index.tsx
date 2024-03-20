import moment from "moment";
import "moment/locale/pt-br";
import React, { useEffect } from "react";
import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import todayImg from "@assets/imgs/today.jpg";

import AddTask from "../addTask";
import useViewModel from "./model";
import { styles } from "./styles";

import { useSession } from "@/context";
import { UserProps } from "@/types";
import BaseContainer from "@/components/baseContainer";
import commonStyles from "@/commonStyles";
import Task from "@/components/task";

interface TaskListProps {
  title?: string;
  daysAhead?: number;
}
const TaskList: React.FC<TaskListProps> = ({
  title = "Hoje",
  daysAhead = 0,
}) => {
  const today = moment().locale("pt-br").format("ddd, D [de] MMMM ");
  const limit = moment().add({ days: daysAhead }).toDate();
  const { user: stringUser, isUserLoading, signOut } = useSession();
  const user = stringUser ? (JSON.parse(stringUser!) as UserProps) : null;
  const {
    visibleTasks,
    showDoneTasks,
    showModal,
    removeTask,
    addTask,
    filterTask,
    toggletask,
    toggleModal,
    toggleFilter,
    loadState,
  } = useViewModel();

  useEffect(() => {
    filterTask();
  }, [filterTask, showDoneTasks]);

  useEffect(() => {
    if (!isUserLoading && user) loadState(user!.id, limit);
  }, [isUserLoading]);

  return (
    <BaseContainer>
      <View style={styles.root}>
        <AddTask visible={showModal} onCancel={toggleModal} onSave={addTask} />
        <ImageBackground source={todayImg} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity style={styles.iconToggle} onPress={toggleFilter}>
              <Icon
                name={showDoneTasks ? "eye" : "eye-slash"}
                size={20}
                color={commonStyles.colors.secondary}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconToggle} onPress={signOut}>
              <Icon
                name="sign-out"
                size={20}
                color={commonStyles.colors.secondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList} accessibilityLabel="task-list">
          <FlatList
            data={visibleTasks}
            keyExtractor={(task) => `${task.id}`}
            renderItem={({ item }) => (
              <Task task={item} toggle={toggletask} action={removeTask} />
            )}
          />
        </View>
        <TouchableOpacity
          onPress={toggleModal}
          style={styles.addButon}
          activeOpacity={0.8}
        >
          <Icon name="plus" size={20} color={commonStyles.colors.secondary} />
        </TouchableOpacity>
      </View>
    </BaseContainer>
  );
};

export default TaskList;
