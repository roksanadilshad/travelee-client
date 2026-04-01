
import React, { useState, useRef, useEffect } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! I'm Travelee AI 🌍 Ask me about destinations, itineraries, or trip planning!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (e) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.reply || "Something went wrong. Try again 😊",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Can't connect to server. Please try later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Chat Window */}
      {isOpen && (
        <div
          className="w-80 sm:w-96 bg-white rounded-2xl border border-gray-100 flex flex-col overflow-hidden"
          style={{ height: "460px", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
        >
          {/* Header */}
          <div
            style={{ background: "#0EA5A4" }}
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden bg-white bg-opacity-20 flex-shrink-0">
  <img
    src="/assets/bot.png"
    alt="Travelee"
    className="w-full h-full object-contain "
  />
</div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm leading-none mb-0.5">
                Travelee AI
              </p>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block"></span>
                <span className="text-white text-xs" style={{ opacity: 0.8 }}>
                  Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full w-7 h-7 flex items-center justify-center transition-colors"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2" style={{ background: "#f8fafc" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[82%] px-3 py-2 rounded-2xl text-sm leading-relaxed"
                  style={
                    msg.role === "user"
                      ? { background: "#0EA5A4", color: "white", borderBottomRightRadius: "4px" }
                      : { background: "white", color: "#1f2937", border: "1px solid #e5e7eb", borderBottomLeftRadius: "4px" }
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing dots */}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 rounded-2xl flex gap-1 items-center"
                  style={{ background: "white", border: "1px solid #e5e7eb", borderBottomLeftRadius: "4px" }}
                >
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <span
                      key={i}
                      style={{
                        width: "7px", height: "7px", borderRadius: "50%",
                        background: "#9ca3af", display: "inline-block",
                        animation: `typingBounce 1.2s ${delay}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={sendMessage}
            className="flex items-center gap-2 p-3 flex-shrink-0"
            style={{ background: "white", borderTop: "1px solid #f1f5f9" }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about destinations..."
              className="flex-1 text-sm border rounded-full px-4 py-2 outline-none transition-colors"
              style={{
                background: "#f8fafc", border: "1px solid #e2e8f0",
                color: "#1f2937", fontSize: "13px",
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{ background: "#0EA5A4", flexShrink: 0 }}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white disabled:opacity-40 transition-opacity"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        style={{ background: "#0EA5A4", boxShadow: "0 4px 20px rgba(14,165,164,0.4)" }}
        className="w-14 h-14 rounded-full text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      >
        {isOpen ? (
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}