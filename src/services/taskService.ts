import AsyncStorage from "@react-native-async-storage/async-storage";


export type TaskProps = {
  id?: number;
  description: string;
  estimatedAt: Date;
  doneAt: Date | null;
};
export const TaskService = {
  getTasks: async (): Promise<TaskProps[]> => {
    const data = await AsyncStorage.getItem("tasks");
    if (data) {
      const tasks: TaskProps[] = JSON.parse(data);
      return tasks;
    }
    return [];
  },

  saveTasks: async (tasks: TaskProps[]): Promise<void> => {
    const stringfy = JSON.stringify(tasks)
    await AsyncStorage.setItem("tasks", stringfy);
  },

  getFilter: async (): Promise<boolean> => {    
    const filter = await AsyncStorage.getItem("filter");
    console.log(filter === 'true');
    return (filter === 'true');
  },

  saveFilter: async (filter: boolean): Promise<void> => {
    AsyncStorage.setItem("filter", String(filter))
  }

};
