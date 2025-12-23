import React, { useState } from "react";
import { toast } from "react-hot-toast";
import TodoService from "./../Services/TodoService";

const EditTodo = ({ task, setShowModal, refreshTodos }) => {
  const [title, setTitle] = useState(task?.title);
  const [description, setDescription] = useState(task?.description);
  const [isCompleted, setIsCompleted] = useState(task?.isCompleted);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSelectChange = (e) => {
    setIsCompleted(e.target.value);
  };

  //Update
  const handleSubmit = async () => {
    try {
      const id = task?._id;
      const userData = JSON.parse(localStorage.getItem("todoapp"));
      const createdBy = userData?.user?.id;
      const data = { title, description, isCompleted };

      if (!title || !description) {
        return toast.error("Please provide title or description");
      }

      const todo = await TodoService.updateTodo(id, data);
      setShowModal(false);
      toast.success("Task updated successfully");
      setTitle("");
      setDescription("");
      setIsCompleted(null);
      refreshTodos();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      toast.error(message);
    }
  };

  return (
    <>
      {task && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Your Task</h5>
                <button
                  className="btn-close"
                  aria-label="close"
                  onClick={handleClose}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-floating">
                  <textarea
                    id="floatingTextArea"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>

                  <label htmlFor="floatingTextArea">Description</label>
                </div>

                <div className="my-3">
                  <select
                    value={String(task?.isCompleted)}
                    className="form-select"
                    onChange={handleSelectChange}
                  >
                    <option value="">Select Status</option>
                    <option value={true}>Completed</option>
                    <option value={false}>Incomplete</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTodo;
