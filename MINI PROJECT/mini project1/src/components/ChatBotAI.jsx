import React, { useState } from "react";
import generateContent from "../GoogleGenerativeAI";

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
    <div className="flex flex-col h-screen bg-green-100">
      <div className="bg-green-600 text-white text-center py-4">
        <h1 className="text-2xl font-bold">EcoChatBot</h1>
        <p className="text-sm">Berbicara dengan asisten ramah lingkungan!</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`flex mb-4 ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-sm p-3 rounded-lg text-white ${
                message.sender === "user" ? "bg-green-500" : "bg-green-700"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center border-t border-green-400 p-4 bg-green-50">
        <input
          type="text"
          className="flex-1 p-2 border rounded-md border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Ketik pesanmu..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          disabled={loading || !userInput.trim()}
        >
          {loading ? "Mengirim..." : "Kirim"}
        </button>
      </div>
    </div>
  );
};

export default ChatBotAI;
