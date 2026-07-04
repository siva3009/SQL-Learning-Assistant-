const toISO = (value) => {
  if (!value) {
    return new Date().toISOString();
  }

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
};

const normalizeExplanation = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item, index) => {
      if (!item || typeof item !== 'object') {
        return null;
      }

      const description = String(item.description || '').trim();
      if (!description) {
        return null;
      }

      return {
        title: String(item.title || `Step ${index + 1}`),
        description
      };
    })
    .filter(Boolean);
};

const normalizeResultPreview = (value) => {
  if (!value || typeof value !== 'object') {
    return { columns: [], rows: [] };
  }

  return {
    columns: Array.isArray(value.columns) ? value.columns.map((column) => String(column)) : [],
    rows: Array.isArray(value.rows) ? value.rows.filter((row) => row && typeof row === 'object') : []
  };
};

const normalizeSuggestions = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => String(item)).filter(Boolean).slice(0, 5);
};

const serializeAssistantPayload = (payload = {}) => {
  const normalizedPayload = {
    answer: String(payload.answer || ''),
    sqlQuery: String(payload.sqlQuery || ''),
    explanation: normalizeExplanation(payload.explanation),
    resultPreview: normalizeResultPreview(payload.resultPreview),
    suggestions: normalizeSuggestions(payload.suggestions)
  };

  return JSON.stringify(normalizedPayload);
};

const safeParseJSON = (text) => {
  if (!text || typeof text !== 'string') {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
};

const hydrateMessageRow = (row) => {
  const createdAt = toISO(row.created_at);
  const baseMessage = {
    id: row.id,
    chat_id: row.chat_id,
    user_id: row.user_id,
    role: row.role,
    content: row.content,
    created_at: createdAt
  };

  if (row.role !== 'assistant') {
    return baseMessage;
  }

  const parsedPayload = safeParseJSON(row.content);
  if (!parsedPayload) {
    return {
      ...baseMessage,
      answer: row.content,
      sqlQuery: '',
      explanation: [],
      resultPreview: { columns: [], rows: [] },
      suggestions: []
    };
  }

  const answer = String(parsedPayload.answer || '').trim() || String(row.content || '').trim();

  return {
    ...baseMessage,
    content: answer,
    answer,
    sqlQuery: String(parsedPayload.sqlQuery || ''),
    explanation: normalizeExplanation(parsedPayload.explanation),
    resultPreview: normalizeResultPreview(parsedPayload.resultPreview),
    suggestions: normalizeSuggestions(parsedPayload.suggestions)
  };
};

module.exports = {
  hydrateMessageRow,
  serializeAssistantPayload
};