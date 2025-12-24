import React from "react";

const DeleteModalBox = ({ deleteTaskId, setDeleteTaskId, handleDelete }) => {
  if (!deleteTaskId) return null;

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{
          zIndex: 1055,
          pointerEvents: "auto",
        }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Delete</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setDeleteTaskId(null)}
              />
            </div>

            <div className="modal-body">
              <p>Are you sure you want to delete this task?</p>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setDeleteTaskId(null)}
              >
                Cancel
              </button>

              <button
                className="btn btn-danger"
                onClick={() => handleDelete(deleteTaskId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop fade show" style={{ zIndex: 1050 }} />
    </>
  );
};

export default DeleteModalBox;
