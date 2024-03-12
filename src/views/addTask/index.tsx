import React, { useState } from "react";
import {
  Alert,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import DatePicker from "../../components/dateTimePicker";
import { styles } from "./styles";
import { TaskProps } from "../../services/taskService";

interface AddTaskProps {
  onCancel?: () => void;
  onSave?: (task: TaskProps) => void;
  visible: boolean;
}

const AddTask: React.FC<AddTaskProps> = ({ onCancel, onSave, visible }) => {
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

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onCancel}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.root} />
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text style={styles.header}>New Task</Text>
        <TextInput
          style={styles.input}
          value={description}
          placeholder="Informe a descrição da tarefa..."
          onChangeText={(text) => setDescription(text)}
        />
        <DatePicker date={date} onChange={setDate} />
        <View style={styles.buttons}>
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.button}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={save}>
            <Text style={styles.button}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.root} />
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddTask;
