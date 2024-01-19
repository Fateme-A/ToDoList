import "@testing-library/jest-dom/extend-expect";
import "@testing-library/user-event";
import TasksStore from "./store/tasks";

describe("TasksStore", () => {
  let tasksStore;

  beforeEach(() => {
    tasksStore = TasksStore;
  });

  afterEach(() => {
    // Reset tasksStore after each test
    tasksStore.tasks = [];
  });

  it("should add a task", () => {
    tasksStore.addTask("New Task");
    expect(tasksStore.tasks).toHaveLength(1);
    expect(tasksStore.tasks[0].title).toBe("New Task");
  });

  it("should delete a task", () => {
    const taskToDelete = { id: 1, title: "Task to Delete", showSubtasks: true };
    const anotherTask = { id: 2, title: "Another Task", showSubtasks: true };

    tasksStore.tasks = [taskToDelete, anotherTask];
    tasksStore.deleteTask(tasksStore.tasks[0]);

    expect(tasksStore.tasks.length).toBe(1);
    expect(tasksStore.tasks).not.toEqual(
      expect.arrayContaining([taskToDelete])
    );
    expect(tasksStore.tasks[0]).toEqual(anotherTask);
  });

  it("should toggle subtasks visibility", () => {
    const task = { id: 1, title: "Toggle Subtasks Task", showSubtasks: true };
    tasksStore.tasks = [task];

    tasksStore.toggleSubtasks(task);

    expect(task.showSubtasks).toBe(false);
  });

  it("should edit task title", () => {
    const task = { id: 1, title: "Old Title" };
    tasksStore.tasks = [task];

    tasksStore.editTitle(task, "New Title");

    expect(task.title).toBe("New Title");
  });
});
