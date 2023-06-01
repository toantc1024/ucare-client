import React, { Fragment, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import LinkTag from "../../components/navigation/navLink";
import { getCurrentUser } from "../../utils/backend-data/user";
import { fetchUser } from "../../utils/firebase/firebase.utils";
import { getAuth } from "firebase/auth";

const Navigation = ({ user, setCurrentUser }) => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <Fragment>
      <nav class="flex gap-2 items-center justify-between relative fixed top-0 bg-gray-900 px-4 h-28">
        <div class="w-full  flex flex-wrap items-center justify-between mx-auto p-4 ml-4 mr-4">
          {
            // <div className="left-[-5px] rounded-full w-10 h-10 bg-gradient-to-r from-emerald-400 to-sky-500  absolute z-[-10] "></div>
          }
          <div
            className="font-bold relative hover:cursor-pointer"
            onClick={() => navigate("./")}
          >
            <h1 className="text-3xl text-white z-[100] ">WhaleCare</h1>
            <div className="bg-gradient-to-r from-emerald-400 to-sky-500 bg-none rounded-full  top-0 absolute  z-[0] right-[-10px] blur-4 drop-filter-blur">
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
                className="hover:cursor-pointer hover:text-sky-500 font-semibold text-white"
              >
                Home
              </Link>

              <Link
                onClick={() => setIsMenuOpen(false)}
                to={"./dashboard"}
                className="hover:cursor-pointer hover:text-sky-500 font-semibold text-white"
              >
                Dashboard
              </Link>

              <Link
                onClick={() => setIsMenuOpen(false)}
                to={"./fit"}
                className="flex items-center gap-2 hover:cursor-pointer hover:text-emerald-200 font-semibold text-white"
              >
                Whale
                <span class="font-bold text-xs mr-2 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white-300">
                  Fit
                </span>
              </Link>

              <Link
                onClick={() => setIsMenuOpen(false)}
                href=""
                className="flex items-center gap-2 hover:cursor-pointer hover:text-sky-500 font-semibold text-white"
                to={"./chat"}
              >
                Whale{" "}
                <span class="font-bold text-xs mr-2 px-2.5 py-0.5 rounded-full bg-sky-900 text-blue-300">
                  AI
                </span>
              </Link>
            </div>
            <div className="relative">
              {user ? (
                <Fragment>
                  <div
                    className="hover:cursor-pointer hover:bg-gray-200  p-1 rounded-full"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    {user.photoURL ? (
                      <img
                        className="h-10 w-10 hover:cursor-pointer hover:bg-gray-200 rounded-full"
                        src={user.photoURL}
                        alt=""
                      />
                    ) : (
                      <div className="h-10 w-10 hover:cursor-pointer hover:bg-gray-200 rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 flex items-center justify-center text-white text-xl font-bold">
                        W
                      </div>
                    )}
                  </div>
                  <div
                    class={`z-50 ${
                      !isMenuOpen ? "hidden" : ""
                    } absolute right-[40px] md:right-[0px] my-4 text-base list-none divide-y rounded-lg shadow bg-gray-700 divide-gray-600`}
                  >
                    <div class="px-4 py-3">
                      <span class="block text-sm text-white">{user.name}</span>
                      <span class="block text-sm truncate text-gray-400">
                        {user.email}
                      </span>
                    </div>
                    <ul class="py-2 userTag" aria-labelledby="user-menu-button">
                      <div className="userTag">
                        <Link
                          onClick={() => setIsMenuOpen(false)}
                          to={"./profile"}
                          class="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                        >
                          WhaleInfo
                        </Link>
                      </div>
                      <div className="userTag">
                        <Link
                          onClick={() => setIsMenuOpen(false)}
                          to={"./setting"}
                          className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                        >
                          Settings
                        </Link>
                      </div>
                      <div className="userTag">
                        <a
                          onClick={() => {
                            setCurrentUser(null);
                            localStorage.removeItem("user");
                            handleNavigate("./");
                          }}
                          className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                        >
                          Sign out
                        </a>
                      </div>
                    </ul>
                  </div>
                </Fragment>
              ) : (
                <div className="flex gap-2 items-center justify-center">
                  <button
                    onClick={() => handleNavigate("./login")}
                    className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-700"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => handleNavigate("./signup")}
                    className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-200 hover:text-blue-700"
                  >
                    Sign up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
