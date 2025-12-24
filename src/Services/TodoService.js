import axios from "axios";

//get user token
const user = JSON.parse(localStorage.getItem("todoapp"));

//default auth header
axios.defaults.headers.common["Authorization"] = `bearer ${user?.token}`;

//CREATE TODO
const createTodo = (data) => {
  return axios.post("/todo/create", data);
};

//GET ALL TODO
const getAllTodo = (id) => {
  return axios.get(`/todo/getAll/${id}`);
};

//UPDATE TODO
const updateTodo = (id, data) => {
  return axios.put(`/todo/update/${id}`, data);
};

//DELETE TODO
const deleteTodo = (id) => {
  return axios.delete(`/todo/delete/${id}`);
};

const TodoService = { createTodo, getAllTodo, updateTodo, deleteTodo };
export default TodoService;
