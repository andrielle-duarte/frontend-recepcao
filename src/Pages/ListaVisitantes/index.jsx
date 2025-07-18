
export default function ListaVisitantes({ visitantes }) {
  return (
    <ul>
      {visitantes.map((v) => (
        <li key={v.id}>
          <strong>{v.nome}</strong> — {v.documento}
          <button>Iniciar Visita</button>
        </li>
      ))}
    </ul>
  );
}