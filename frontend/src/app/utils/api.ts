/**
 * API client for communicating with backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken') || '';
};

/**
 * Authentication API calls
 */
export const authAPI = {
  register: async (username: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });
    return handleResponse(response);
  },

  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(response);
  },

  profile: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  }
};

/**
 * Chat API calls
 */
export const chatAPI = {
  // Get chat history
  getHistory: async () => {
    const response = await fetch(`${API_BASE_URL}/chat/history`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  },

  // Get single chat with messages
  getChat: async (chatId: number) => {
    const response = await fetch(`${API_BASE_URL}/chat/${chatId}/messages`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  },

  // Create new chat
  createChat: async () => {
    const response = await fetch(`${API_BASE_URL}/chat/new`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  },

  // Delete chat
  deleteChat: async (chatId: number) => {
    const response = await fetch(`${API_BASE_URL}/chat/${chatId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  },

  // Rename chat
  renameChat: async (chatId: number, title: string) => {
    const response = await fetch(`${API_BASE_URL}/chat/${chatId}/rename`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    });
    return handleResponse(response);
  },

  // Search chats
  searchChats: async (query: string) => {
    const response = await fetch(`${API_BASE_URL}/chat/search?q=${encodeURIComponent(query)}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  }
};

/**
 * Message API calls
 */
export const messageAPI = {
  // Send message
  sendMessage: async (chatId: number, content: string) => {
    const response = await fetch(`${API_BASE_URL}/message/send`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ chat_id: chatId, content })
    });
    return handleResponse(response);
  }
};

/**
 * SQL API calls
 */
export const sqlAPI = {
  // Generate SQL query
  generateSQL: async (prompt: string) => {
    const response = await fetch(`${API_BASE_URL}/sql/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });
    return handleResponse(response);
  },

  // Explain SQL query
  explainSQL: async (query: string) => {
    const response = await fetch(`${API_BASE_URL}/sql/explain`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });
    return handleResponse(response);
  },

  // Get quiz questions
  getQuiz: async () => {
    const response = await fetch(`${API_BASE_URL}/sql/quiz`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  },

  // Execute SQL safely (read-only)
  runQuery: async (query: string) => {
    const response = await fetch(`${API_BASE_URL}/sql/run`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });
    return handleResponse(response);
  }
};