import React, { Fragment } from "react";
import TextInput from "../../components/chatbot/text-input";
import { useState } from "react";

const Chatbot = () => {
  const [messageValue, setMessageValue] = useState("");

  const handleChange = (e) => {
    setMessageValue(e.target.value);
  };

  const sendMessage = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(messageValue);
      setMessageValue("");
    }
  };

  return (
    <Fragment>
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
