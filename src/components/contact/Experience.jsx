import React from "react";

function Experience() {
  return (
    <>
      <div className="h-screen flex flex-col gap-20 mt-10 w-full px-24">
        <div className=" w-full flex justify-between px-10">
          <div className=" w-[40%]">
            <h1 className="text-3xl">
              Accenture North America Project Management Job Simulation on
              Forage
            </h1>
            <p className="mt-3">July 2024</p>
          </div>
          <div className="w-[50%]">
            <p className="text-justify">
              {" "}
              Completed a job simulation where I acted as a project manager for
              a hypothetical client who were launching a new brand. Mapped
              suitable project management approaches including Plan Driven,
              Agile,Second Agile and Hybrid to a portfolio of projects.
            </p>
          </div>
        </div>

        <div className=" w-full flex justify-between px-10">
          <div className=" w-[40%]">
            <h1 className="text-3xl">WEB DEVELOPMENT INTERN, MOTION CUT</h1>
            <p className="mt-3">FEB 2024 - MAR 2024</p>
          </div>
          <div className="w-[50%]">
            <p className="text-justify">
              As an intern, diving deeply into HTML, CSS, and JavaScript to
              create an user-friendly and Dynamic interface. Enhanced
              functionality through dynamic content updates and responsive
              design techniques.
            </p>
          </div>
        </div>

        <div className=" w-full flex justify-between px-10">
          <div className="w-[40%]">
            <h1 className="text-3xl">
              J.P. Morgan Software Engineering Virtual Experience on Forage
            </h1>
            <p className="mt-3">July 2024</p>
          </div>
          <div className="w-[50%]">
            <p className="text-justify">
              Setting up a local dev environment by downloading the necessary files,
              tools and dependencies. Fixed broken files in the repository to
              make web application output correctly. Used JPMorgan Chase’s open
              source library called Perspective to generate a live graph that
              displays a data feed in a clear and visually appealing way for
              traders to monitor
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Experience;
