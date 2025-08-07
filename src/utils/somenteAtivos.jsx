import axios from "axios";

export async function somenteAtivos() {
  try {
    const response = await axios.get("http://localhost:8000/visitas/ativas");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar visitantes ativos:", error);
    return [];
  }
}