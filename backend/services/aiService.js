const { GoogleGenerativeAI } = require('@google/generative-ai');

const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite';

const SYSTEM_PROMPT = `You are SQL Tutor Bot, an expert SQL teacher.
Answer only SQL-related questions.
Return JSON only in this format:
{
  "answer": string,
  "sqlQuery": string,
  "explanation": [{"title": string, "description": string}],
  "resultPreview": {"columns": string[], "rows": object[]},
  "suggestions": string[]
}
No markdown fences.
No extra text.`;

const safeParseJSON = (text) => {
  if (!text) {
    throw new Error('Empty Gemini response');
  }

  const trimmed = text.trim();

  try {
    return JSON.parse(trimmed);
  } catch (err) {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error('No JSON object found in Gemini response');
    }
    return JSON.parse(match[0]);
  }
};

const normalizeExplanation = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value
      .map((item, index) => {
        if (typeof item === 'string') {
          return {
            title: `Step ${index + 1}`,
            description: item
          };
        }

        return {
          title: String(item.title || `Step ${index + 1}`),
          description: String(item.description || '')
        };
      })
      .filter((item) => item.description.trim());
  }

  if (typeof value === 'string') {
    return value
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, index) => ({
        title: `Step ${index + 1}`,
        description: line
      }));
  }

  return [];
};

const normalizeResultPreview = (value) => {
  if (!value || typeof value !== 'object') {
    return {
      columns: [],
      rows: []
    };
  }

  const columns = Array.isArray(value.columns)
    ? value.columns.map((c) => String(c))
    : [];

  const rows = Array.isArray(value.rows)
    ? value.rows.filter((row) => row && typeof row === 'object')
    : [];

  return { columns, rows };
};

const normalizeSuggestions = (value) => {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item)).filter(Boolean).slice(0, 5);
};

const normalizeTutorPayload = (raw) => {
  const answer = typeof raw.answer === 'string' ? raw.answer : '';
  const sqlQuery = typeof raw.sqlQuery === 'string' ? raw.sqlQuery : '';

  return {
    answer,
    sqlQuery,
    explanation: normalizeExplanation(raw.explanation),
    resultPreview: normalizeResultPreview(raw.resultPreview),
    suggestions: normalizeSuggestions(raw.suggestions)
  };
};

const isSQLRelated = (question) => {
  const text = String(question || '').toLowerCase();
  const sqlTerms = [
    'sql',
    'join',
    'subquery',
    'normalize',
    'normalization',
    'index',
    'procedure',
    'transaction',
    'optimiz',
    'debug',
    'mysql',
    'postgres',
    'database',
    'query',
    'ddl',
    'dml'
  ];

  return sqlTerms.some((term) => text.includes(term));
};

const buildNonSQLResponse = () => ({
  answer: 'I can only help with SQL and database-related questions. Please ask about queries, joins, indexing, normalization, transactions, optimization, or SQL debugging.',
  sqlQuery: '',
  explanation: [
    {
      title: 'Scope',
      description: 'SQL Tutor Bot is limited to SQL and database topics.'
    }
  ],
  resultPreview: {
    columns: [],
    rows: []
  },
  suggestions: [
    'What is INNER JOIN?',
    'How do indexes improve query performance?',
    'Convert this English request to SQL'
  ]
});

const generateSQLTutorResponse = async (userQuestion) => {
  const question = String(userQuestion || '').trim();

  if (!question) {
    throw new Error('Question is required');
  }

  if (!isSQLRelated(question)) {
    return buildNonSQLResponse();
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const prompt = `${SYSTEM_PROMPT}\n\nUser question: ${question}`;

  const result = await model.generateContent(prompt);
  const text = result?.response?.text?.() || '';

  const parsed = safeParseJSON(text);
  return normalizeTutorPayload(parsed);
};

module.exports = {
  generateSQLTutorResponse
};
