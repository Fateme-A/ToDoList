import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faTrashCan,
  faAngleDoubleDown,
  faAngleDoubleUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { observer } from "mobx-react-lite";
import useStores from "../useStores";

const TaskItem = observer(({ task, parentTask = null }) => {
  const { TasksStore } = useStores();
  console.log({ task });

  const handleAddSubtask = () => {
    TasksStore.addTask("", task);
  };

  const handleDeleteTask = () => {
    TasksStore.deleteTask(task, parentTask);
  };

  const handleChangeOrder = (dir) => {
    TasksStore.changeOrder(dir, task, parentTask);
  };

  const handleToggleSubtasks = () => {
    TasksStore.toggleSubtasks(task);
  };

  const handleEditTitle = (e) => {
    TasksStore.editTitle(task, e.target.value);
  };

  return (
    <div className="card-wrapper">
      <div className="card">
        <span
          className={`toggle-button ${!task.showSubtasks && "close"}`}
          onClick={handleToggleSubtasks}
        >
          <FontAwesomeIcon icon={faAngleDown} />
        </span>
        <input
          type="text"
          className="title-input"
          value={task.title}
          onChange={handleEditTitle}
          readOnly={false}
          placeholder="title"
        />
        <Button
          icon={<FontAwesomeIcon icon={faAngleDoubleDown} />}
          onClick={() => handleChangeOrder("down")}
        />
        <Button
          icon={<FontAwesomeIcon icon={faAngleDoubleUp} />}
          onClick={() => handleChangeOrder("up")}
        />
        <Button
          icon={<FontAwesomeIcon icon={faTrashCan} />}
          onClick={handleDeleteTask}
        />
        <Button
          icon={<FontAwesomeIcon icon={faSquarePlus} />}
          onClick={handleAddSubtask}
        />
      </div>
      {task.showSubtasks && (
        <div className="subtasks-container">
          {task.subtasks.map((subtask) => (
            <TaskItem key={subtask.id} task={subtask} parentTask={task} />
          ))}
        </div>
      )}
    </div>
  );
});

export default TaskItem;
