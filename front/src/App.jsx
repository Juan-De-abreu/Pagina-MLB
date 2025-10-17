import { BrowserRouter, Route, Routes } from "react-router"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./pages/Home"
import Estadisticas from "./pages/Estadisticas"
import Detalle from "./pages/Detalle"
import Jugadores from "./pages/Jugadores"
import Comparador from "./pages/Comparador"
import Mapa from "./pages/Home/Mapa"
import Equipos from "./pages/Equipos"
import DetalleEquipos from "./pages/Equipos/DetalleEquipos"
import Partidos from "./pages/Partidos"
import FormSesion from "./pages/FormSesion"
import Admin from "./pages/Admin"
import ProtectedRoutes from "./util/ProtectedRoutes"
import NavbarAdmin from "./components/NavbarAdmin"
const App = () => {
  return (

    <BrowserRouter>
      <div className="app">
        <Header/>
          <Routes>

            <Route element={<ProtectedRoutes/>}>
              <Route path="/admin" element={<Admin/>} />
            </Route>

            <Route path="/" element={<Home/>}/>
            <Route path="*" element={<Home/>}/>
            <Route path="/inicio" element={<Home/>}/>
            <Route path="/jugadores" element={<Jugadores/>}/>
            <Route path="/detalle/:id/:nom" element={<Detalle/>} />
            <Route path="/comparador" element={<Comparador/>} />
            <Route path="/estadisticas" element={<Estadisticas/>}/>
            <Route path="/mapa" element={<Mapa/>}/>
            <Route path="/equipos" element={<Equipos/>}/>
            <Route path="/equipo/:id/:nombre" element={<DetalleEquipos/>} />
            <Route path="/partidos" element={<Partidos/>} />
            <Route path="/Formsesion" element={<FormSesion/>} />

          </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App