import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MOCK_ROOMS, MOCK_CHAT, ChatMessage } from "@/data/mockRooms";

const Chat = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const room = MOCK_ROOMS.find((r) => r.id === roomId);
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: `m${Date.now()}`,
      senderId: "me",
      senderName: "You",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Me",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  if (!room) {
    navigate("/rooms");
    return null;
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-card px-4 pb-3 pt-12">
        <button onClick={() => navigate("/rooms")} className="text-foreground hover:text-muted-foreground transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h2 className="font-semibold text-foreground">{room.eventTitle}</h2>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Users className="h-3 w-3" />
            {room.members.length} members · {room.eventDate}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => {
          const isMe = msg.senderId === "me";
          const isAI = msg.isAI;

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`flex gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}
            >
              {!isMe && (
                <div className="flex-shrink-0">
                  <img src={msg.senderAvatar} alt={msg.senderName} className="h-8 w-8 rounded-full bg-secondary" />
                </div>
              )}
              <div className={`max-w-[75%] ${isMe ? "items-end" : "items-start"}`}>
                {!isMe && (
                  <span className={`text-xs font-medium mb-0.5 block ${isAI ? "text-accent" : "text-muted-foreground"}`}>
                    {msg.senderName}
                  </span>
                )}
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm ${
                    isMe
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : isAI
                      ? "bg-accent/10 text-foreground border border-accent/20 rounded-bl-md"
                      : "bg-secondary text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
                <span className="mt-0.5 block text-[10px] text-muted-foreground">{msg.timestamp}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card px-4 py-3">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 rounded-full border-border bg-secondary text-foreground placeholder:text-muted-foreground h-11"
          />
          <button
            onClick={handleSend}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform active:scale-95"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
