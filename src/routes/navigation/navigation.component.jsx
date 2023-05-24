import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <Fragment>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <span className="self-center text-2xl font-bold bg-emerald-500  text-white p-2 rounded-lg whitespace-nowrap dark:text-white">
            Ucare
          </span>

          <div className="flex items-center">
            <button>Learn</button>
          </div>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
