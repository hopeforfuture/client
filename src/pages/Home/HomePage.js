import React, { useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import PopModal from "../../components/PopModal";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //handle modal
  const openModalHandler = () => {
    setShowModal(true);
  };

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
