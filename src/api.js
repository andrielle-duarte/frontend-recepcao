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
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const res = await api.get("/auth/refresh", {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });
        const newToken = res.data.access_token;
        localStorage.setItem("token", newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(error);
      }
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
