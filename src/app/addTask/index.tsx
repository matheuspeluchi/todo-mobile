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
import useViewModel from "./model";

export interface AddTaskProps {
  onCancel?: () => void;
  onSave?: (task: TaskProps) => void;
  visible: boolean;
}

const AddTask: React.FC<AddTaskProps> = ({ onCancel, onSave, visible }) => {
  const { description, date, save, setDate, setDescription } =
    useViewModel(onSave);

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onCancel}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.root} accessibilityLabel="cancel-modal" />
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text style={styles.header}>New Task</Text>
        <TextInput
          style={styles.input}
          value={description}
          placeholderTextColor={"#000000"}
          placeholder="Informe a descrição da tarefa..."
          onChangeText={setDescription}
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
        <View style={styles.root} accessibilityLabel="cancel-modal" />
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddTask;
