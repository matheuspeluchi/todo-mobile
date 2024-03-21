import { useSession } from "@/context";
import { TaskProps, UserProps } from "@/types";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Alert } from "react-native";
import { createTask, deleteTask, getFilter, getTasks, saveFilter, updateTask } from "@/services/taskService";
import { useNavigation } from "expo-router";
import {DrawerActions} from "@react-navigation/native"
import { DrawerNavigationEventMap, DrawerNavigationProp } from "@react-navigation/drawer";

export interface TaskListViewModel {
  visibleTasks: TaskProps[],
  showModal: boolean,
  showDoneTasks: boolean,
  removeTask: (taskId:string) => void,
  addTask: (newTask: TaskProps) => void,
  filterTask: () => void,
  toggletask: (id: string) => void,
  loadState: (userId: string, limit: Date) => void,
  toggleModal:  () => void,
  toggleFilter:  () => void,
  toggleDrawer: ()=> void
  setTasks: Dispatch<SetStateAction<TaskProps[]>>

}

const useViewModel = (): TaskListViewModel => {
  const {user: stringUser} = useSession()
  const user = stringUser? JSON.parse(stringUser!) as UserProps : null;
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [visibleTasks, setVisibleTasks] = useState<TaskProps[]>(tasks);
  const [showDoneTasks, setShowDoneTasks] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { dispatch } = useNavigation();

  const toggleDrawer = () => {
    dispatch(DrawerActions.toggleDrawer());
  };

  const toggletask = (id: string) => {
    const taskList = [...tasks];
    taskList.forEach((task) => {
      if (task.id === id) {
        task.doneAt = task.doneAt ? null : new Date();
        updateTask(task, user!.id)
      }
    });
  
  };

  const removeTask =  (taskId: string): void => {
    deleteTask(user!.id, taskId)
  };

  const addTask = (newTask: TaskProps) => {
    if (!newTask.description.trim()) {
      Alert.alert("A descrição da tarefa não foi informada!");
      return;
    }
    createTask(newTask, user!.id)
    toggleModal()
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

  const loadState = useCallback(async (userId: string, limit: Date): Promise<void> => {
    await getTasks(userId, setTasks, limit);
    const filter = await getFilter(userId)
    setShowDoneTasks(filter)
    
  },[tasks, visibleTasks]); 

  const toggleFilter = async () => {
    setShowDoneTasks(!showDoneTasks);
    saveFilter(!showDoneTasks, user!.id);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return {
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
    setTasks,
    toggleDrawer
  }
}


export default useViewModel;