/**
 * SQL Code Card - Renders SQL code with syntax highlighting
 * Includes copy and run buttons
 */

import React, { useState } from 'react';
import styles from './Cards.module.css';

interface SQLCodeCardProps {
  query: string;
  onRun?: () => void;
  animated?: boolean;
}

const SQLCodeCard: React.FC<SQLCodeCardProps> = ({ query, onRun, animated = true }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple SQL syntax highlighting
  const highlightSQL = (code: string) => {
    const keywords = /\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AND|OR|GROUP|BY|ORDER|LIMIT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|TABLE|DATABASE)\b/gi;
    const strings = /'[^']*'/g;
    const numbers = /\b\d+\b/g;
    const comments = /--.*/g;

    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

    highlighted = highlighted.replace(comments, '<span class="' + styles.comment + '">$&</span>');
    highlighted = highlighted.replace(strings, '<span class="' + styles.string + '">$&</span>');
    highlighted = highlighted.replace(keywords, '<span class="' + styles.keyword + '">$&</span>');
    highlighted = highlighted.replace(numbers, '<span class="' + styles.number + '">$&</span>');

    return highlighted;
  };

  return (
    <div className={`${styles.sqlCard} ${animated ? styles.animated : ''}`}>
      <div className={styles.sqlHeader}>
        <span className={styles.sqlLabel}>💾 SQL Query</span>
        <div className={styles.sqlActions}>
          <button
            className={styles.actionBtn}
            onClick={handleCopy}
            title="Copy to clipboard"
          >
            {copied ? '✓ Copied' : '📋 Copy'}
          </button>
          {onRun && (
            <button
              className={styles.actionBtn}
              onClick={onRun}
              title="Run in playground"
            >
              ▶️ Run
            </button>
          )}
        </div>
      </div>
      <pre className={styles.sqlCode}>
        <code
          dangerouslySetInnerHTML={{
            __html: highlightSQL(query)
          }}
        />
      </pre>
    </div>
  );
};

export default SQLCodeCard;