import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Users, Sparkles } from "lucide-react";
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

  if (!room) { navigate("/rooms"); return null; }

  return (
    <div className="flex h-[100svh] flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-card px-4 pb-3.5 pt-14">
        <button onClick={() => navigate("/rooms")} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary transition-colors">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-[15px] text-foreground truncate">{room.eventTitle}</h2>
          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
            <Users className="h-3 w-3" />
            {room.members.length} members · {room.eventDate}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
        {messages.map((msg, i) => {
          const isMe = msg.senderId === "me";
          const isAI = msg.isAI;

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              className={`flex gap-2.5 ${isMe ? "flex-row-reverse" : "flex-row"}`}
            >
              {!isMe && (
                <div className="flex-shrink-0 pt-5">
                  {isAI ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                      <Sparkles className="h-4 w-4 text-accent" />
                    </div>
                  ) : (
                    <img src={msg.senderAvatar} alt={msg.senderName} className="h-8 w-8 rounded-full bg-secondary" />
                  )}
                </div>
              )}
              <div className={`max-w-[75%] ${isMe ? "items-end" : "items-start"}`}>
                {!isMe && (
                  <span className={`mb-1 block text-[11px] font-medium ${isAI ? "text-accent" : "text-muted-foreground"}`}>
                    {msg.senderName}
                  </span>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    isMe
                      ? "bg-foreground text-primary-foreground rounded-br-lg"
                      : isAI
                      ? "bg-accent/8 text-foreground border border-accent/15 rounded-bl-lg"
                      : "bg-card border border-border text-foreground rounded-bl-lg"
                  }`}
                >
                  {msg.content}
                </div>
                <span className="mt-1 block text-[10px] text-muted-foreground">{msg.timestamp}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-2.5">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 rounded-full border-border bg-secondary text-foreground placeholder:text-muted-foreground h-11 px-4"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-primary-foreground transition-all hover:opacity-90 active:scale-95 disabled:opacity-30"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
