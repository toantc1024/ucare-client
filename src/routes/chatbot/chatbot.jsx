import React, { Fragment, useEffect } from "react";
import { TbFishChristianity } from "react-icons/tb";
import TextInput from "../../components/chatbot/text-input";
import { useState } from "react";
import { chatQuery, getRecommendations } from "../../utils/backend-data/data";
import Whalebg from "../../assets/whalebg.jpg";
import messageText from "../../components/chatbot/message";
import TextMessage from "../../components/chatbot/message";
import RecommendPrompt from "../../components/chatbot/recommend";
import { useNavigate } from "react-router-dom";
//import Modal from "../../components/chatbot/modal";

const Chatbot = ({ user }) => {
  const [messageValue, setMessageValue] = useState("");
  const [selectOptions, setSelectOptions] = useState(false);
  const [displayName, setDisplayName] = useState(null);
  const [uid, setUid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      setUid(user.uid);
    } else {
      return;
    }
  }, []);
  const addItemToChat = (message) => {
    setChat([...chat, message]);
  };

  const [chat, setChat] = useState([
    {
      message: `Hi ${
        displayName ? displayName.split(" ")[0] : ""
      }, I'm WhaleCare. How can I help you?`,
      options: [
        {
          text: "Tell me about you",
          action:
            "I'm WhaleCare. I am developed to provide information about health care, and help doctor easy to understand you!.",
        },
        {
          text: "What can you do?",
          action:
            "I can help you with your mental health and connect with doctors, provide better habit schedule for your better health!",
        },
        {
          text: "Schedule time to drink water",
          action: async () => {
            setMessageValue("Schedule time to drink water for user");
            handleSend();
          },
        },
      ],
      type: "bot",
    },
  ]);
  const [isHandling, setIsHandling] = useState(false);

  const handleChange = (e) => {
    setMessageValue(e.target.value);
  };

  useEffect(() => {
    const messages = document.getElementById("messages");
    messages.scrollTo({
      top: messages.scrollHeight,
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
      { message: "Thinking...", type: "bot", status: "pending" },
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
            { message: messageValue, type: "user", status: "" },
            { message: response.response[0].text, type: "bot", status: "" },
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
    <div className="h-[60vh] relative">
      <div class="flex w-full font-extrabold text-5xl justify-center py-12 font-extrabold text-4xl  text-white   bg-gradient-to-r from-sky-400 to-emerald-400 relative items-center">
        WhaleAI
        <div className="absolute top-50 right-20 text-4xl shadow-lg rounded-full border w-20 h-20 flex items-center justify-center hover:scale-[1.2] transition-all ease-in-out duration-200 cursor-pointer font-extrabold bg-white">
          <span className="">🐳</span>
        </div>
      </div>
      <div
        id="messages"
        class="h-full flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue  h-[calc(100%-50vh)] scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        style={
          {
            // backgroundImage: "url(" + Whalebg + ")",
            // backgroundSize: "500px 500px",
          }
        }
      >
        {chat.map((chatInfo, index) => {
          return (
            <TextMessage
              currentChat={chat}
              setChat={setChat}
              chat={chatInfo}
              key={index}
            />
          );
        })}
      </div>
      <RecommendPrompt
        handleSend={handleSend}
        setMessageValue={(value) => {
          setMessageValue(value);
        }}
        options={getRecommendations(messageValue)}
      />
      <TextInput
        handleChange={(e) => handleChange(e)}
        messageValue={messageValue}
        sendMessage={(e) => sendMessage(e)}
        handleSend={handleSend}
      />
    </div>
  );
};

export default Chatbot;
