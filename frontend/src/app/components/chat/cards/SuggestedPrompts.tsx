/**
 * Suggested Prompts - Renders clickable follow-up questions
 */

import React from 'react';
import styles from './Cards.module.css';

interface SuggestedPromptsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  animated?: boolean;
}

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({
  suggestions,
  onSelect,
  animated = true
}) => {
  return (
    <div className={`${styles.suggestionsCard} ${animated ? styles.animated : ''}`}>
      <h3 className={styles.suggestionsTitle}>💡 Suggested Follow-ups</h3>
      <div className={styles.suggestionsList}>
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            className={styles.suggestionItem}
            onClick={() => onSelect(suggestion)}
            title={suggestion}
          >
            <span className={styles.suggestionText}>{suggestion}</span>
            <span className={styles.suggestionArrow}>→</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;