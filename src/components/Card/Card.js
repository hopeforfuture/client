import React, { useState } from "react";
import EditTodo from "../../components/EditTodo";
import TodoService from "./../../Services/TodoService";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";

const Card = ({ tasks, refreshTodos }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleEdit = (task) => {
    setSelectedTask(task);
  };

  const handleDelete = async (id) => {
    try {
      await TodoService.deleteTodo(id);
      toast.success("Task Deleted Successfully.");
      refreshTodos();
    } catch (error) {
      console.log(error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      toast.error(message);
    }
  };

  return (
    <>
      <div className="card-container">
        {tasks?.map((task, i) => {
          return (
            <>
              <div
                className="card border-primary mb-3 mt-3"
                style={{ maxWidth: "18rem" }}
                key={task._id}
              >
                <div className="card-header">
                  <div className="chead">
                    <h6 style={{ fontWeight: "bold" }}>{task?.title}</h6>
                    <h6
                      className={
                        task?.isCompleted === true ? "task-cmp" : "task-inc"
                      }
                    >
                      {task?.isCompleted === true ? "Completed" : "Incomplete"}
                    </h6>
                  </div>
                </div>

                <div className="card-body">
                  <h6>{task?.title}</h6>
                  <p className="card-text">
                    {task?.description.substring(0, 10)}
                  </p>
                  <h6>{dayjs(task?.createdAt).format("DD MMM YYYY")}</h6>
                </div>

                <div className="card-footer bg-transparent border-primary">
                  <button
                    className="btn btn-warning"
                    title="EDIT TASK"
                    onClick={() => handleEdit(task)}
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    title="DELETE TASK"
                    onClick={() => handleDelete(task?._id)}
                  >
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              </div>
            </>
          );
        })}

        {/* Render modal ONCE */}
        {selectedTask && (
          <EditTodo
            task={selectedTask}
            setShowModal={() => setSelectedTask(null)}
            refreshTodos={refreshTodos}
          />
        )}
      </div>
    </>
  );
};

export default Card;
