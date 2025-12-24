import React, { useState, useEffect } from "react";
import Navbar from "../../components/Layout/Navbar";
import Spinner from "../../components/Spinner";
import TodoService from "./../../Services/TodoService";
import dayjs from "dayjs";

const TodoList = () => {
  const [todoStatus, setTodoStatus] = useState("");
  const [filteredTask, setFilteredTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allTasks, setAllTasks] = useState([]);

  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const id = userData?.user?.id;

  const getUserTask = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const { data } = await TodoService.getAllTodo(id);
      console.log(data);
      setAllTasks(data?.todos);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserTask();
  }, [id]);

  useEffect(() => {
    if (todoStatus === "incomplete") {
      setFilteredTask(allTasks.filter((t) => !t.isCompleted));
    } else if (todoStatus === "completed") {
      setFilteredTask(allTasks.filter((t) => t.isCompleted));
    } else {
      setFilteredTask(allTasks);
    }
  }, [todoStatus, allTasks]);

  return (
    <>
      <Navbar />
      <div className="filter-container">
        <h4>Filter Todos by</h4>
        <div className="filter-group">
          <select
            className="form-select"
            onChange={(e) => setTodoStatus(e.target.value)}
          >
            <option value="">---Select---</option>
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* ======================= */}
      {loading && <Spinner />}

      <div className="card-container">
        {filteredTask.length === 0 ? (
          <h1>No task found</h1>
        ) : (
          filteredTask?.map((task, i) => {
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
                        {task?.isCompleted === true
                          ? "Completed"
                          : "Incomplete"}
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
                </div>
              </>
            );
          })
        )}
      </div>
    </>
  );
};

export default TodoList;
