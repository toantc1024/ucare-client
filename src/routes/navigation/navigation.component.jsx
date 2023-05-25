import React, { Fragment, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import LinkTag from "../../components/navigation/navLink";
import { getCurrentUser } from "../../utils/backend-data/user";
import { fetchUser } from "../../utils/firebase/firebase.utils";
import { getAuth } from "firebase/auth";

const Navigation = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = fetchUser();
    console.log(user);
    setUser(user);
  }, [getAuth()]);

  return (
    <Fragment>
      <nav class="flex gap-2 items-center justify-between relative fixed py-4 border-gray-200 dark:bg-gray-900 px-4 border-[1px] ">
        <div class="w-full flex flex-wrap items-center justify-between mx-auto p-4 ml-4 mr-4">
          {
            // <div className="left-[-5px] rounded-full w-10 h-10 bg-gradient-to-r from-emerald-400 to-sky-500  absolute z-[-10] "></div>
          }
          <div
            className="font-bold relative hover:cursor-pointer"
            onClick={() => navigate("./")}
          >
            <h1 className="text-3xl z-[100] ">WhaleCare</h1>
            <div className="bg-gradient-to-r from-emerald-400 to-sky-500 bg-none  rounded-full  top-0 absolute  z-[0] right-[-10px] blur-4 drop-filter-blur">
              <sup className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-600 text-3xl">
                +
              </sup>
            </div>
          </div>

          <div className="flex gap-8 justify-center items-center p-1 rounded-full">
            <div className="flex gap-8 text-xl">
              <Link
                onClick={() => setIsMenuOpen(false)}
                to={"./"}
                className="hover:cursor-pointer hover:text-sky-500 font-semibold"
              >
                Home
              </Link>
              <Link
                onClick={() => setIsMenuOpen(false)}
                to={"./dashboard"}
                className="hover:cursor-pointer hover:text-sky-500 font-semibold"
              >
                Dashboard
              </Link>
              <Link
                onClick={() => setIsMenuOpen(false)}
                href=""
                className="flex items-center gap-2 hover:cursor-pointer hover:text-sky-500 font-semibold"
                to={"./chat"}
              >
                Chat{" "}
                <span class="bg-sky-200 font-bold text-blue-800 text-xs mr-2 px-2.5 py-0.5 rounded-full dark:bg-sky-900 dark:text-blue-300">
                  AI
                </span>
              </Link>
            </div>
            <div className="relative">
              {user ? (
                <div
                  className="hover:cursor-pointer hover:bg-gray-200  p-1 rounded-full"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <img
                    className="h-10 w-10 rounded-full  hover:cursor-pointer hover:bg-gray-200 rounded-full"
                    src="https://lh3.googleusercontent.com/a/AAcHTtfYV5CJXYi93tJ21f3JIVnQ_J6ep17JKkNDkSvjfQ=s83-c-mo"
                    alt=""
                  />
                </div>
              ) : (
                <div className="flex gap-2 items-center justify-center">
                  <button
                    onClick={() => handleNavigate("./login")}
                    className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => handleNavigate("./signup")}
                    className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                  >
                    Sign up
                  </button>
                </div>
              )}
              <div
                class={`z-50 ${
                  !isMenuOpen ? "hidden" : ""
                } absolute right-[40px] md:right-[0px] my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                id="user-}dropdown"
              >
                <div class="px-4 py-3">
                  <span class="block text-sm text-gray-900 dark:text-white">
                    Tran Cong Toan
                  </span>
                  <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">
                    tctoan1024@gmail.com
                  </span>
                </div>
                <ul class="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      onClick={() => setIsMenuOpen(false)}
                      to={"./profile"}
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setIsMenuOpen(false)}
                      to={"./setting"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <a
                      href=""
                      onClick={() => {
                        localStorage.removeItem("user");
                        handleNavigate("./");
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
