import { renderHook, waitFor, act } from "@testing-library/react-native";
import useViewModel, { AddTaskViewModel } from "../model";

describe("AddTaskViewModel", () => {
  it("should change text with success", async () => {
    const taskName = "Read book";
    const { result } = renderHook<AddTaskViewModel, { (): void }>((onSave) =>
      useViewModel(onSave)
    );
    act(() => result.current.setDescription(taskName));

    await waitFor(() => expect(result.current.description).toBe(taskName));
  });
});
