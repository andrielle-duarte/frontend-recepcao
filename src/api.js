import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

const API_BASE = "http://localhost:8000";

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);




export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const createVisitor = (data) => api.post("/visitantes/", data);
export const getVisitors = () => api.get("/visitantes/");
export const registerExit = (id) => api.patch(`/visitantes/${id}/saida`);
export const getHistorico = () => api.get("/visitas/historico/");
export const getBuscarVisitante = (termo) =>
  `${API_BASE}/visitantes/buscar?termo=${encodeURIComponent(termo)}`;
export const getHistoricoVisitas = (visitanteId) => api.get(`/visitas/historico/${visitanteId}`);
export const alterarMotivo = (id, motivo) =>
  api.put(`/visitas/visitantes/${id}/alterar-motivo`, { motivo_visita: motivo });
export const iniciarVisita = (visitanteId, motivo, dataEntrada) =>
  api.post("/visitas/", {
    visitante_id: Number(visitanteId),
    motivo_visita: motivo ?? "",
    data_entrada: dataEntrada ?? new Date().toISOString(),
  });
export const getAllVisitantes = () => api.get("/visitantes/");
export const getVisitantesAtivos = () => api.get("/visitas/ativas");
export const encerrarVisita = (id) => api.put(`/visitas/${id}/encerrar`);

export default api;
