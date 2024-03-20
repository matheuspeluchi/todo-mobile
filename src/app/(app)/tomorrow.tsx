import TaskList from "@/screens/listTask";
import React from "react";

const Tomorrow: React.FC = () => {
  return <TaskList title="Amanhã" daysAhead={1} />;
};

export default Tomorrow;
