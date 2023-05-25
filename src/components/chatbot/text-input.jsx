import React from "react";
import Whalebg from "../../assets/whalebg.jpg"
const TextInput = ({ messageValue, handleChange, sendMessage }) => {
  return (
    <div class="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
      <div class="w-full h-24 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% inline-flex items-center justify-center rounded-lg px-4 py-3 text-white" >
        Whale Care
      </div>
      <div
        id="messages"
        class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        style={{
          backgroundImage: "url(" + Whalebg + ")",
          backgroundSize: "500px 500px",
        }}
      >
        {/* đoạn chat chào từ AI*/}
        <div class="chat-message">
          <div class="flex items-end">
            <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              <div>
                <span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xl">
                  Tôi có thể giúp gì cho bạn
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* đoạn chat input */}
        <div class="chat-message">
          <div class="flex items-end justify-end">
            <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
              <div>
                <span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white text-xl">
                  Tôi muốn hỏi về bệnh viêm họng
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* chatbot trả lời */}
        <div class="chat-message">
          <div class="flex items-end">
            <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              {/* một đoạn chat */}
              <div>
                <span class="px-4 py-2 rounded-lg inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xl">
                  Tôi sẽ cố gắng giúp bạn với thông tin về bệnh viêm họng.
                </span>
              </div>
              {/* một đoạn chat */}
              <div>
                <span class="px-4 py-2 rounded-lg inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xl">
                  Bệnh viêm họng là một tình trạng mà niêm mạc trong họng trở nên viêm và khó chịu.
                  Có nhiều nguyên nhân gây ra viêm họng, trong đó phổ biến nhất là các loại nhiễm
                  trùng virus hoặc vi khuẩn. Một số triệu chứng thường gặp của viêm họng bao gồm:
                </span>
              </div>
              {/* một đoạn chat */}
              <div>
                <span class="px-4 py-2 rounded-lg inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xl">
                  Đau họng: Đau hoặc khó chịu trong họng là triệu chứng chính của viêm họng.
                </span>
              </div>
              {/* một đoạn chat */}
              <div>
                <span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xl">
                  Để chăm sóc cho viêm họng, bạn có thể thử những biện pháp sau: Nghỉ ngơi và tạo
                  điều kiện nghỉ ngơi cho giọng nói của bạn. Uống đủ nước để giữ cho cơ thể luôn
                  được cung cấp đủ độ ẩm.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div class="relative flex">
          <span class="absolute inset-y-0 flex items-center">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:bg-blue-400 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-6 w-6 text-gray-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                ></path>
              </svg>
            </button>
          </span>
          <input
            type="text"
            placeholder="Nhập vào đây..."
            class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
          />
          <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
          <button type="button" class="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 hover:bg-blue-400 focus:outline-none">
               <span class="font-bold">Gửi</span>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 ml-2 transform rotate-90">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
               </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextInput;
