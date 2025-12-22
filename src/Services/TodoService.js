import axios from "axios";

//get user token
const user = JSON.parse(localStorage.getItem("todoapp"));

//default auth header
axios.defaults.headers.common["Authorization"] = `bearer ${user.token}`;

//CREATE TODO
const createTodo = (data) => {
  return axios.post("/todo/create", data);
};

const TodoService = { createTodo };
export default TodoService;
