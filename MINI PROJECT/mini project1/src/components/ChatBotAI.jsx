import React, { useState } from "react";
import generateContent from "../GoogleGenerativeAi";

const ChatBotAI = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const newChatHistory = [
      ...chatHistory,
      { sender: "user", text: userInput },
    ];
    setChatHistory(newChatHistory);

    const aiResponse = await generateContent(userInput);
    if (aiResponse) {
      setChatHistory([...newChatHistory, { sender: "ai", text: aiResponse }]);
    } else {
      setChatHistory([
        ...newChatHistory,
        { sender: "ai", text: "Error: Unable to get response." },
      ]);
    }

    setUserInput("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-900">Chat with AI</h1>
      <div className="flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow-md">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`font-semibold ${
                message.sender === "user" ? "text-blue-700" : "text-blue-800"
              }`}
            >
              {message.sender === "user" ? "You" : "AI"}:
            </span>
            <span
              className={`ml-2 p-2 rounded-lg ${
                message.sender === "user" ? "bg-blue-300" : "bg-blue-200"
              }`}
            >
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message here..."
          required
          className="w-full h-20 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 disabled:bg-blue-300"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default ChatBotAI;
