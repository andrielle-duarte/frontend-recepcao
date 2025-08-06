import axios from "axios";

export async function somenteAtivos() {
  try {
    const response = await axios.get("http://localhost:8000/visitantes/");
    const todos = response.data;

    const ativos = todos.filter((v) =>
      v.data_saida === null || v.data_saida === "" || v.data_saida === undefined
    );

    return ativos;
  } catch (error) {
    console.error("Erro ao buscar visitantes ativos:", error);
    return [];
  }
}