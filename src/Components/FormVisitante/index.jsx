import { useForm } from "react-hook-form";
import { createVisitor } from "../../api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

import "./style.css";
import axios from "axios";

// Validação com Yup
const schema = yup.object({
  nome: yup.string().required("Campo obrigatório"),
  documento: yup
    .string()
    .matches(/^\d+$/, "Apenas números")
    .required("Campo obrigatório"),
  motivo_visita: yup.string().required("Campo obrigatório"),
}).required();

export default function Home({ onCadastro}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

const onSubmit = (data) => {
  const visitante = {
    ...data,
    data_entrada: new Date().toLocaleString("sv-SE").replace(" ", "T")
  };

  axios.post("http://localhost:8000/visitantes/", visitante)
    .then((response) => {
      console.log("Visitante cadastrado:", response.data);
      onCadastro();
      reset();
    })
    .catch((error) => {
      console.error("Erro ao cadastrar:", error);
    });
};

  return (
    <div className="containerCadastrar">
      <form className="conteudo" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="titulo">Cadastro de visitante</h4>

        <label>
          <input
            {...register("nome")}
            type="text"
            placeholder="Nome"
          />
          <span className="spanAlerta">{errors.nome?.message}</span>
        </label>

        <label>
          <input
            {...register("documento")}
            type="text"
            placeholder="Identificação"
          />
          <span className="spanAlerta" >{errors.documento?.message}</span>
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
    
  );
}
