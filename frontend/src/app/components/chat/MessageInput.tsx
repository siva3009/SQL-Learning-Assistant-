/**
 * Message Input - Input field for sending messages
 */

import React, { useState, useRef, useEffect } from 'react';
import styles from './MessageInput.module.css';

interface MessageInputProps {
  onSend: (message: string) => void;
  loading?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend, loading = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim() && !loading) {
      onSend(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a SQL question or type a prompt..."
          disabled={loading}
          className={styles.input}
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={!message.trim() || loading}
          className={styles.sendBtn}
          title="Send message (Enter)"
        >
          {loading ? '⏳' : '📤'}
        </button>
      </div>
      <p className={styles.hint}>
        Shift + Enter for new line • Enter to send
      </p>
    </div>
  );
};

export default MessageInput;