import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useState } from "react";
import { useEffect } from "react";
import keycloak from "../keycloak";
import Home from "../Pages/Home";
import VisitantesPage from "../Pages/VisitantePage";
import BuscarVisitante from "../Components/BuscaVisitante";
import BuscaResultado from "../Components/BuscaResultado";
import FormVisitante from "../Components/FormVisitante";
import Topo from "../Components/Topo";
import Navbar from "../Components/Navbar";
import PainelAtivos from "../Pages/PainelAtivos";
import HistoricoVisitas from "../Components/HistoricoVisitas";
import Historico from "../Components/Historico";
import Login from "../Components/Login";
import Erro from "../Components/Erro";
import PrivateRoute from "../Components/PrivateRoute";
import ErrorBoundary from "../Components/ErrorBoundary/errorBoundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function App() {
  const [atualizar, setAtualizar] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));


  // Atualiza token periodicamente
  useEffect(() => {
    const interval = setInterval(() => {
      keycloak.updateToken(10).then(refreshed => {
        if (refreshed) {
          setToken(keycloak.token);
          localStorage.setItem("token", keycloak.token);
        }
      }).catch(() => {
        console.log("Token update failed");
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);
  const handleLogout = () => {
    keycloak.logout();
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <ErrorBoundary>
        {token && (
          <>
            <Topo />
            <Navbar onLogout={handleLogout} />
            <div>
              {token ? <h1>Logado</h1> : <h1>Não logado</h1>}
            </div>
          </>
        )}
        <Routes>
          {/* Login */}
          {!token && (
            <Route path="/login" element={<Login onLogin={setToken} />} />
          )}

          {/* Rotas protegidas */}
          {token && (
            <>
              <Route
                path="/"
                element={
                  <PrivateRoute token={token}>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/visitantes"
                element={
                  <PrivateRoute token={token}>
                    <VisitantesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/ativos"
                element={
                  <PrivateRoute token={token}>
                    <PainelAtivos atualizar={atualizar} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/buscar"
                element={
                  <PrivateRoute token={token}>
                    <BuscarVisitante />
                  </PrivateRoute>
                }
              />
              <Route
                path="/resultados"
                element={
                  <PrivateRoute token={token}>
                    <BuscaResultado />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cadastro"
                element={
                  <PrivateRoute token={token}>
                    <FormVisitante onCadastro={handleCadastro} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/historico/:id"
                element={
                  <PrivateRoute token={token}>
                    <HistoricoVisitas />
                  </PrivateRoute>
                }
              />
              <Route
                path="/historico"
                element={
                  <PrivateRoute token={token}>
                    <Historico />
                  </PrivateRoute>
                }
              />
            </>
          )}

          {/* Página de erro */}
          <Route path="/erro" element={<Erro />} />

          {/* Redirecionamento padrão */}
          <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
        </Routes>
      </ErrorBoundary>
      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
}
