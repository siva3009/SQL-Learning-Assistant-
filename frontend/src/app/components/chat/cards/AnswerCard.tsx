/**
 * Answer Card - Renders concise explanations with markdown support
 */

import React from 'react';
import styles from './Cards.module.css';

interface AnswerCardProps {
  text: string;
  animated?: boolean;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ text, animated = true }) => {
  // Simple markdown parser for bold, italic, code
  const renderMarkdown = (content: string) => {
    // Split by line breaks first
    const lines = content.split('\n');
    
    return lines.map((line, idx) => {
      let element = line;

      // Parse inline code
      element = element.replace(/`([^`]+)`/g, '<code>$1</code>');
      
      // Parse bold
      element = element.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
      
      // Parse italic
      element = element.replace(/\*([^\*]+)\*/g, '<em>$1</em>');

      return (
        <p
          key={idx}
          dangerouslySetInnerHTML={{ __html: element }}
          className={styles.answerText}
        />
      );
    });
  };

  return (
    <div className={`${styles.answerCard} ${animated ? styles.animated : ''}`}>
      <div className={styles.answerContent}>
        {renderMarkdown(text)}
      </div>
    </div>
  );
};

export default AnswerCard;