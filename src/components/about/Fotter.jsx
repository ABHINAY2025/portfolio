import React from "react";

function Fotter() {
  return (
    <footer className="pt-10 pb-20 px-6 md:px-10 bg-fuchsia-300 border-t-2 border-fuchsia-600 flex flex-col md:flex-row justify-between items-start gap-6">
      {/* Title Section */}
      <h1 className="text-3xl md:text-4xl font-bold text-fuchsia-800">
        Abhinay_Ma
      </h1>

      {/* Links Section */}
      <ul className="flex flex-col gap-3 text-md md:text-lg text-fuchsia-700">
        <li>
          <a
            href="#"
            className="hover:text-fuchsia-900 transition duration-200"
          >
            Instagram
          </a>
        </li>
        <li>
          <a
            href="#"
            className="hover:text-fuchsia-900 transition duration-200"
          >
            LinkedIn
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Fotter;
