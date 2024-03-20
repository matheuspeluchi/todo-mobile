import TaskList from "@/screens/listTask";
import React from "react";

const Week: React.FC = () => {
  return <TaskList title="Semana" daysAhead={7} />;
};

export default Week;
