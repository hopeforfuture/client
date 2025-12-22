import React from "react";
import { Link } from "react-router-dom";
import todo from "../../assets/images/todo.jpg";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="hero">
      <div className="intro-text">
        <h1>
          <span className="tagline1">organize work and life</span>
          <span className="tagline2"> finally.</span>
        </h1>
        <p>
          type just anything into the task field and TodoList <br />
          on-of-its-kind natural language recognition will instantly fill your
          to-do-list.
        </p>
        <Link className="btn red" to="/register">
          Register Now!
        </Link>
        <Link className="btn blue" to="/login">
          Login
        </Link>
      </div>

      <div className="">
        <img
          src={todo}
          alt="Todo Image"
          style={{ width: "100%", height: "500px" }}
        />
      </div>
    </div>
  );
};

export default Landing;
