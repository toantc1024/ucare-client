import React, { Fragment } from "react";
import { MdMedicalServices, MdHealthAndSafety } from "react-icons/md";

const Home = () => {
  return (
    <Fragment>
      <div className="relative flex w-full h-100  justify-between bg-[rgba(255,255,255, .5)]  items-center px-4 backdrop-blur-sm">
        <div className="m-2 flex flex-col h-[70vh] gap-2 justify-center ">
          <h1 className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-600 md:text-7xl text-3xl font-bold max-w-lg text-wrap">
            Digital health care
          </h1>
          <span className="text-lg w-[300px] font-semibold max-w-40 text-wrwap">
            Ask about health care and get the best answer from AI Empowered bot,
            and doctors!
          </span>
        </div>
        <div className="flex items-center relative justify-center">
          <div className="absolute z-[-1] right-[300px] top-50 w-80 h-80 bg-sky-500 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 flex justify-center items-center text-8xl text-white drop-shadow-lg">
            <MdMedicalServices className="drop-shadow-lg" />
          </div>

          <div className="absolute right-[50px] top-50  w-80 h-80 bg-sky-500 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 flex justify-center items-center text-8xl text-white  drop-shadow-lg">
            <MdHealthAndSafety className="drop-shadow-lg" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
