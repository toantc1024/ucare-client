import React, { Fragment, useEffect, useState } from "react";
import {
  MdMedicalServices,
  MdFavorite,
  MdHealthAndSafety,
  MdMonitorHeart,
} from "react-icons/md";

import { Link } from "react-router-dom";
import FirstImage from "../../assets/f1.jpeg";
import SecondImage from "../../assets/f2.jpeg";
const Home = () => {
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserName(user.displayName);
    }
  }, []);

  return (
    <Fragment>
      <section class="bg-white">
        <div class="grid w-full px-16 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 ">
          <div class="mr-auto place-self-center lg:col-span-7 ">
            <h1 class="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-600 md:text-7xl text-3xl max-w-lg text-wrap pb-5">
              Digital health care
            </h1>
            <p class="text-2xl font-bold w-[450px] font-semibold max-w-40 text-wrap pb-5">
              Ask for advice from AI Empowered bot, build your own fitness
              schedule and more!
            </p>
            <Link
              to={"./chat"}
              class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-emerald-400 to-sky-600 hover:bg-blue-800"
            >
              Try Now!
              <svg
                class="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
          <div class="lg:mt-0 lg:col-span-5 lg:flex">
            <div className="absolute z-[1] right-[300px] top-50 w-80 h-80 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 flex justify-center items-center text-8xl text-white drop-shadow-lg">
              <MdMedicalServices className="drop-shadow-lg" />
            </div>

            <div className="absolute z-[2] right-[50px] top-50  w-80 h-80 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 flex justify-center items-center text-8xl text-white  drop-shadow-lg">
              <MdHealthAndSafety className="drop-shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      <section className="m-8">
        <div className="grid text-4xl grid-cols-3 items-center w-full justify-center border-[1px]  shadow-sm p-16 rounded-lg relative">
          <div className="flex justify-center">
            <div
              className="
        
        w-40 h-40 bg-gradient-to-r from-sky-400 to-sky-600 text-8xl rounded-full items-center justify-center flex text-white drop-shadow-lg"
            >
              <MdMonitorHeart className="drop-shadow-lg" />
            </div>
          </div>

          <div
            className="text-center
          text-transparent  bg-clip-text bg-gradient-to-b from-sky-400 to-sky-600 md:text-7xl text-3xl text-wrap pb-5
          font-extrabold mt-4"
          >
            Healthy lifestyle
          </div>

          <p className="text-center text-sky-400 mx-8 font-bold">
            Get the best health care and fitness goals
          </p>
        </div>
      </section>

      <section className="m-8">
        <div className="grid text-4xl grid-cols-3 items-center w-full justify-center border-[1px]  shadow-sm p-16 rounded-lg ">
          <p className="text-center text-emerald-500 font-bold mx-8 ">
            You are meant to have an amazing life!
          </p>

          <div
            className="text-center
        text-transparent  bg-clip-text bg-gradient-to-b from-emerald-400 to-emerald-500 md:text-7xl text-3xl text-wrap pb-5
        font-extrabold mt-4"
          >
            Anytime & Anywhere
          </div>
          <div className="flex justify-center">
            <div
              className="
    
    w-40 h-40 bg-gradient-to-r from-green-400 to-emerald-600 text-8xl rounded-full items-center justify-center flex text-white drop-shadow-lg"
            >
              <MdFavorite className="drop-shadow-lg" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white m-4">
        <div class="flex flex-col gap-2 w-full text-center text-4xl font-bold justify-center items-center "></div>
      </section>

      <section class="bg-gray-900">
        <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-5xl font-extrabold font-extrabold text-transparent  bg-clip-text bg-gradient-to-b from-sky-400 to-sky-600 max-w-lg text-wrap pb-5">
              About WhaleCare!
            </h2>
            <p className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-t from-emerald-400 to-sky-600 md:text-2xl text-3xl max-w-lg text-wrap pb-5">
              From the healthcare problem, we have built a solution help user to
              get advices about health care.
            </p>
            <p className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-t from-emerald-400 to-emerald-600 md:text-2xl text-3xl max-w-lg text-wrap pb-5">
              At the same time, WhaleCare track user habits in nutrition and
              workout to provide the best health improvement system.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-8 ">
            <img class="w-full rounded-lg " src={FirstImage} alt="Whale 1" />
            <img
              class="mt-4 w-full lg:mt-10 rounded-lg"
              src={SecondImage}
              alt="Whale 2"
            />
          </div>
        </div>
      </section>
      <footer class="p-4  bg-gradient-to-r from-emerald-400 to-sky-600  sm:p-6">
        <div class="font-bold mx-auto max-w-screen-xl">
          <div class="sm:flex sm:items-center sm:justify-between">
            <span class="flex gap-2 text-sm text-white sm:text-center">
              <a href="">@2023</a>
              <a href="#" class="hover:underline">
                WhaleCare - P0t4t03s team.
              </a>
            </span>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Home;
