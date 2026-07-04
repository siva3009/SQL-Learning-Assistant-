import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  BookOpen,
  TerminalSquare,
  Bug,
  Dumbbell,
  TrendingUp,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Database,
  Plus,
  MessageSquare,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import { useChat } from "../../context/ChatContext";

const ChatSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { chats, createNewChat, deleteChat } = useChat();

  const handleDeleteChat = async (chatId: number) => {
    const shouldDelete = window.confirm("Delete this chat and all its messages?");
    if (!shouldDelete) {
      return;
    }

    const isDeletedChatOpen = location.pathname === `/chat/${chatId}`;

    try {
      await deleteChat(chatId);
      if (isDeletedChatOpen) {
        navigate("/chat", { replace: true });
      }
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

  const navItems = [
    { name: "Learn MySQL", path: "/learn", icon: BookOpen },
    { name: "SQL Playground", path: "/playground", icon: TerminalSquare },
    { name: "Query Debugger", path: "/debugger", icon: Bug },
    { name: "Practice Arena", path: "/practice", icon: Dumbbell },
    { name: "Progress", path: "/progress", icon: TrendingUp },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full bg-[#111111] border-r border-white/5 text-zinc-100">
      <div className="flex items-center justify-between h-14 px-3 shrink-0">
        <Link to="/chat" className="flex items-center gap-3 overflow-hidden whitespace-nowrap text-cyan-400 hover:opacity-80 transition-opacity px-1">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 shrink-0">
            <Database className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="font-medium tracking-wide bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            SQL Tutor Bot
          </span>
        </Link>
      </div>

      <div className="px-3 py-3 shrink-0">
        <button
          type="button"
          onClick={async () => {
            try {
              const newChat = await createNewChat();
              navigate(`/chat/${newChat.id}`);
            } catch (error) {
              console.error("Failed to create new chat:", error);
              navigate("/chat");
            }
          }}
          className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 text-zinc-200 px-3 py-2.5 w-full hover:bg-white/10 hover:border-violet-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all duration-300 group"
        >
          <Plus className="w-4 h-4 text-violet-400 group-hover:text-violet-300 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">New Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
        <div className="px-3 pb-4 flex-1">
          <div className="px-2 pb-2 pt-1">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Today</span>
          </div>
          <div className="flex flex-col gap-0.5">
            {(chats && chats.length > 0 ? chats : []).map((chat) => (
              <div
                key={chat.id}
                onClick={() => navigate(`/chat/${chat.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate(`/chat/${chat.id}`);
                  }
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group w-full text-left text-zinc-400 hover:text-zinc-200 hover:bg-white/5 cursor-pointer"
                title={chat.title}
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span className="text-sm truncate flex-1">{chat.title}</span>
                <button
                  type="button"
                  title="Delete chat"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDeleteChat(chat.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {(!chats || chats.length === 0) && (
              <div className="px-2 py-2 text-sm text-zinc-500">No chats yet</div>
            )}
          </div>
        </div>

        <div className="px-3 py-4 border-t border-white/5">
          <div className="px-2 pb-2">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Workspace</span>
          </div>
          <div className="flex flex-col gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                title={item.name}
                className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium whitespace-nowrap">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-white/5 mt-auto shrink-0">
        <div className="flex items-center gap-3 rounded-lg hover:bg-white/5 p-2 cursor-pointer transition-colors justify-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center shrink-0 border border-white/10">
            <span className="text-sm font-bold text-white">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-zinc-200 truncate">Alex Developer</div>
            <div className="text-xs text-zinc-500 truncate">Pro Plan</div>
          </div>
          <MoreHorizontal className="w-4 h-4 text-zinc-500 shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
