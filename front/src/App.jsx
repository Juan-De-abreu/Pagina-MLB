import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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
import PartidosAdmin from "./pages/admin/PartidosAdmin";
import UsuariosAdmin from "./pages/admin/UsuariosAdmin";
import AjustesCuenta from "./pages/AjustesCuenta";
import JugadoresAdmin from "./pages/admin/JugadoresAdmin";
import EquiposAdmin from "./pages/admin/EquiposAdmin";
import Favoritos from "./pages/Favoritos";
import Notificaciones from "./pages/Notificaciones";

// Layout para páginas no admin (header y footer)
const MainLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

// Layout para admin: navbar lateral + contenido + footer
const AdminLayout = () => (
  <div className="flex min-h-screen flex-col">
    <div className="flex flex-1">
      <NavbarAdmin />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
    <Footer />
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas protegidas admin */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/usuarios" element={<UsuariosAdmin />} />
            <Route path="/admin/jugadores" element={<JugadoresAdmin />} />
            <Route path="/admin/equipos" element={<EquiposAdmin />} />
            <Route path="/admin/partidos" element={<PartidosAdmin />} />
          </Route>
        </Route>

        {/* Rutas normales */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
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
          <Route path="*" element={<Home />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/ajustes" element={<AjustesCuenta />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
