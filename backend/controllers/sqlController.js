const { pool } = require('../config/db');
const { generateSQLTutorResponse } = require('../services/aiService');

const createTimestamp = () => new Date().toISOString();

const ALLOWED_QUERY_TYPES = new Set(['SELECT', 'SHOW', 'DESCRIBE', 'DESC', 'EXPLAIN']);
const BLOCKED_KEYWORDS = [
  'DROP',
  'DELETE',
  'UPDATE',
  'ALTER',
  'TRUNCATE',
  'INSERT',
  'CREATE',
  'GRANT'
];

const parseAndValidateQuery = (rawQuery) => {
  const query = String(rawQuery || '').trim();

  if (!query) {
    const error = new Error('SQL query is required');
    error.statusCode = 400;
    error.errorCode = 'VALIDATION_ERROR';
    throw error;
  }

  // Block comment-based bypass attempts and inline comment abuse.
  if (/--|\/\*|\*\/|#/i.test(query)) {
    const error = new Error('SQL comments are not allowed in Playground queries');
    error.statusCode = 400;
    error.errorCode = 'QUERY_BLOCKED';
    throw error;
  }

  const withoutTrailingSemicolon = query.replace(/;+\s*$/, '');
  if (withoutTrailingSemicolon.includes(';')) {
    const error = new Error('Multiple SQL statements are not allowed');
    error.statusCode = 400;
    error.errorCode = 'QUERY_BLOCKED';
    throw error;
  }

  const firstToken = withoutTrailingSemicolon.split(/\s+/)[0].toUpperCase();
  if (!ALLOWED_QUERY_TYPES.has(firstToken)) {
    const error = new Error(`Only ${Array.from(ALLOWED_QUERY_TYPES).join(', ')} queries are allowed`);
    error.statusCode = 400;
    error.errorCode = 'QUERY_BLOCKED';
    throw error;
  }

  const blockedKeywordRegex = new RegExp(`\\b(${BLOCKED_KEYWORDS.join('|')})\\b`, 'i');
  if (blockedKeywordRegex.test(withoutTrailingSemicolon)) {
    const error = new Error('Dangerous SQL keywords are blocked in Playground');
    error.statusCode = 400;
    error.errorCode = 'QUERY_BLOCKED';
    throw error;
  }

  return {
    sanitizedQuery: withoutTrailingSemicolon,
    queryType: firstToken
  };
};

const mapSQLExecutionResult = ({ queryType, rows, fields, executionTimeMs }) => {
  const normalizedRows = Array.isArray(rows) ? rows : [];
  const columns = Array.isArray(fields) && fields.length > 0
    ? fields.map((field) => field.name)
    : (normalizedRows[0] && typeof normalizedRows[0] === 'object' ? Object.keys(normalizedRows[0]) : []);

  const affectedRows = Number.isFinite(rows?.affectedRows)
    ? Number(rows.affectedRows)
    : 0;
  const warningCount = Number.isFinite(rows?.warningStatus)
    ? Number(rows.warningStatus)
    : 0;

  return {
    success: true,
    queryType,
    executionTimeMs,
    rowCount: normalizedRows.length,
    affectedRows,
    columns,
    rows: normalizedRows,
    warnings: warningCount > 0 ? [`MySQL reported ${warningCount} warning(s)`] : []
  };
};

const buildRichPayload = (query = 'SELECT * FROM users LIMIT 10;') => ({
  answer: 'Here is a mock SQL tutoring response.',
  sqlQuery: query,
  explanation: [
    {
      title: 'Step 1',
      description: 'Read the request and identify the intent.'
    },
    {
      title: 'Step 2',
      description: 'Construct a safe example query.'
    }
  ],
  resultPreview: {
    columns: ['id', 'name', 'email'],
    rows: [
      { id: 1, name: 'Demo User', email: 'demo@example.com' }
    ]
  },
  suggestions: [
    'Explain this SQL',
    'Optimize the query',
    'Show a JOIN example'
  ]
});

const generateSQL = (req, res) => {
  const { prompt } = req.body || {};
  const userId = Number(req.user?.id || 0);
  const richPayload = buildRichPayload('SELECT * FROM users LIMIT 10;');

  return res.status(200).json({
    success: true,
    id: 1,
    user_id: userId,
    created_at: createTimestamp(),
    prompt: prompt || '',
    ...richPayload
  });
};

const explainSQL = (req, res) => {
  const { query } = req.body || {};
  const userId = Number(req.user?.id || 0);

  if (!query || !String(query).trim()) {
    return res.status(400).json({
      success: false,
      message: 'SQL query is required',
      error: 'VALIDATION_ERROR'
    });
  }

  return generateSQLTutorResponse(`Explain this SQL query in detail and provide tutoring guidance:\n${String(query).trim()}`)
    .then((payload) => {
      return res.status(200).json({
        success: true,
        id: 2,
        user_id: userId,
        created_at: createTimestamp(),
        ...payload
      });
    })
    .catch((error) => {
      console.error('SQL explain generation failed:', error.message);
      return res.status(502).json({
        success: false,
        message: 'Unable to explain SQL at the moment. Please try again.',
        error: 'AI_SERVICE_UNAVAILABLE'
      });
    });
};

const runSQL = async (req, res) => {
  const { query } = req.body || {};
  const userId = Number(req.user?.id || 0);

  try {
    const { sanitizedQuery, queryType } = parseAndValidateQuery(query);
    const startedAt = Date.now();
    const [rows, fields] = await pool.execute(sanitizedQuery);
    const executionTimeMs = Date.now() - startedAt;

    return res.status(200).json({
      ...mapSQLExecutionResult({ queryType, rows, fields, executionTimeMs }),
      id: 3,
      user_id: userId,
      created_at: createTimestamp()
    });
  } catch (error) {
    if (error.errorCode === 'QUERY_BLOCKED' || error.errorCode === 'VALIDATION_ERROR') {
      return res.status(error.statusCode || 400).json({
        success: false,
        message: error.message,
        error: error.errorCode,
        warnings: []
      });
    }

    if (error?.code === 'ER_PARSE_ERROR') {
      return res.status(400).json({
        success: false,
        message: error.sqlMessage || 'SQL syntax error',
        error: 'SQL_SYNTAX_ERROR',
        details: {
          mysqlCode: error.code
        },
        warnings: []
      });
    }

    console.error('SQL execution failed:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Database query execution failed',
      error: 'DB_EXECUTION_ERROR',
      details: {
        mysqlCode: error.code || null
      },
      warnings: []
    });
  }
};

const quiz = (req, res) => {
  const userId = Number(req.user?.id || 0);
  return res.status(200).json({
    success: true,
    user_id: userId,
    created_at: createTimestamp(),
    quiz: [
      {
        id: 1,
        question: 'Which clause filters rows before grouping?',
        options: ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'],
        answer: 'WHERE'
      }
    ]
  });
};

module.exports = {
  generateSQL,
  explainSQL,
  runSQL,
  quiz
};