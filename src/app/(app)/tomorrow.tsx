import BaseContainer from "@/components/baseContainer";
import TaskList from "@/screens/listTask";
import React from "react";

const Tomorrow: React.FC = () => {
  return (
    <BaseContainer>
      <TaskList title="Amanhã" daysAhead={1} />
    </BaseContainer>
  );
};

export default Tomorrow;
