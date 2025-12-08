import Home from "./components/home/home";
import About from "./components/about/about";
import Frames from "./components/Frames/Frames";
import Contact from "./components/contact/contact";

import Navbar from "./components/home/Navbar";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      
      {/* ✅ APP GRID LAYOUT */}
      <div className="min-h-screen grid grid-cols-[96px_1fr] relative">

        {/* ✅ NAVBAR COLUMN */}
        <div className="relative">
          <Navbar />
        </div>

        {/* ✅ MAIN CONTENT COLUMN */}
        <main className="relative min-h-screen overflow-x-hidden bg-transparent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/Frames" element={<Frames />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

      </div>

    </BrowserRouter>
  );
}

export default App;
