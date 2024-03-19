import AsyncStorage from "@react-native-async-storage/async-storage";
import { TaskProps } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { addDoc, collection, onSnapshot, deleteDoc, doc, updateDoc, FieldValue } from "firebase/firestore";
import { firestore } from "./database/firebaseConfig";



export type AppState = {
  filter: boolean,
  tasks: TaskProps[]
}
export async function getTasks(userId: string, callback: (userId: any)=> void):Promise<void>{
  try {
    const tasksRef = collection(firestore, 'tasks', userId, 'tasks')
     await onSnapshot(tasksRef, (result)=>{
      const data = result.docs;
      const list =  data.map( item => {
        const task = item.data();
        return {
          id: item.id,
          description: task.description,
          estimatedAt: task.estimatedAt.toDate(),
          doneAt: task.doneAt
        }
      })
      callback(list)
    })        
  } catch (error:any) {
  console.log(error.message)  
  }
}

  export async function updateTask (task: TaskProps, userId: string): Promise<void> {
    const ref = doc(firestore, "tasks", userId,"tasks", task.id!)
    const data ={
      description: task.description,
      estimatedAt: task.estimatedAt,
      doneAt: task.doneAt
    }
    await updateDoc(ref, data )
  }
  export async function createTask (task: TaskProps, userId: string): Promise<void> {
    const ref = collection(firestore, 'tasks', userId, 'tasks')
    await addDoc(ref, task )
  }

  export async function getFilter (): Promise<boolean> {    
    const filter = await AsyncStorage.getItem("filter");
    return (filter === 'true');
  }

  export async function  saveFilter (filter: boolean): Promise<void> {
    AsyncStorage.setItem("filter", String(filter))
  }

  export async function deleteTask(userId: string, taskId: string): Promise<void> {
    const docRef = doc(firestore, 'tasks', userId, 'tasks', taskId )
    await deleteDoc(docRef);

  }

