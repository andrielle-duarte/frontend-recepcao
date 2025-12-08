import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./style.css";
import axios from "axios";
import { isValidCPF } from "./cpfValidator";
import Swal from "sweetalert2";


// Validação com Yup do formulário
const schema = yup
  .object({
    nome: yup.string().required("Campo obrigatório"),
    documento: yup
      .string()
      .matches(/^\d+$/, "Apenas números")
      .test(
        "cpf-rg",
        "Informe um CPF válido ou um RG numérico",
        (value) => {
          if (!value) return false;
          if (value.length === 11) return isValidCPF(value);
          return value.length === 9 || value.length === 10;
        }
      )
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

  const onInvalid = (errors) => {
    console.log("Erros de validação:", errors);
  };

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");

      const visitanteResponse = await axios.post(
        "http://localhost:8000/visitantes",
        {
          ...data,
          data_entrada: new Date().toLocaleString("sv-SE").replace(" ", "T"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const visitante = visitanteResponse.data;

      const visitaData = {
        visitante_id: visitante.id,
        motivo_visita: visitante.motivo_visita,
        data_entrada: visitante.data_entrada,
        data_saida: null,
      };

      const visitaResponse = await axios.post(
        "http://localhost:8000/visitas/",
        visitaData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Visita iniciada:", visitaResponse.data);
      onCadastro();
      reset({
        nome: "",
        documento: "",
        motivo_visita: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar ou iniciar visita:", error);

      const mensagem =
        error.response?.data?.detail ||
        "Erro inesperado ao cadastrar visitante.";

      Swal.fire({
        icon: "warning",
        title: "Atenção",
        text: mensagem,
        confirmButtonText: "OK",
        confirmButtonColor: "#6aed6a",
      });
    }
  }; 

  return (
    <div className="centralizarTudo">
      <div className="containerCadastrar">
        <form
          className="conteudo"
          onSubmit={handleSubmit(onSubmit, onInvalid)}
        >
          <h4 className="titulo">Cadastro de visitante</h4>

          <label>
            <input {...register("nome")} type="text" placeholder="Nome" />
            <span className="">{errors.nome?.message}</span>
          </label>

          <label>
            <input
              {...register("documento")}
              type="text"
              placeholder="Identificação (CPF/RG)"
            />
            <span className="">{errors.documento?.message}</span>
          </label>

          <label>
            <input
              {...register("motivo_visita")}
              type="text"
              placeholder="Motivo da Visita"
            />
            <span className="">{errors.motivo_visita?.message}</span>
          </label>

          <button className="botaoCadastrar" type="submit">
            Cadastrar visitante
          </button>
        </form>
      </div>
    </div>
  );
}

