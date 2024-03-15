import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { TaskProps, TaskService } from "../../services/taskService";

export interface TaskListViewModel {
  visibleTasks: TaskProps[],
  showModal: boolean,
  showDoneTasks: boolean,
  removeTask: (taskId: number | undefined) => void,
  addTask: (newTask: TaskProps) => void,
  filterTask: () => void,
  toggletask: (id: number | undefined) => void,
  loadState: () => void,
  toggleModal:  () => void
  toggleFilter:  () => void

}

const useViewModel = (): TaskListViewModel => {
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

  const removeTask = (taskId: number | undefined): void => {
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

  const loadState = async (): Promise<void> => {
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
  }
}


export default useViewModel;