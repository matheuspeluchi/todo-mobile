import BaseContainer from "@/components/baseContainer";
import TaskList from "@/screens/listTask";
import React from "react";

const Month: React.FC = () => {
  return (
    <BaseContainer>
      <TaskList title="Mês" daysAhead={30} />
    </BaseContainer>
  );
};

export default Month;
