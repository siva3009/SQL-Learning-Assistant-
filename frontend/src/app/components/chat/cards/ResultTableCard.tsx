/**
 * Result Table Card - Renders SQL query results in a table
 */

import React from 'react';
import styles from './Cards.module.css';

interface TableRow {
  [key: string]: any;
}

interface ResultTableCardProps {
  columns: string[];
  rows: TableRow[];
  title?: string;
  animated?: boolean;
}

const ResultTableCard: React.FC<ResultTableCardProps> = ({
  columns,
  rows,
  title = 'Results',
  animated = true
}) => {
  return (
    <div className={`${styles.resultCard} ${animated ? styles.animated : ''}`}>
      <h3 className={styles.resultTitle}>📊 {title}</h3>
      <div className={styles.tableContainer}>
        <table className={styles.resultTable}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col} className={styles.tableHeader}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, rowIdx) => (
                <tr key={rowIdx} className={rowIdx % 2 === 0 ? styles.evenRow : ''}>
                  {columns.map((col) => (
                    <td key={`${rowIdx}-${col}`} className={styles.tableCell}>
                      {(() => {
                        const value = row[col];
                        if (value === null || value === undefined) {
                          return <span className={styles.null}>NULL</span>;
                        }
                        if (typeof value === 'boolean') {
                          return <span className={styles.boolean}>{String(value)}</span>;
                        }
                        if (typeof value === 'number') {
                          return <span className={styles.number}>{value}</span>;
                        }
                        return String(value);
                      })()}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className={styles.noResults}>
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {rows.length > 0 && (
        <p className={styles.resultInfo}>
          Showing {rows.length} row{rows.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
};

export default ResultTableCard;