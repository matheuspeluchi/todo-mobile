import { collection, doc, getDocs, query, setDoc, where, documentId, addDoc } from "firebase/firestore";
import { TaskProps } from "../taskService";
import { firestore } from "./firebaseConfig";


export async function getTasks(userId: string):Promise<TaskProps[]>{
  const ref = collection(firestore, 'tasks' )
  const q = query(ref, where("userId", '==', userId))
  const tasks = await getDocs(q);
  const taskList= tasks.docs.map(item => {
    const task = item.data() as TaskProps;
    return {  
      id: item.id,
      description: task.description,
      estimatedAt: task.estimatedAt,
      doneAt: task.doneAt,
      userId: task.userId
    }
  })
  return taskList;
}

export async function saveTasks(task: TaskProps, userId: string){

  const ref = collection(firestore, `tasks/${userId}/tasks`)
  await addDoc(ref, task )
}
