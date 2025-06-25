import axios from "axios";

const api = axios.create({
  baseURL: "https://concurso-back-1.onrender.com/", 
});

export default api;
