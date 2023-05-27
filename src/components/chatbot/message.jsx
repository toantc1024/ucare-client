import React from "react";

const TextMessage = ({ chat, setChat, currentChat }) => {
  const { type, message, status, options } = chat;

  const backgroundStyles = {
    bot: "bg-blue-500 text-white rounded-bl-none",
    user: "bg-gray-300 text-gray-600  rounded-br-none  ",
  };
  React.useEffect(() => {
    console.log(chat);
  }, []);
  // bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white
  return (
    <div class="w-full">
      <div class={`flex items-end ${type === "user" ? "justify-end" : ""}`}>
        <div class="flex flex-col space-y-2 text-sm max-w-2xl mx-2 order-1 w-auto">
          <div>
            <span
              class={`
              ${status === "pending" && "animate-pulse font-bold"}

              w-full px-4 py-2 rounded-lg inline-block ${
                status === "pending"
                  ? "bg-gradient-to-r from-sky-500 to-emerald-400 text-white"
                  : backgroundStyles[type]
              } text-sm`}
            >
              <span>{message}</span>
              {options && (
                <div className="flex flex-row gap-1 overflow-x-auto items-center space-between w-full">
                  {options.map(({ text, action }) => {
                    return (
                      <button
                        onClick={() => {
                          if (currentChat) {
                            switch (typeof action) {
                              case "string":
                                const newChat = [
                                  ...currentChat,
                                  { message: text, type: "user" },
                                  {
                                    message: action,
                                    type: "bot",
                                    status: "pending",
                                  },
                                ];
                                setChat(newChat);
                                break;
                              case "function":
                                action();
                                break;
                              default:
                                return;
                            }
                          }
                        }}
                        className="bg-sky-400 p-1 m-1 hover:bg-sky-500 transition-all ease-in-out duration-100 rounded-lg"
                      >
                        {text}
                      </button>
                    );
                  })}
                </div>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextMessage;
