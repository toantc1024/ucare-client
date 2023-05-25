import React, { Fragment } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <div className="h-100">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <span className="self-center text-2xl font-bold bg-emerald-500  text-white p-2 rounded-lg whitespace-nowrap dark:text-white">
            Ucare
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigate("./login");
              }}
              className="bg-red-400 p-2 font-semibold text-white hover:bg-red-500 transition-all ease-in-out duration-100 rounded-lg"
            >
              Login
            </button>
            <button
              onClick={() => navigate("./chat")}
              className="bg-sky-400 p-2 font-semibold text-white hover:bg-sky-500 transition-all ease-in-out duration-100 rounded-lg"
            >
              Chat
            </button>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navigation;
