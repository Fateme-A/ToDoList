import React from "react";
import { observer } from "mobx-react";
import useStores from "./useStores";
import TaskItem from "./components/Card";
import "./App.css";

const App = observer(() => {
  const { TasksStore } = useStores();

  return (
    <div className="App">
      <header className="App-header">
        <p>{TasksStore?.label}</p>
      </header>

      <div className="App-content">
        <button onClick={() => TasksStore.addTask()} className="create-button">
          Create New Task
        </button>
        {TasksStore?.tasks.length > 0 &&
          TasksStore?.tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
      </div>
    </div>
  );
});

export default App;
