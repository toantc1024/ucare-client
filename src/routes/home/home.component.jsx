import React, { Fragment } from "react";
import { MdMedicalServices, MdHealthAndSafety } from "react-icons/md";

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
              Ask about health care and get the best answer from AI Empowered bot, and doctors!
            </p>
            <a
              href="#"
              class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-emerald-400 to-sky-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
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
            </a>
          </div>
          <div class="lg:mt-0 lg:col-span-5 lg:flex">
            <div className="absolute z-[-1] right-[300px] top-50 w-80 h-80 bg-sky-500 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 flex justify-center items-center text-8xl text-white drop-shadow-lg">
              <MdMedicalServices className="drop-shadow-lg" />
            </div>

            <div className="absolute right-[50px] top-50  w-80 h-80 bg-sky-500 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 flex justify-center items-center text-8xl text-white  drop-shadow-lg">
              <MdHealthAndSafety className="drop-shadow-lg" />
            </div>
          </div>
        </div>
      </section>
      <section class="bg-white dark:bg-gray-900">
        <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">About We!</h2>
            <p class="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum
            </p>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-8">
            <img
              class="w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
              alt="office content 1"
            />
            <img
              class="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
              alt="office content 2"
            />
          </div>
        </div>
      </section>

      
    </Fragment>
  );
};

export default Home;
