import React, { useState } from "react";
import RecommendPrompt from "./recommend";

const TextInput = ({ messageValue, handleChange, sendMessage, handleSend }) => {
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);

  const [recording, setRecording] = useState(false);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        setRecording(true);
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
        setRecording(false);
      } catch (err) {
        setRecording(false);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  return (
    <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div class="relative flex">
        <span class="absolute inset-y-0 flex items-center">
          <button
            onClick={() => {
              getMicrophonePermission();
            }}
            type="button"
            class="inline-flex items-center justify-center rounded-full h-12 w-12 hover:bg-gray-300 transition-all duration-300 ease-in text-gray-500 focus:outline-none relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-6 w-6 text-gray-600 transition-all duration-300 ease-in relative"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              ></path>
            </svg>
            <div
              className={
                recording
                  ? `w-11 h-11 bg-transparent z-[-1] rounded-full absolute border border-grey-600 transition-all animate-[piing_1.5s_linear_infinite]`
                  : ""
              }
            ></div>
            <div
              className={
                recording
                  ? "w-12 h-12 bg-gray-300 z-[-1] rounded-full absolute transition-all animate-[piingg_1.5s_linear_infinite] animation-delay-[2500ms]"
                  : ""
              }
            ></div>
          </button>
        </span>

        <input
          value={messageValue}
          onChange={handleChange}
          onKeyDown={sendMessage}
          type="text"
          placeholder="Hello! I am feeling..."
          class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-14 bg-gray-200 rounded-md py-5  text-sm"
        />
        <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
          <button
            onClick={() => handleSend()}
            type="button"
            class="inline-flex items-center justify-center rounded-lg px-4 py-3 transition-all mr-2 duration-400 ease-in-out text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-emerald-300 hover:to-sky-400 focus:outline-none  text-sm"
          >
            <span class="font-bold">Send</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-6 w-6 ml-2 transform rotate-90"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextInput;
