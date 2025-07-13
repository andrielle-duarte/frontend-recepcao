import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/", // troque se necessário
});

export const createVisitor = (data) => api.post("/visitantes/", data);
export const getVisitors = () => api.get("/visitantes/");
export const registerExit = (id) => api.patch(`/visitantes/${id}/saida`);

export default api;