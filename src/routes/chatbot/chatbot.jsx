import React, { Fragment } from "react";
import TextInput from "../../components/chatbot/text-input";
import { useState } from "react";
import { chatQuery } from "../../utils/backend-data/data";

const Chatbot = () => {
  const [messageValue, setMessageValue] = useState("");
  const [chat, setChat] = useState([]);
  const [isHandling, setIsHandling] = useState(false);

  const handleChange = (e) => {
    setMessageValue(e.target.value);
  };

  const sendMessage = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Check if the message is not empty
      if (isHandling) {
        console.log("Calm down!!");
        return;
      }
      if (messageValue) {
        const getQuery = async () => {
          setIsHandling(true);
          try {
            const response = await chatQuery(messageValue);

            console.log(response);
            const newChat = [
              ...chat,
              { message: messageValue, response: response.response[0].text },
            ];
            setChat(newChat);
          } catch (error) {}
          setIsHandling(false);
        };
        getQuery();
      }
      console.log(messageValue);
      setMessageValue("");
    }
  };

  return (
    <Fragment>
      <div className="chatbot">
        <div className="chatbot__header">
          <div className="chatbot__header__title">
            <h1>UCare Chatbot</h1>
          </div>
        </div>
        <div className="chatbot__body">
          <div className="chatbot__body__content">
            {chat.map((item, index) => {
              return (
                <div key={index} className="chatbot__body__content__message">
                  <div className="chatbot__body__content__message__user">
                    <p>{item.message}</p>
                  </div>
                  <div className="chatbot__body__content__message__bot">
                    <p>{item.response}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <TextInput
        handleChange={(e) => handleChange(e)}
        messageValue={messageValue}
        sendMessage={(e) => sendMessage(e)}
      />
      ;
    </Fragment>
  );
};

export default Chatbot;
