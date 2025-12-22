import React from "react";
import Navbar from "../../components/Layout/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="add-task">
          <h1>Add Task</h1>
          <input type="search" placeholder="search your task" />
          <button className="btn btn-primary">
            Create Task <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
