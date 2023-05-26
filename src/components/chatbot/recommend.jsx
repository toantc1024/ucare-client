import React, { useEffect, useState } from "react";

const RecommendPrompt = ({ setMessageValue, handleSend, options }) => {
  return (
    <div className="bottom-0 flex m-2 ">
      <div className="flex flex-row gap-2 overflow-x-auto items-center space-between w-full">
        {options.map((option) => {
          return (
            <div
              onClick={async () => {
                setMessageValue(option);
              }}
              className="bg-sky-200 text-sm text-blue-800 mr-2 rounded-full dark:bg-sky-900 dark:text-blue-300 px-2 py-2 hover:bg-sky-300 hover:text-sky-900 cursor-pointer"
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendPrompt;
