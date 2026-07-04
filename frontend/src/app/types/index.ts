/**
 * Chat and Message type definitions
 */

export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export interface Chat {
  id: number;
  user_id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: number;
  chat_id: number;
  user_id: number;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
  messageId?: number;
  timestamp?: string;
  answer?: string;
  
  // Rich content fields for assistant messages
  sqlQuery?: string;
  explanation?: string | Array<{ title: string; description: string; details?: string[] }>;
  resultPreview?: {
    columns: string[];
    rows: Array<{ [key: string]: any }>;
  };
  suggestions?: string[];
}

export interface ChatContextType {
  chats: Chat[];
  currentChat: Chat | null;
  messages: Message[];
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchChats: () => Promise<Chat[]>;
  fetchChatMessages: (chatId: number) => Promise<void>;
  createNewChat: () => Promise<Chat>;
  deleteChat: (chatId: number) => Promise<void>;
  renameChat: (chatId: number, newTitle: string) => Promise<void>;
  sendMessage: (chatId: number, content: string) => Promise<void>;
  searchChats: (query: string) => Promise<Chat[]>;
}