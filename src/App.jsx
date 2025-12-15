import { useState } from "react";
import Home from "./components/home/home";
import About from "./components/about/about";
import Frames from "./components/Frames/Frames";
import Contact from "./components/contact/contact";
import ILander from "./components/home/ILander";
import Navbar from "./components/home/Navbar";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {

  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <BrowserRouter>

      {/* FLOATING ISLAND - always visible, but changes z-index when menu opens */}
      <ILander menuOpen={menuOpen} />

      <div
        className="
          min-h-screen 
          grid 
          grid-cols-1
          md:grid-cols-[96px_1fr]
        "
      >
        {/* NAVBAR */}
        <div className="relative">
          <Navbar setMenuOpen={setMenuOpen} />
        </div>

        {/* MAIN CONTENT */}
        <main className="relative min-h-screen overflow-x-hidden bg-transparent pt-[110px] md:pt-0">
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
