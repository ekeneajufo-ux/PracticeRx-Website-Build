import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "./ui/button";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const OFFERS = [
  {
    title: "Free Consult",
    description: "Book a free 30-minute strategy session with our practice experts",
    url: "https://funnels.practicerxconsulting.com/strategysession",
  },
  {
    title: "Practice Readiness Assessment",
    description: "Get a personalized assessment of your practice's readiness for transformation",
    url: "https://funnels.practicerxconsulting.com/strategysession",
  },
  {
    title: "Practice Audit",
    description: "Receive a comprehensive audit of your current practice operations",
    url: "https://funnels.practicerxconsulting.com/strategysession",
  },
];

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hi! I'm the PracticeRx AI Assistant. I'm here to help you with questions about building a successful direct primary care practice. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentOfferIndex] = useState(Math.floor(Math.random() * OFFERS.length));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentOffer = OFFERS[currentOfferIndex];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputValue,
          conversationHistory: messages.map((m) => ({
            role: m.type === "user" ? "user" : "assistant",
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: data.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content:
          "Sorry, I encountered an error. Please try again or contact support if the problem persists.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-96 max-h-[600px] bg-white rounded-lg shadow-lg flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">PracticeRx AI Assistant</h3>
              <p className="text-xs text-blue-100">Powered by Claude</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-600 p-1 rounded transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.type === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-3 py-2 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Offer Box */}
          <div className="px-4 py-3 border-t border-gray-200 bg-blue-50">
            <p className="text-xs text-gray-600 font-semibold mb-2">💡 Special Offer</p>
            <div className="bg-white border border-blue-200 rounded p-2 mb-3">
              <p className="text-sm font-semibold text-gray-900 mb-1">{currentOffer.title}</p>
              <p className="text-xs text-gray-600 mb-2">{currentOffer.description}</p>
              <a
                href={currentOffer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline"
              >
                Learn More →
              </a>
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all hover:shadow-xl transform hover:scale-110"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
}
