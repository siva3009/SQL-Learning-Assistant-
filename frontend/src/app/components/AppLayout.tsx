import { useEffect, useRef, useState } from "react";
import { Outlet, NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
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
import { useChat } from "../context/ChatContext";

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { chats, fetchChats, createNewChat, deleteChat } = useChat();
  const skipNextAutoOpenRef = useRef(false);

  const navItems = [
    { name: "Learn MySQL", path: "/learn", icon: BookOpen },
    { name: "SQL Playground", path: "/playground", icon: TerminalSquare },
    { name: "Query Debugger", path: "/debugger", icon: Bug },
    { name: "Practice Arena", path: "/practice", icon: Dumbbell },
    { name: "Progress", path: "/progress", icon: TrendingUp },
    { name: "Settings", path: "/settings", icon: Settings },
  ];


  useEffect(() => {
    let active = true;

    const hydrateChats = async () => {
      try {
        const loadedChats = await fetchChats();

        if (!active) {
          return;
        }

        if (location.pathname === "/chat" && skipNextAutoOpenRef.current) {
          skipNextAutoOpenRef.current = false;
          return;
        }

        if (location.pathname === "/chat") {
          if (loadedChats.length > 0) {
            navigate(`/chat/${loadedChats[0].id}`, { replace: true });
          }
        }
      } catch (error) {
        console.error("Failed to hydrate chat history:", error);
      }
    };

    hydrateChats();

    return () => {
      active = false;
    };
  }, [fetchChats, location.pathname, navigate]);

  const handleDeleteChat = async (chatId: number) => {
    const shouldDelete = window.confirm("Delete this chat and all its messages?");
    if (!shouldDelete) {
      return;
    }

    const isDeletedChatOpen = location.pathname === `/chat/${chatId}`;

    try {
      await deleteChat(chatId);

      if (isDeletedChatOpen) {
        skipNextAutoOpenRef.current = true;
        navigate("/chat", { replace: true });
      }
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-zinc-100 font-sans overflow-hidden selection:bg-violet-500/30">
      <motion.aside
        initial={false}
        animate={{
          width: isSidebarOpen ? 260 : 68,
        }}
        className="relative flex flex-col bg-[#111111] border-r border-white/5 z-20 shrink-0 h-full"
      >
        <div className="flex items-center justify-between h-14 px-3 shrink-0">
          <Link to="/chat" className="flex items-center gap-3 overflow-hidden whitespace-nowrap text-cyan-400 hover:opacity-80 transition-opacity px-1">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 shrink-0">
              <Database className="w-4 h-4 text-cyan-400" />
            </div>
            {isSidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium tracking-wide bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
              >
                SQL Tutor Bot
              </motion.span>
            )}
          </Link>
          {isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="absolute left-1/2 -translate-x-1/2 top-4 p-1.5 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className={`px-3 py-3 shrink-0 ${!isSidebarOpen && "mt-8 flex justify-center"}`}>
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
            className={`
              flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 text-zinc-200
              hover:bg-white/10 hover:border-violet-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]
              transition-all duration-300 group ${isSidebarOpen ? "px-3 py-2.5 w-full" : "p-2.5 justify-center"}
            `}
          >
            <Plus className="w-4 h-4 text-violet-400 group-hover:text-violet-300 group-hover:scale-110 transition-transform" />
            {isSidebarOpen && <span className="text-sm font-medium">New Chat</span>}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
          <div className="px-3 pb-4 flex-1">
            {isSidebarOpen && (
              <div className="px-2 pb-2 pt-1">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Today</span>
              </div>
            )}
            <div className="flex flex-col gap-0.5">
              {(chats && chats.length > 0 ? chats : []).map((chat) => (
                <div
                  key={chat.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/chat/${chat.id}`)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      navigate(`/chat/${chat.id}`);
                    }
                  }}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group w-full text-left
                    text-zinc-400 hover:text-zinc-200 hover:bg-white/5 cursor-pointer
                    ${!isSidebarOpen && "justify-center"}
                  `}
                  title={chat.title}
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  {isSidebarOpen && <span className="text-sm truncate flex-1">{chat.title}</span>}
                  {isSidebarOpen && (
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
                  )}
                </div>
              ))}
              {(!chats || chats.length === 0) && (
                <div className="px-2 py-2 text-sm text-zinc-500">No chats yet</div>
              )}
            </div>
          </div>

          <div className="px-3 py-4 border-t border-white/5">
            {isSidebarOpen && (
              <div className="px-2 pb-2">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Workspace</span>
              </div>
            )}
            <div className="flex flex-col gap-0.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  title={item.name}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group
                    ${isActive
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                    }
                    ${!isSidebarOpen && "justify-center"}
                  `}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {isSidebarOpen && <span className="text-sm font-medium whitespace-nowrap">{item.name}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-white/5 mt-auto shrink-0">
          <div className={`flex items-center gap-3 rounded-lg hover:bg-white/5 p-2 cursor-pointer transition-colors ${!isSidebarOpen && "justify-center"}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center shrink-0 border border-white/10">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-zinc-200 truncate">Alex Developer</div>
                <div className="text-xs text-zinc-500 truncate">Pro Plan</div>
              </div>
            )}
            {isSidebarOpen && <MoreHorizontal className="w-4 h-4 text-zinc-500 shrink-0" />}
          </div>
        </div>
      </motion.aside>

      <main className="flex-1 relative flex flex-col min-w-0 h-full overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent z-10" />
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
