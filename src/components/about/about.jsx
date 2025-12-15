import abhinay from "../../images/abhinay.jpg";
import { motion } from "framer-motion";
import Fotter from "../home/Fotter";

export default function About() {
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



      {/* ============================= LEADERSHIP SECTION ============================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <h2 className="uppercase text-sm tracking-widest text-gray-500 mb-4">
          Leadership
        </h2>

        <h3 className="text-2xl md:text-3xl font-semibold mb-10 text-black">
          I cultivated communities & teams.
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* CARD 1 */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902"
              className="rounded-xl w-full h-60 object-cover"
            />
            <h4 className="font-semibold mt-4">Design Lead</h4>
            <p className="text-gray-600 text-sm">Tech & Innovation Club</p>
          </div>

          {/* CARD 2 */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
              className="rounded-xl w-full h-60 object-cover"
            />
            <h4 className="font-semibold mt-4">President</h4>
            <p className="text-gray-600 text-sm">UX Community Group</p>
          </div>

          {/* CARD 3 */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51"
              className="rounded-xl w-full h-60 object-cover"
            />
            <h4 className="font-semibold mt-4">Vice President</h4>
            <p className="text-gray-600 text-sm">Design Consulting</p>
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
