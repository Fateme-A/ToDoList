import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders App component", () => {
  render(<App />);
  const createTaskButton = screen.getByText("Create New Task");
  expect(createTaskButton).toBeInTheDocument();
});
