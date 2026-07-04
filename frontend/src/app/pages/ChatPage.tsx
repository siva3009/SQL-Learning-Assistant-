import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useChat } from "../context/ChatContext";
import ChatWindow from "../components/chat/ChatWindow";

const ChatPage: React.FC = () => {
  const { chatId } = useParams<{ chatId?: string }>();
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [query, setQuery] = useState("");

  const {
    currentChat,
    messages,
    loading,
    error,
    fetchChatMessages,
    sendMessage,
  } = useChat();

  useEffect(() => {
    const loadChat = async () => {
      if (!chatId) {
        return;
      }

      try {
        const resolvedChatId = Number(chatId);
        if (Number.isNaN(resolvedChatId)) {
          navigate("/chat", { replace: true });
          return;
        }

        await fetchChatMessages(resolvedChatId);
      } catch (loadError) {
        console.error("Failed to load chat:", loadError);
      }
    };

    loadChat();
  }, [chatId, fetchChatMessages, navigate]);

  const handleSendQuery = async () => {
    if (!query.trim() || !currentChat || loading) return;
    const nextQuery = query;
    setQuery("");
    try {
      await sendMessage(currentChat.id, nextQuery);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [query]);

  return (
    <div className="h-full min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-6xl mx-auto h-full px-4 py-6 md:py-10">
        <div className="h-full bg-transparent rounded-lg overflow-hidden flex flex-col">
          <div className="flex-1 overflow-hidden">
            <ChatWindow
              messages={messages}
              loading={loading}
              onRunSQL={(q) => {
                localStorage.setItem("pendingQuery", q);
                window.open("/playground", "_blank");
              }}
              onSelectSuggestion={(s) => {
                if (s) {
                  setQuery(s);
                }
              }}
              onSubmit={async (content: string) => {
                if (!currentChat) return;
                try {
                  await sendMessage(currentChat.id, content);
                } catch (err) {
                  console.error('Failed to send message from hero input:', err);
                }
              }}
            />
          </div>

          {messages.length > 0 && (
            <div className="pt-4">
            <div className="bg-[#1A1A1C] border border-white/10 rounded-xl p-3 flex items-center gap-3">
              <textarea
                ref={textareaRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything about MySQL..."
                rows={1}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSendQuery();
                  }
                }}
                className="flex-1 bg-transparent text-white/90 placeholder:text-white/30 outline-none resize-none text-sm leading-6 max-h-[120px]"
              />
              <button
                type="button"
                onClick={handleSendQuery}
                disabled={!query.trim() || loading}
                className="ml-auto w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
            {error && <div className="mt-2 text-sm text-red-400">⚠️ {error}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;