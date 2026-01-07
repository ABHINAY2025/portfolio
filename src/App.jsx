import { useState } from "react";
import Home from "./components/home/home";
import About from "./components/about/about";
import Frames from "./components/Frames/Frames";
import Contact from "./components/contact/contact";
import ILander from "./components/home/ILander";
import Navbar from "./components/home/Navbar";
import ARViewer from "./components/ARViewer";
import InvoiceMaker from "./components/InvoiceMaker";

// 🆕 BLOG PAGES
import BlogList from "./components/blog/blog-list";
import BlogPost from "./components/blog/blogs";

// 🆕 NEWSROOM
import Newsroom from "./components/Newsroom/Newsroom";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <BrowserRouter>

      {/* FLOATING ISLAND */}
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

            {/* CORE PAGES */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/SssneakPeek" element={<Frames />} />
            <Route path="/contact" element={<Contact />} />

            {/* BLOG */}
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

            
            {/* PROJECTS */}
            <Route path="/projects/ar-viewer" element={<ARViewer />} />
            <Route path="/projects/invoice-maker" element={<InvoiceMaker />} />

            {/* 📰 NEWSROOM */}
            <Route path="/newsroom" element={<Newsroom />} />

          </Routes>
        </main>
      </div>

    </BrowserRouter>
  );
}

export default App;
