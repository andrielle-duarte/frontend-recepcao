import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o estado para mostrar a UI alternativa
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Você pode logar o erro em um serviço de monitoramento
    console.error("Erro capturado pelo ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
          <h2>Algo deu errado.</h2>
          <p>Estamos trabalhando para corrigir o problema.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
