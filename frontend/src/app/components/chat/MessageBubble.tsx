/**
 * Message Bubble - Wraps user and assistant messages
 * Supports both plain text and rich card components
 */

import React from 'react';
import { Message as MessageType } from '../../types';
import AnswerCard from './cards/AnswerCard';
import SQLCodeCard from './cards/SQLCodeCard';
import ExplanationCard from './cards/ExplanationCard';
import ResultTableCard from './cards/ResultTableCard';
import SuggestedPrompts from './cards/SuggestedPrompts';
import styles from './MessageBubble.module.css';

interface MessageBubbleProps {
  message: MessageType & {
    sqlQuery?: string;
    explanation?: string | Array<{ title: string; description: string; details?: string[] }>;
    resultPreview?: {
      columns: string[];
      rows: Array<{ [key: string]: any }>;
    };
    suggestions?: string[];
  };
  onRunSQL?: (query: string) => void;
  onSelectSuggestion?: (suggestion: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onRunSQL,
  onSelectSuggestion
}) => {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';
  const assistantText = message.content || (message as any).answer || '';

  return (
    <div className={`${styles.container} ${styles[message.role]}`}>
      {/* User Message */}
      {isUser && (
        <div className={styles.userBubble}>
          <div className={styles.messageContent}>
            {message.content}
          </div>
          <span className={styles.timestamp}>
            {new Date(message.created_at).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      )}

      {/* Assistant Message with Rich Cards */}
      {isAssistant && (
        <div className={styles.assistantBubble}>
          {/* Main Text Content */}
          {assistantText && (
            <AnswerCard text={assistantText} animated={true} />
          )}

          {/* SQL Code Block */}
          {message.sqlQuery && (
            <SQLCodeCard
              query={message.sqlQuery}
              onRun={onRunSQL ? () => onRunSQL(message.sqlQuery!) : undefined}
              animated={true}
            />
          )}

          {/* Explanation */}
          {message.explanation && (
            <ExplanationCard
              steps={typeof message.explanation === 'string'
                ? message.explanation.split('\n').filter(s => s.trim())
                : message.explanation}
              title="Explanation"
              animated={true}
            />
          )}

          {/* Result Table */}
          {message.resultPreview && (
            <ResultTableCard
              columns={message.resultPreview.columns}
              rows={message.resultPreview.rows}
              title="Query Results"
              animated={true}
            />
          )}

          {/* Suggested Prompts */}
          {message.suggestions && message.suggestions.length > 0 && (
            <SuggestedPrompts
              suggestions={message.suggestions}
              onSelect={onSelectSuggestion || (() => {})}
              animated={true}
            />
          )}

          <span className={styles.timestamp}>
            {new Date(message.created_at).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;