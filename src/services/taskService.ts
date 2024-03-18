import AsyncStorage from "@react-native-async-storage/async-storage";
import {getTasks as ListTask, saveTasks } from './database/taskRepository'
import { UserProps } from "@/types";

export type TaskProps = {
  id?: string;
  userId:string,
  description: string;
  estimatedAt: Date;
  doneAt: Date | null;
};

export type AppState = {
  filter: boolean,
  tasks: TaskProps[]
}
export async function getTasks(userId: string): Promise<TaskProps[]> {
  console.log("entrou")
  try {
    const data = await ListTask(userId)
   
    return data;
    
  } catch (error) {
    throw error
  }
  }

  export async function saveTask (task: TaskProps, userId: string): Promise<void> {
     await saveTasks(task, userId);
  }

  export async function getFilter (): Promise<boolean> {    
    const filter = await AsyncStorage.getItem("filter");
    return (filter === 'true');
  }

  export async function  saveFilter (filter: boolean): Promise<void> {
    AsyncStorage.setItem("filter", String(filter))
  }

