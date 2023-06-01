import React, { Fragment } from "react";
import { MdMedicalServices, MdHealthAndSafety } from "react-icons/md";
import { Link } from "react-router-dom";
import FirstImage from "../../assets/f1.jpeg";
import SecondImage from "../../assets/f2.jpeg";

const Home = () => {
  return (
    <Fragment>
      <section class="bg-white">
        <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-600 md:text-7xl text-3xl max-w-lg text-wrap pb-5">
              Digital health care
            </h1>
            <p class="text-lg w-[300px] font-semibold max-w-40 text-wrwap pb-5">
              Ask about health care and get the best answer from AI Empowered
              bot, clear your fitness goals and more!
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

      <section class="bg-white dark:bg-gray-900">
        <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
              About WhaleCare!
            </h2>
            <p class="mb-4">
              From the healthcare problem, we can build a web app that can
              support the secure storage of users' records (Electronic Health
              Book), through which users can monitor and update their health
              information. self. Besides providing a virtual assistant (A.I
              Chatbot) that can give feedback on users' inquiries related to the
              symptoms of certain diseases quickly and accurately.
            </p>
            <p>
              At the same time, the web also supports giving advice based on the
              habits and behaviors provided by the user (reminders to drink
              water during the day, reminders of daily activities such as
              eating, sleeping, ...). Thereby becoming an effective and
              convenient tool in supporting users' health improvement as well as
              reducing the burden on the health system.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-8">
            <img class="w-full rounded-lg" src={FirstImage} alt="Whale 1" />
            <img
              class="mt-4 w-full lg:mt-10 rounded-lg"
              src={SecondImage}
              alt="Whale 2"
            />
          </div>
        </div>
      </section>
      <footer class="p-4  bg-gradient-to-r from-emerald-400 to-sky-600  sm:p-6">
        <div class="mx-auto max-w-screen-xl">
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
