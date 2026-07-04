/**
 * Chat Context - Manages global chat state
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Chat, Message, ChatContextType } from '../types';
import { chatAPI, messageAPI } from '../utils/api';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const getTimestamp = (value?: string) => value || new Date().toISOString();

const sortChatsByUpdatedAt = (items: Chat[]) => [...items].sort((a, b) => {
  return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
});

const normalizeChat = (chat: any): Chat => ({
  id: chat.id,
  user_id: chat.user_id,
  title: chat.title,
  created_at: getTimestamp(chat.created_at),
  updated_at: getTimestamp(chat.updated_at || chat.created_at)
});

const normalizeMessage = (message: any): Message => ({
  id: message.id ?? message.messageId,
  chat_id: message.chat_id ?? message.chatId ?? 0,
  user_id: message.user_id ?? message.userId ?? 0,
  role: message.role,
  content: message.content ?? message.answer ?? '',
  created_at: getTimestamp(message.created_at ?? message.timestamp),
  sqlQuery: message.sqlQuery,
  explanation: message.explanation,
  resultPreview: message.resultPreview,
  suggestions: message.suggestions
});

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch all chats for the user
   */
  const fetchChats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await chatAPI.getHistory();
      const normalizedChats = sortChatsByUpdatedAt((data.chats || []).map(normalizeChat));
      setChats(normalizedChats);
      return normalizedChats;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch chats');
      console.error('Fetch chats error:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch messages for a specific chat
   */
  const fetchChatMessages = useCallback(async (chatId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await chatAPI.getChat(chatId);
      const normalizedChat = normalizeChat(data.chat);
      const normalizedMessages = (data.messages || []).map(normalizeMessage);

      setCurrentChat(normalizedChat);
      setMessages(normalizedMessages);
      setChats(prev => sortChatsByUpdatedAt([
        normalizedChat,
        ...prev.filter(chat => chat.id !== normalizedChat.id)
      ]));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch messages');
      console.error('Fetch messages error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create a new chat
   */
  const createNewChat = useCallback(async (): Promise<Chat> => {
    setLoading(true);
    setError(null);
    try {
      const data = await chatAPI.createChat();
      const newChat = normalizeChat(data.chat);
      setChats(prev => [newChat, ...prev]);
      setCurrentChat(newChat);
      setMessages([]);
      return newChat;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create chat';
      setError(errorMsg);
      console.error('Create chat error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Delete a chat
   */
  const deleteChat = useCallback(async (chatId: number) => {
    setError(null);
    try {
      await chatAPI.deleteChat(chatId);
      setChats(prev => prev.filter(c => c.id !== chatId));
      if (currentChat?.id === chatId) {
        setCurrentChat(null);
        setMessages([]);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete chat';
      setError(errorMsg);
      console.error('Delete chat error:', err);
      throw err;
    }
  }, [currentChat]);

  /**
   * Rename a chat
   */
  const renameChat = useCallback(async (chatId: number, newTitle: string) => {
    setError(null);
    try {
      await chatAPI.renameChat(chatId, newTitle);
      setChats(prev =>
        prev.map(c => c.id === chatId ? { ...c, title: newTitle } : c)
      );
      if (currentChat?.id === chatId) {
        setCurrentChat(prev => prev ? { ...prev, title: newTitle } : null);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to rename chat';
      setError(errorMsg);
      console.error('Rename chat error:', err);
      throw err;
    }
  }, [currentChat]);

  /**
   * Send a message
   */
  const sendMessage = useCallback(async (chatId: number, content: string) => {
    setError(null);
    const tempUserMessage: Message = {
      id: Date.now(),
      chat_id: chatId,
      user_id: 1,
      role: 'user',
      content,
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, tempUserMessage]);

    try {
      const data = await messageAPI.sendMessage(chatId, content);
      const assistantPayload = data.message ?? data.assistantMessage ?? data;
      const assistantMessage = normalizeMessage({
        ...assistantPayload,
        role: 'assistant',
        chat_id: chatId,
        user_id: 0
      });

      setMessages(prev => [...prev, assistantMessage]);
      setChats(prev => sortChatsByUpdatedAt(prev.map(chat => (
        chat.id === chatId
          ? { ...chat, updated_at: new Date().toISOString() }
          : chat
      ))));
    } catch (err) {
      setMessages(prev => prev.filter(message => message.id !== tempUserMessage.id));
      const errorMsg = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMsg);
      console.error('Send message error:', err);
      throw err;
    }
  }, []);

  /**
   * Search chats
   */
  const searchChats = useCallback(async (query: string): Promise<Chat[]> => {
    setError(null);
    try {
      const data = await chatAPI.searchChats(query);
      return data.chats || [];
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to search chats';
      setError(errorMsg);
      console.error('Search chats error:', err);
      throw err;
    }
  }, []);

  const value: ChatContextType = {
    chats,
    currentChat,
    messages,
    loading,
    error,
    fetchChats,
    fetchChatMessages,
    createNewChat,
    deleteChat,
    renameChat,
    sendMessage,
    searchChats
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

/**
 * Hook to use Chat Context
 */
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};