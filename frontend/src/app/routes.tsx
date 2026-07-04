import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LandingPage } from "./components/LandingPage";
import { Login } from "./components/Login";
import ChatPage from "./pages/ChatPage";
import { LearnPage } from "./pages/LearnPage";
import { PlaygroundPage } from "./pages/PlaygroundPage";
import { DebuggerPage } from "./pages/DebuggerPage";
import { PracticePage } from "./pages/PracticePage";
import { ProgressPage } from "./pages/ProgressPage";
import { SettingsPage } from "./pages/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, Component: LandingPage },
      { path: "login", Component: Login },
      { path: "signup", Component: Login },
      {
        element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
        children: [
          { path: "chat", Component: ChatPage },
          { path: "chat/:chatId", Component: ChatPage },
          { path: "learn", Component: LearnPage },
          { path: "playground", Component: PlaygroundPage },
          { path: "debugger", Component: DebuggerPage },
          { path: "practice", Component: PracticePage },
          { path: "progress", Component: ProgressPage },
          { path: "settings", Component: SettingsPage },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
