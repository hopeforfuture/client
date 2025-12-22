import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  //logout function
  const logoutHandler = () => {
    localStorage.removeItem("todoapp");
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  //get username
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("todoapp"));
    console.log("username data ===> " + userData?.user?.username);
    setUsername(userData?.user?.username);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" href="#">
          <i className="fa-solid fa-user-check me-2"></i>
          <i>Welcome</i> {username}!
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/todoList">
                My todo List
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link p-0 d-flex align-items-center"
                type="button"
                title="Logout"
                onClick={logoutHandler}
              >
                <i className="fa-solid fa-power-off text-danger fs-5"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
