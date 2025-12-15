import abhinay from "../../images/abhinay.jpg";
import { motion } from "framer-motion";
import Fotter from "../home/Fotter";
import { useRef } from "react";




export default function About() {

  const draggedRef = useRef(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-[#eef2f6]"
    >
      {/* ============================= INTRO SECTION ============================= */}
      <section className="max-w-7xl mx-auto pt-32 px-5 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

  {/* LEFT — TEXT */}
  <div className="flex flex-col gap-6">
    
    <h1 className="
      font-bold text-black leading-tight
      text-3xl sm:text-4xl md:text-5xl lg:text-[46px]
    ">
      I’m Abhinay — I build for community and 
      uncover stories through code & design.
    </h1>

    <p className="text-gray-700 text-[15px] sm:text-[16px] leading-relaxed">
      Growing up surrounded by creativity fueled my curiosity to understand 
      how communities shape everyday experiences. As individuals, we possess 
      unique histories — yet many of us unknowingly share the same emotions 
      and frustrations.
    </p>

    <p className="text-gray-700 text-[15px] sm:text-[16px] leading-relaxed">
      I’ve spent years learning from the stories around me. From tech to design, 
      filmmaking, and psychology — every skill led me toward building meaningful, 
      human-centered digital products.
    </p>

    <p className="text-gray-700 text-[15px] sm:text-[16px] leading-relaxed">
      Today, I specialize in emerging technology, creative problem solving, and 
      full-stack development. I focus on making tools, experiences, and systems 
      that feel effortless.
    </p>

  </div>

  {/* RIGHT — IMAGE */}
  <div className="flex justify-center lg:justify-end">
    <img
      src={abhinay}
      className="
        w-full max-w-md lg:max-w-lg
        rounded-2xl shadow-xl object-cover 
      "
      alt="Abhinay"
    />
  </div>

</section>

{/* ================= FLOATING DRAGGABLE RESUME PILL ================= */}
<motion.a
      href="/src/resume/IBM.pdf"
      target="_blank"
      rel="noopener noreferrer"

      drag
      dragMomentum={false}
      dragElastic={0.12}

      onDragStart={() => {
        draggedRef.current = true;
      }}

      onDragEnd={() => {
        // small delay so click doesn't fire after drag
        setTimeout(() => {
          draggedRef.current = false;
        }, 50);
      }}

      onClick={(e) => {
        if (draggedRef.current) {
          e.preventDefault(); // 🚫 STOP PDF OPEN
        }
      }}

      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}

      className="
        fixed
        top-[90px] md:top-24
        right-4 md:right-8
        z-[1300]
        px-6 py-3
        rounded-full
        bg-white/80 backdrop-blur-md
        border border-black/10
        text-sm font-semibold
        text-black
        shadow-lg
        cursor-grab active:cursor-grabbing
        select-none
      "
    >
      Resume ↗
    </motion.a>
      
      
      
{/* ============================= EXPERIENCE ============================= */}
<section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">

  {/* SECTION HEADER */}
  <h2 className="uppercase text-sm tracking-widest text-gray-500 mb-4">
    Experience
  </h2>

  <h3 className="text-2xl md:text-3xl font-semibold mb-12 text-black">
    Building systems, products & real-world solutions.
  </h3>

  {/* GRID */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

    {/* CARD 1 — CURRENT */}
    <div className="p-6 border border-red-500  rounded-2xl hover:shadow-lg transition">
      <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
        Current
      </p>

      <h4 className="text-lg font-semibold">
        Java + Microservices Backend Developer
      </h4>

      <p className="text-gray-700 font-medium mt-1">
        FISEC Global
      </p>

      <p className="text-gray-600 text-sm mt-3 leading-relaxed">
        Working on backend systems using Java and microservices architecture,
        focusing on scalable APIs, service-to-service communication, and
        enterprise-grade backend reliability.
      </p>
    </div>

    {/* CARD 2 */}
    <div className="p-6 border rounded-2xl hover:shadow-lg transition">

      <h4 className="text-lg font-semibold">
        Project Management Job Simulation
      </h4>

      <p className="text-gray-700 font-medium mt-1">
        Accenture North America · Forage
      </p>

      <p className="text-gray-600 text-sm mt-3 leading-relaxed">
        Acted as a project manager for a new brand launch. Mapped Plan-Driven,
        Agile, Scaled Agile, and Hybrid methodologies across a portfolio of
        projects.
      </p>
    </div>

    {/* CARD 3 */}
    <div className="p-6 border rounded-2xl hover:shadow-lg transition">

      <h4 className="text-lg font-semibold">
        Web Development Intern
      </h4>

      <p className="text-gray-700 font-medium mt-1">
        Motion Cut
      </p>

      <p className="text-gray-600 text-sm mt-3 leading-relaxed">
        Built responsive, user-friendly interfaces using HTML, CSS, and
        JavaScript. Implemented dynamic content updates and improved UI
        performance across devices.
      </p>
    </div>

    {/* CARD 4 */}
    <div className="p-6 border rounded-2xl hover:shadow-lg transition">


      <h4 className="text-lg font-semibold">
        Software Engineering Virtual Experience
      </h4>

      <p className="text-gray-700 font-medium mt-1">
        J.P. Morgan Chase & Co. · Forage
      </p>

      <p className="text-gray-600 text-sm mt-3 leading-relaxed">
        Fixed broken repository files, set up a local dev environment, and used
        JPMorgan’s <span className="font-medium">Perspective</span> library to
        build live data visualizations for traders.
      </p>
    </div>

  </div>
</section>



      {/* ============================= CORE VALUES ============================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        
        <h2 className="uppercase text-sm tracking-widest text-gray-500 mb-4">
          My Core Values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Value 1 */}
          <div className="p-6 rounded-xl bg-white shadow-lg">
            <span className="text-2xl">✦</span>
            <h3 className="mt-4 font-semibold text-lg">Always stay learning.</h3>
          </div>

          {/* Value 2 */}
          <div className="p-6 rounded-xl bg-white shadow-lg">
            <span className="text-2xl">✦</span>
            <h3 className="mt-4 font-semibold text-lg">
              Navigate every day with intention.
            </h3>
          </div>

          {/* Value 3 */}
          <div className="p-6 rounded-xl bg-white shadow-lg">
            <span className="text-2xl">✦</span>
            <h3 className="mt-4 font-semibold text-lg">
              Empathize deeply — build for people, not pixels.
            </h3>
          </div>

        </div>

      </section>

      <Fotter />
    </motion.div>
  );
}
