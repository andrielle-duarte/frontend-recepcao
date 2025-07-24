import { useForm } from "react-hook-form";
import { createVisitor } from "../../api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import "./style.css";
import axios from "axios";

// Validação com Yup
const schema = yup
  .object({
    nome: yup.string().required("Campo obrigatório"),
    documento: yup
      .string()
      .matches(/^\d+$/, "Apenas números")
      .required("Campo obrigatório"),
    motivo_visita: yup.string().required("Campo obrigatório"),
  })
  .required();

export default function Home({ onCadastro }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
  try {
    // 1. Cadastrar o visitante
    const visitanteResponse = await axios.post("http://localhost:8000/visitas/visitantes", {
      ...data,
      data_entrada: new Date().toLocaleString("sv-SE").replace(" ", "T")
    });

    const visitante = visitanteResponse.data;

    // 2. Iniciar a visita com o ID do visitante retornado
    const visitaData = {
      visitante_id: visitante.id,
      motivo_visita: visitante.motivo_visita,
      data_entrada: visitante.data_entrada,
      data_saida: null, // ou deixe sem enviar, se for opcional
    };

    const visitaResponse = await axios.post("http://localhost:8000/visitas/", visitaData);

    console.log("Visita iniciada:", visitaResponse.data);
    onCadastro();
    reset({
      nome: "",
      documento: "",
      motivo_visita: "",
    });
  } catch (error) {
    console.error("Erro ao cadastrar ou iniciar visita:", error);
  }
};



  const navigate = useNavigate();
  const irParaBusca = () => {
    navigate("/");
  };

  const irParaAtivos = () => {
    navigate("/ativos");
  };

  return (
    <>
      <div className="containerBotaoVisitantes">
        <button onClick={irParaBusca} className="btnVisitantes">
          Tela de busca
        </button>
        <button onClick={irParaAtivos} className="btnVisitantes">
          Visitantes Ativos
        </button>
      </div>
      <div className="containerCadastrar">
        <form className="conteudo" onSubmit={handleSubmit(onSubmit)}>
          <h4 className="titulo">Cadastro de visitante</h4>

          <label>
            <input {...register("nome")} type="text" placeholder="Nome" />
            <span className="spanAlerta">{errors.nome?.message}</span>
          </label>

          <label>
            <input
              {...register("documento")}
              type="text"
              placeholder="Identificação"
            />
            <span className="spanAlerta">{errors.documento?.message}</span>
          </label>

          <label>
            <input
              {...register("motivo_visita")}
              type="text"
              placeholder="Motivo da Visita"
            />
            <span className="spanAlerta">{errors.motivo_visita?.message}</span>
          </label>

          <button className="botaoCadastrar" type="submit">
            Cadastrar visitante
          </button>
        </form>
      </div>
    </>
  );
}
