import { BrowserRouter, Route, Routes } from "react-router"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./pages/Home"

const App = () => {
  return (

    <BrowserRouter>
      <div className="app">
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="*" element={<Home/>}/>
          </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App