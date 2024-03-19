import { AppState, TaskProps } from "@/types";
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestore } from "../config/firebaseConfig";



export async function getTasks(userId: string, callback: (userId: any)=> void):Promise<void>{
  try {
    const tasksRef = collection(firestore, 'users', userId, 'tasks')
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
    const ref = doc(firestore, "users", userId,"tasks", task.id!)
    const data ={
      description: task.description,
      estimatedAt: task.estimatedAt,
      doneAt: task.doneAt
    }
    await updateDoc(ref, data )
  }
  export async function createTask (task: TaskProps, userId: string): Promise<void> {
    const ref = collection(firestore, 'users', userId, 'tasks')
    await addDoc(ref, task )
  }

  export async function getFilter (userId: string): Promise<boolean> {    
    const ref = doc(firestore, "users", userId)
    const result = await getDoc(ref);
    const data = result.data() as AppState
    return data.filter || false;
  }

  export async function  saveFilter (filter: boolean, userId: string): Promise<void> {
    const ref = doc(firestore, "users", userId)
    await updateDoc(ref, {filter} )


  }

  export async function deleteTask(userId: string, taskId: string): Promise<void> {
    const docRef = doc(firestore, 'tasks', userId, 'tasks', taskId )
    await deleteDoc(docRef);

  }

