import React, { Fragment, useEffect } from "react";
import TextInput from "../../components/chatbot/text-input";
import { useState } from "react";
import { chatQuery } from "../../utils/backend-data/data";
import Whalebg from "../../assets/whalebg.jpg";
const Chatbot = () => {
  const [messageValue, setMessageValue] = useState("");
  const [chat, setChat] = useState([]);
  const [isHandling, setIsHandling] = useState(false);

  const handleChange = (e) => {
    setMessageValue(e.target.value);
  };

  useEffect(() => {
    const messages = document.getElementById("messages");
    messages.scrollTo({
      top: messages.clientHeight,
      behavior: "smooth",
    });
  }, [chat]);

  const handleSend = async () => {
    // Check if the message is not empty
    if (isHandling || !messageValue) {
      console.log("Calm down!!");
      return;
    }

    const newChat = [
      ...chat,
      { message: messageValue, type: "user" },
      { message: "Thinking...", type: "AI" },
    ];
    await setChat(newChat);

    if (messageValue) {
      const getQuery = async () => {
        setIsHandling(true);
        try {
          const response = await chatQuery(messageValue);

          console.log(response);
          const newChat = [
            ...chat,
            { message: messageValue, type: "user" },
            { message: response.response[0].text, type: "AI" },
          ];
          setChat(newChat);
        } catch (error) {}
        setIsHandling(false);
      };
      getQuery();
    }
    console.log(messageValue);
    setMessageValue("");
  };
  const sendMessage = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Fragment>
      <div class="w-full h-24 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% inline-flex items-center justify-center px-4 py-3 text-white font-extrabold">
        WhaleAI
      </div>
      <div
        id="messages"
        class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue  h-[65vh] scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        style={{
          backgroundImage: "url(" + Whalebg + ")",
          backgroundSize: "500px 500px",
        }}
      >
        {chat.map(({ message, type }, index) => {
          return (
            <Fragment>
              {type === "user" ? (
                <div class="chat-message">
                  <div class="flex items-end justify-end">
                    <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                      <div>
                        <span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white text-xl">
                          {message}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div class="chat-message">
                  <div class="flex items-end">
                    <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                      <div>
                        <span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xl">
                          {message}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
      <TextInput
        handleChange={(e) => handleChange(e)}
        messageValue={messageValue}
        sendMessage={(e) => sendMessage(e)}
        handleSend={handleSend}
      />
      ;
    </Fragment>
  );
};

export default Chatbot;
