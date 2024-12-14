import React from "react";

function Experience() {
  return (
    <>
      <div className="h-auto md:h-screen flex flex-col gap-20 mt-10 w-full p-6 md:px-10 lg:px-24">
        {/* Experience 1 */}
        <div className="w-full flex flex-col md:flex-row justify-between gap-6">
          <div className="w-full md:w-[40%]">
            <h1 className="text-2xl md:text-3xl font-bold">
              Accenture North America Project Management Job Simulation on Forage
            </h1>
            <p className="mt-3 text-lg">July 2024</p>
          </div>
          <div className="w-full md:w-[50%]">
            <p className="text-justify text-sm md:text-base">
              Completed a job simulation where I acted as a project manager for a hypothetical client launching a new brand. Mapped suitable project management approaches including Plan Driven, Agile, Second Agile, and Hybrid to a portfolio of projects.
            </p>
          </div>
        </div>

        {/* Experience 2 */}
        <div className="w-full flex flex-col md:flex-row justify-between gap-6">
          <div className="w-full md:w-[40%]">
            <h1 className="text-2xl md:text-3xl font-bold">
              WEB DEVELOPMENT INTERN, MOTION CUT
            </h1>
            <p className="mt-3 text-lg">FEB 2024 - MAR 2024</p>
          </div>
          <div className="w-full md:w-[50%]">
            <p className="text-justify text-sm md:text-base">
              As an intern, diving deeply into HTML, CSS, and JavaScript to create a user-friendly and dynamic interface. Enhanced functionality through dynamic content updates and responsive design techniques.
            </p>
          </div>
        </div>

        {/* Experience 3 */}
        <div className="w-full flex flex-col md:flex-row justify-between gap-6">
          <div className="w-full md:w-[40%]">
            <h1 className="text-2xl md:text-3xl font-bold">
              J.P. Morgan Software Engineering Virtual Experience on Forage
            </h1>
            <p className="mt-3 text-lg">July 2024</p>
          </div>
          <div className="w-full md:w-[50%]">
            <p className="text-justify text-sm md:text-base">
              Set up a local dev environment by downloading the necessary files, tools, and dependencies. Fixed broken files in the repository to make the web application output correctly. Used JPMorgan Chase's open-source library called Perspective to generate a live graph that displays a data feed in a clear and visually appealing way for traders to monitor.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Experience;
