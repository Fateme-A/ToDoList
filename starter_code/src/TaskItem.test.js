import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for extra matchers
import TaskItem from "./components/Card";

// Mock the useStores hook
jest.mock("./useStores", () => ({
  __esModule: true,
  default: () => ({ TasksStore: { addTask: jest.fn() } }),
}));

test("renders TaskItem component", () => {
  const task = { id: 1, title: "Test Task", subtasks: [], showSubtasks: true };
  render(<TaskItem task={task} />);

  const titleInput = screen.getByDisplayValue("Test Task");
  expect(titleInput).toBeInTheDocument();
});
