import First from './components/home/First'
import Home from './components/home/home';
import About from './components/about/about'
import Navbar from './components/home/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from './components/contact/contact';
import './App.css'
function App() {
  return (
    <>
    <BrowserRouter>
         <Navbar/>
      <Routes>
        <Route path="/about" element={<About/>}>
        </Route>
        <Route path="/" element={<Home/>}>
        </Route>
        <Route path="/contact" element={<Contact/>}>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
