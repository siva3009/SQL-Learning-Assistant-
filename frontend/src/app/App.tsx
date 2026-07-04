import { RouterProvider } from "react-router-dom";
import { ChatProvider } from "./context/ChatContext";
import { router } from "./routes";

export default function App() {
  return (
    <ChatProvider>
      <RouterProvider router={router} />
    </ChatProvider>
  );
}
