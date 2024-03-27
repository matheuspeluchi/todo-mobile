import React from "react";
import TaskList from "../../screens/listTask";
import BaseContainer from "@/components/baseContainer";

const Today: React.FC = () => {
  return (
    <BaseContainer>
      <TaskList title="Hoje" daysAhead={0} />
    </BaseContainer>
  );
};

export default Today;
