import BaseContainer from "@/components/baseContainer";
import TaskList from "@/screens/listTask";
import React from "react";

const Week: React.FC = () => {
  return (
    <BaseContainer>
      <TaskList title="Semana" daysAhead={7} />
    </BaseContainer>
  );
};

export default Week;
