import { BrowserRouter, Route, Routes } from "react-router"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./pages/Home"
import Estadisticas from "./pages/Estadisticas"
import Detalle from "./pages/Detalle"
import Jugadores from "./pages/Jugadores"

const App = () => {
  return (

    <BrowserRouter>
      <div className="app">
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="*" element={<Home/>}/>
            <Route path="/inicio" element={<Home/>}/>
            <Route path="/jugadores" element={<Jugadores/>}/>
            <Route path="/detalle/:id/:nom" element={<Detalle/>} />

            <Route path="/estadisticas" element={<Estadisticas/>}/>
          </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App