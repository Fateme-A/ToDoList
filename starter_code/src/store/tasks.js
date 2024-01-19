import { makeObservable, observable, action, computed } from "mobx";

class Task {
  static nextId = 1;

  constructor(title) {
    this.id = Task.nextId++;
    this.title = title;
    this.subtasks = observable([]);
    this.showSubtasks = true;

    makeObservable(this, {
      id: observable,
      title: observable,
      subtasks: observable,
      showSubtasks: observable,
    });
  }
}
class TasksStore {
  label = "دیجی اکسپرس";
  tasks = [];

  constructor() {
    makeObservable(this, {
      label: observable,
      tasks: observable,
      addTask: action,
      deleteTask: action,
      changeOrder: action,
      toggleSubtasks: action,
      editTitle: action,
    });
  }

  addTask = (title = "", parentTask = null) => {
    const newTask = new Task(title);
    if (parentTask) {
      parentTask.subtasks = [...parentTask.subtasks, newTask];
    } else {
      this.tasks = [...this.tasks, newTask];
    }
  };

  deleteTask = (task, parentTask = null) => {
    if (parentTask) {
      parentTask.subtasks = parentTask.subtasks.filter((t) => t !== task);
    } else {
      this.tasks = this.tasks.filter((t) => t !== task);
    }
  };

  changeOrder = (dir, task, parentTask = null) => {
    if (parentTask) {
      const index = parentTask.subtasks.indexOf(task);
      const newIndex = dir === "up" ? index - 1 : index + 1;

      if (newIndex >= 0 && newIndex < parentTask.subtasks.length) {
        // Swap the tasks in the array
        [parentTask.subtasks[index], parentTask.subtasks[newIndex]] = [
          parentTask.subtasks[newIndex],
          parentTask.subtasks[index],
        ];
      }
    } else {
      const index = this.tasks.indexOf(task);
      const newIndex = dir === "up" ? index - 1 : index + 1;

      if (newIndex >= 0 && newIndex < this.tasks.length) {
        // Swap the tasks in the array
        [this.tasks[index], this.tasks[newIndex]] = [
          this.tasks[newIndex],
          this.tasks[index],
        ];
      }
    }
  };

  toggleSubtasks = (task) => {
    task.showSubtasks = !task.showSubtasks;
  };

  editTitle = (task, newTitle) => {
    task.title = newTitle;
  };
}

export default new TasksStore();
