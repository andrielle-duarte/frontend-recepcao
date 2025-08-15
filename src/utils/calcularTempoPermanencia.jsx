export function calcularTempoPermanencia(dataEntrada) {
  const entrada = new Date(dataEntrada);
  const agora = new Date();
  const diffMs = agora - entrada;

  const segundosTotais = Math.floor(diffMs / 1000);
  const horas = Math.floor(segundosTotais / 3600);
  const minutos = Math.floor((segundosTotais % 3600) / 60);
  const segundos = segundosTotais % 60;

  return {
    tempoFormatado: `${horas.toString().padStart(2, "0")}h ${minutos
      .toString()
      .padStart(2, "0")}m ${segundos.toString().padStart(2, "0")}s`,
    totalMs: diffMs,
  };
}