import React from "react";
import { AddTaskViewModel } from "../model";
import renderer from "react-test-renderer";
import AddTask from "..";

jest.mock("../model.ts", () => {
  return jest.fn().mockImplementation(
    (): AddTaskViewModel => ({
      date: new Date(),
      description: "Teste 1",
      save: jest.fn(),
      setDate: jest.fn(),
      setDescription: jest.fn(),
    })
  );
});

describe("AddTaskView", () => {
  it("should render component with success", async () => {
    const { toJSON } = renderer.create(<AddTask visible={true} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
