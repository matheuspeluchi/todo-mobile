import React from "react";
import TaskList from "../../screens/listTask";

const Today: React.FC = () => {
  return <TaskList title="Hoje" daysAhead={0} />;
};

export default Today;
