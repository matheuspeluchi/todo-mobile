import moment from "moment";
import "moment/locale/pt-br";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import todayImg from "../../../assets/imgs/today.jpg";

import commonStyles from "../../commonStyles";
import Task from "../../components/task";
import { TaskProps, TaskService } from "../../services/taskService";
import AddTask from "../addTask";
import { styles } from "./styles";

const TaskList: React.FC = () => {
  const today = moment().locale("pt-br").format("ddd, D [de] MMMM");
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [visibleTasks, setVisibleTasks] = useState<TaskProps[]>(tasks);
  const [showDoneTasks, setShowDoneTasks] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toggletask = (id: number | undefined) => {
    const taskList = [...tasks];
    taskList.forEach((task) => {
      if (task.id === id) {
        task.doneAt = task.doneAt ? null : new Date();
      }
    });
    setTasks(taskList);
    TaskService.saveTasks(taskList);
  };

  const removeTask = (taskId: number | undefined) => {
    const list = tasks.filter((task) => task.id !== taskId);
    setTasks([...list]);
    TaskService.saveTasks(list);
  };

  const addTask = (newTask: TaskProps) => {
    if (!newTask.description.trim()) {
      Alert.alert("A descrição da tarefa não foi informada!");
      return;
    }
    const list = [...tasks];
    list.push({ ...newTask, id: Math.random() });
    setTasks([...list]);
    setShowModal(false);
    TaskService.saveTasks(list);
  };

  const filterTask = useCallback(async () => {
    let visibleTask = null;

    if (showDoneTasks) {
      visibleTask = [...tasks];
    } else {
      visibleTask = [...tasks.filter((item) => !item.doneAt)];
    }
    setVisibleTasks(visibleTask);
  }, [showDoneTasks, tasks]);

  const loadState = async () => {
    const tasks = await TaskService.getTasks();
    const filter = await TaskService.getFilter();
    if (tasks) {
      setTasks(tasks);
      setShowDoneTasks(filter);
    }
  };

  const toggleFilter = async () => {
    setShowDoneTasks(!showDoneTasks);
    await TaskService.saveFilter(!showDoneTasks);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    filterTask();
  }, [filterTask, showDoneTasks]);

  useEffect(() => {
    loadState();
  }, []);

  return (
    <View style={styles.root}>
      <AddTask visible={showModal} onCancel={toggleModal} onSave={addTask} />
      <ImageBackground source={todayImg} style={styles.background}>
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={toggleFilter}>
            <Icon
              name={showDoneTasks ? "eye" : "eye-slash"}
              size={20}
              color={commonStyles.colors.secondary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subtitle}>{today}</Text>
        </View>
      </ImageBackground>
      <View style={styles.taskList}>
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
  );
};

export default TaskList;
