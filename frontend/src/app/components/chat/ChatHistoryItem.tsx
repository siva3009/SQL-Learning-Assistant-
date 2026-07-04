/**
 * Chat History Item - Individual chat in sidebar
 * Shows title with rename and delete options
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../../context/ChatContext';
import { Chat } from '../../types';
import styles from './ChatHistoryItem.module.css';

interface ChatHistoryItemProps {
  chat: Chat;
}

const ChatHistoryItem: React.FC<ChatHistoryItemProps> = ({ chat }) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(chat.title);
  const [showMenu, setShowMenu] = useState(false);
  const { renameChat, deleteChat } = useChat();
  const navigate = useNavigate();

  // Navigate to chat
  const handleClick = () => {
    navigate(`/chat/${chat.id}`);
  };

  // Handle rename
  const handleRename = async () => {
    if (newTitle.trim() && newTitle !== chat.title) {
      try {
        await renameChat(chat.id, newTitle);
        setIsRenaming(false);
      } catch (error) {
        console.error('Failed to rename chat:', error);
        setNewTitle(chat.title);
      }
    } else {
      setIsRenaming(false);
      setNewTitle(chat.title);
    }
  };

  // Handle delete
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this chat?')) {
      try {
        await deleteChat(chat.id);
      } catch (error) {
        console.error('Failed to delete chat:', error);
      }
    }
  };

  // Handle rename mode
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRenaming(true);
    setShowMenu(false);
  };

  return (
    <div className={styles.container}>
      {isRenaming ? (
        // Rename Input
        <div className={styles.renameMode}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className={styles.renameInput}
            autoFocus
            onBlur={handleRename}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRename();
              if (e.key === 'Escape') {
                setIsRenaming(false);
                setNewTitle(chat.title);
              }
            }}
          />
        </div>
      ) : (
        // Chat Item
        <div className={styles.chatItem}>
          <div className={styles.chatContent} onClick={handleClick}>
            <div className={styles.icon}>💬</div>
            <div className={styles.titleContainer}>
              <p className={styles.title}>{chat.title}</p>
              <span className={styles.date}>
                {new Date(chat.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>

          {/* Menu Button */}
          <button
            className={styles.menuBtn}
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            ⋮
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className={styles.menu}>
              <button
                className={styles.menuItem}
                onClick={handleEditClick}
              >
                ✏️ Rename
              </button>
              <button
                className={`${styles.menuItem} ${styles.danger}`}
                onClick={handleDelete}
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatHistoryItem;