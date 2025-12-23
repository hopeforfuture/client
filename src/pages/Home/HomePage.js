import React, { useState, useEffect } from "react";
import Navbar from "../../components/Layout/Navbar";
import PopModal from "../../components/PopModal";
import TodoService from "./../../Services/TodoService";
import Card from "../../components/Card/Card";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allTasks, setAllTasks] = useState([]);

  //handle modal
  const openModalHandler = () => {
    setShowModal(true);
  };

  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const id = userData?.user?.id;

  const getUserTask = async () => {
    try {
      const { data } = await TodoService.getAllTodo(id);
      console.log(data);
      setAllTasks(data?.todos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserTask();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="add-task">
          <h1>Add Task</h1>
          <input type="search" placeholder="search your task" />
          <button className="btn btn-primary" onClick={openModalHandler}>
            Create Task <i className="fa-solid fa-plus"></i>
          </button>
        </div>

        {allTasks && <Card tasks={allTasks} refreshTodos={getUserTask} />}

        <PopModal
          showModal={showModal}
          setShowModal={setShowModal}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
        />
      </div>
    </>
  );
};

export default HomePage;
