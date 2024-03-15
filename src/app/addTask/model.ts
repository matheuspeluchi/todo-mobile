import { Dispatch, SetStateAction, useState } from "react";
import { TaskProps } from "../../services/taskService";


export interface AddTaskViewModel {
  description: string,
  date: Date
  save: () => void
  setDate: Dispatch<SetStateAction<Date>>
  setDescription: Dispatch<SetStateAction<string>>
}

const useViewModel = ( onSave?: (task: TaskProps) => void): AddTaskViewModel => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const save = () => {
    const task: TaskProps = {
      description,
      estimatedAt: date,
      doneAt: null,
    };

    onSave && onSave(task);
    setDate(new Date());
    setDescription("");
  };
  return { description, date, save, setDate, setDescription}
}
export default useViewModel;