import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

// Intercepta requisições e adiciona o token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = async (credentials) => {
  const response = await axios.post(
    "http://localhost:8000/auth/login",
    credentials
  );
  return response.data;
};

// Visitantes
export const createVisitor = (data) => api.post("/visitantes/", data);
export const getVisitors = () => api.get("/visitantes/");
export const registerExit = (id) => api.patch(`/visitantes/${id}/saida`);

export default api;
