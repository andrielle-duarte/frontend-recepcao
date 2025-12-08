import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
//import { useKeycloak } from '@react-keycloak/web';

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
import Footer from "../Components/Rodape";

export default function App() {
  const [atualizar, setAtualizar] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  //const keycloak = useKeycloak();

  useEffect(() => {
    
    if (keycloak.authenticated && keycloak.refreshToken) {
      console.log('✅ Refresh token disponível:', !!keycloak.refreshToken);
      console.log('Token preview:', keycloak.refreshToken?.substring(0, 50) + '...');
      
      keycloak.updateToken(30).then(refreshed => {
        console.log('✅ Renovação OK:', refreshed);
        if (refreshed && keycloak.token) {
          setToken(keycloak.token);
          localStorage.setItem("token", keycloak.token);
        }
      }).catch(err => {
        console.error('❌ Erro renovação:', err);
      });
    }
  }, []);  

  const handleLogout = () => {
    keycloak.logout();
    setToken(null);
    localStorage.removeItem("token");
  };

  const handleCadastro = (dados) => {
    console.log("Visitante cadastrado", dados);
    setAtualizar((prev) => !prev);
  };

  return (
    <Router>
      <div className="app-root">
        <ErrorBoundary>
          {token && (
            <>
              <Topo />
              <Navbar onLogout={handleLogout} />
            </>
          )}

          <main className="app-main">
            <Routes>
              {!token && (
                <Route path="/login" element={<Login onLogin={setToken} />} />
              )}

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

              <Route path="/erro" element={<Erro />} />

              <Route
                path="*"
                element={<Navigate to={token ? "/" : "/login"} />}
              />
            </Routes>
          </main>
        </ErrorBoundary>

        <ToastContainer position="top-center" autoClose={3000} />
        <Footer />
      </div>
    </Router>
  );
}
