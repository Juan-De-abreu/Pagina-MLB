import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NavbarAdmin from "./components/NavbarAdmin";

import Home from "./pages/Home";
import Estadisticas from "./pages/Estadisticas";
import Detalle from "./pages/Detalle";
import Jugadores from "./pages/Jugadores";
import Comparador from "./pages/Comparador";
import Mapa from "./pages/Home/Mapa";
import Equipos from "./pages/Equipos";
import DetalleEquipos from "./pages/Equipos/DetalleEquipos";
import Partidos from "./pages/Partidos";
import FormSesion from "./pages/FormSesion";
import Admin from "./pages/Admin";

import ProtectedRoutes from "./util/ProtectedRoutes";

const Layout = ({ children }) => {
  const location = useLocation();

  // Mostrar NavbarAdmin solo en rutas que empiezan con /admin
  const isAdminRoute = location.pathname.startsWith("/admin/usuarios");

  return (
    <>
      {isAdminRoute ? <NavbarAdmin /> : <Header />}
      {children}
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Ruta protegida admin */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/admin/usuarios" element={<Admin />} />
          </Route>

          {/* Rutas normales */}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/jugadores" element={<Jugadores />} />
          <Route path="/detalle/:id/:nom" element={<Detalle />} />
          <Route path="/comparador" element={<Comparador />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/equipos" element={<Equipos />} />
          <Route path="/equipo/:id/:nombre" element={<DetalleEquipos />} />
          <Route path="/partidos" element={<Partidos />} />
          <Route path="/Formsesion" element={<FormSesion />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
