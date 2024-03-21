import React, { useEffect } from "react";
import moment from "moment";
import "moment/locale/pt-br";
import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import AddTask from "../addTask";
import useViewModel from "./model";
import { styles } from "./styles";
import todayImg from "@assets/imgs/today.jpg";
import tomorrowImg from "@assets/imgs/tomorrow.jpg";
import monthImg from "@assets/imgs/month.jpg";
import weekImg from "@assets/imgs/week.jpg";

import commonStyles from "@/commonStyles";
import Task from "@/components/task";
import { useSession } from "@/context";
import { UserProps } from "@/types";

interface TaskListProps {
  title?: string;
  daysAhead?: number;
}

const TaskList: React.FC<TaskListProps> = ({
  title = "Hoje",
  daysAhead = 0,
}) => {
  const currentDate = moment().locale("pt-br").format("ddd, D [de] MMMM ");
  const limit = moment().add({ days: daysAhead }).toDate();
  const { user: stringUser, isUserLoading, signOut } = useSession();
  const user = stringUser ? (JSON.parse(stringUser!) as UserProps) : null;
  const getImage = () => {
    switch (daysAhead) {
      case 0:
        return { img: todayImg, color: commonStyles.colors.today };
      case 1:
        return { img: tomorrowImg, color: commonStyles.colors.tomorrow };
      case 7:
        return { img: weekImg, color: commonStyles.colors.week };

      default:
        return { img: monthImg, color: commonStyles.colors.month };
    }
  };
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
    toggleDrawer,
  } = useViewModel();

  useEffect(() => {
    filterTask();
  }, [filterTask, showDoneTasks]);

  useEffect(() => {
    if (!isUserLoading && user) loadState(user!.id, limit);
  }, [isUserLoading]);
  return (
    <View style={styles.root}>
      <AddTask visible={showModal} onCancel={toggleModal} onSave={addTask} />
      <ImageBackground source={getImage().img} style={styles.background}>
        <View style={styles.iconBar}>
          <TouchableOpacity style={styles.iconToggle} onPress={toggleDrawer}>
            <Icon name="bars" size={20} color={commonStyles.colors.secondary} />
          </TouchableOpacity>
          <View style={styles.iconBarActions}>
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
        </View>
        <View style={styles.titleBar}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{currentDate}</Text>
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
        style={[styles.addButon, { backgroundColor: getImage().color }]}
        activeOpacity={0.8}
      >
        <Icon name="plus" size={20} color={commonStyles.colors.secondary} />
      </TouchableOpacity>
    </View>
  );
};

export default TaskList;
