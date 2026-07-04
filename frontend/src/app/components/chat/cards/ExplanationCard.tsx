/**
 * Explanation Card - Renders step-by-step explanations
 * Bullet format with expandable details
 */

import React, { useState } from 'react';
import styles from './Cards.module.css';

interface ExplanationStep {
  title: string;
  description: string;
  details?: string[];
}

interface ExplanationCardProps {
  steps: ExplanationStep[] | string[];
  title?: string;
  animated?: boolean;
}

const ExplanationCard: React.FC<ExplanationCardProps> = ({ steps, title = 'Explanation', animated = true }) => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  // Handle both string array and object array
  const processedSteps: ExplanationStep[] = steps.map((step, idx) => {
    if (typeof step === 'string') {
      return {
        title: `Step ${idx + 1}`,
        description: step
      };
    }
    return step;
  });

  const toggleStep = (idx: number) => {
    setExpandedStep(expandedStep === idx ? null : idx);
  };

  return (
    <div className={`${styles.explanationCard} ${animated ? styles.animated : ''}`}>
      <h3 className={styles.explanationTitle}>📝 {title}</h3>
      <div className={styles.stepsList}>
        {processedSteps.map((step, idx) => (
          <div
            key={idx}
            className={styles.step}
            onClick={() => step.details && toggleStep(idx)}
          >
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>{idx + 1}</span>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
              {step.details && (
                <button
                  className={`${styles.expandBtn} ${expandedStep === idx ? styles.expanded : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStep(idx);
                  }}
                >
                  ▼
                </button>
              )}
            </div>

            {/* Expanded Details */}
            {step.details && expandedStep === idx && (
              <div className={styles.stepDetails}>
                <ul className={styles.detailsList}>
                  {step.details.map((detail, detailIdx) => (
                    <li key={detailIdx}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplanationCard;