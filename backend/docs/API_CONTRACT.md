# SQL Tutor Bot API Contract

This document describes the current placeholder backend responses and the payloads expected by the frontend.

## Shared Response Notes

- All endpoints return JSON.
- All timestamp fields are ISO 8601 strings.
- Chat and message objects include IDs, timestamps, and roles.
- Rich assistant payloads include:
  - `answer`
  - `sqlQuery`
  - `explanation`
  - `resultPreview`
  - `suggestions`

## Auth API

### POST `/api/auth/register`

Request body:

```json
{
  "username": "demo_user",
  "email": "demo@example.com",
  "password": "secret"
}
```

Response body:

```json
{
  "success": true,
  "message": "Registration successful",
  "user": {
    "id": 1,
    "username": "demo_user",
    "email": "demo@example.com",
    "created_at": "2026-05-06T12:00:00.000Z",
    "updated_at": "2026-05-06T12:00:00.000Z"
  },
  "token": "mock-jwt-token"
}
```

Status codes: `201`

### POST `/api/auth/login`

Request body:

```json
{
  "email": "demo@example.com",
  "password": "secret"
}
```

Response body:

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "demo_user",
    "email": "demo@example.com",
    "created_at": "2026-05-06T12:00:00.000Z",
    "updated_at": "2026-05-06T12:00:00.000Z"
  },
  "token": "mock-jwt-token"
}
```

Status codes: `200`

### GET `/api/auth/profile`

Request body: none.

Response body:

```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "demo_user",
    "email": "demo@example.com",
    "created_at": "2026-05-06T12:00:00.000Z",
    "updated_at": "2026-05-06T12:00:00.000Z"
  }
}
```

Status codes: `200`

## Chat API

### POST `/api/chat/new`

Request body:

```json
{
  "title": "New Chat"
}
```

Response body:

```json
{
  "success": true,
  "message": "Chat created",
  "chat": {
    "id": 3,
    "user_id": 1,
    "title": "New Chat",
    "created_at": "2026-05-06T12:00:00.000Z",
    "updated_at": "2026-05-06T12:00:00.000Z"
  },
  "messages": []
}
```

Status codes: `201`

### GET `/api/chat/history`

Request body: none.

Response body:

```json
{
  "success": true,
  "chats": [
    {
      "id": 1,
      "user_id": 1,
      "title": "Mock SQL Chat",
      "created_at": "2026-05-06T12:00:00.000Z",
      "updated_at": "2026-05-06T12:00:00.000Z"
    }
  ]
}
```

Status codes: `200`

### GET `/api/chat/search?q=...`

Request body: none.

Response body:

```json
{
  "success": true,
  "chats": []
}
```

Status codes: `200`

### GET `/api/chat/:id`

Request body: none.

Response body:

```json
{
  "success": true,
  "chat": {
    "id": 1,
    "user_id": 1,
    "title": "Chat 1",
    "created_at": "2026-05-06T12:00:00.000Z",
    "updated_at": "2026-05-06T12:00:00.000Z"
  },
  "messages": [
    {
      "id": 1,
      "chat_id": 1,
      "user_id": 1,
      "role": "user",
      "content": "How do I write a JOIN query?",
      "created_at": "2026-05-06T12:00:00.000Z"
    },
    {
      "id": 2,
      "chat_id": 1,
      "user_id": 0,
      "role": "assistant",
      "content": "Mock assistant response.",
      "answer": "Mock assistant response.",
      "sqlQuery": "SELECT * FROM users LIMIT 10;",
      "explanation": [
        {
          "title": "Step 1",
          "description": "Review the query structure."
        }
      ],
      "resultPreview": {
        "columns": ["id", "name", "email"],
        "rows": [
          {
            "id": 1,
            "name": "Demo User",
            "email": "demo@example.com"
          }
        ]
      },
      "suggestions": [
        "Explain this query",
        "Show an optimized version",
        "Add an example with JOIN"
      ],
      "created_at": "2026-05-06T12:00:00.000Z"
    }
  ]
}
```

Status codes: `200`

### PUT `/api/chat/:id/rename`

Request body:

```json
{
  "title": "Renamed Chat"
}
```

Response body:

```json
{
  "success": true,
  "message": "Chat renamed",
  "chat": {
    "id": 1,
    "user_id": 1,
    "title": "Renamed Chat",
    "created_at": "2026-05-06T12:00:00.000Z",
    "updated_at": "2026-05-06T12:00:00.000Z"
  }
}
```

Status codes: `200`

### DELETE `/api/chat/:id`

Request body: none.

Response body:

```json
{
  "success": true,
  "message": "Chat deleted",
  "chat_id": 1
}
```

Status codes: `200`

## Message API

### POST `/api/message/send`

Request body:

```json
{
  "chat_id": 1,
  "content": "Explain JOINs"
}
```

Response body:

```json
{
  "success": true,
  "message": "Message sent",
  "chat_id": 1,
  "messages": [
    {
      "id": 1,
      "chat_id": 1,
      "user_id": 1,
      "role": "user",
      "content": "Explain JOINs",
      "created_at": "2026-05-06T12:00:00.000Z"
    },
    {
      "id": 2,
      "chat_id": 1,
      "user_id": 0,
      "role": "assistant",
      "content": "Here is a mock SQL tutoring response.",
      "answer": "Here is a mock SQL tutoring response.",
      "sqlQuery": "SELECT * FROM users LIMIT 10;",
      "explanation": [
        {
          "title": "Step 1",
          "description": "Understand the question."
        }
      ],
      "resultPreview": {
        "columns": ["id", "name", "email"],
        "rows": [
          {
            "id": 1,
            "name": "Demo User",
            "email": "demo@example.com"
          }
        ]
      },
      "suggestions": [
        "Explain the query step by step",
        "Show a JOIN example",
        "Optimize this query"
      ],
      "created_at": "2026-05-06T12:00:00.000Z"
    }
  ]
}
```

Status codes: `200`

## SQL API

### POST `/api/sql/generate`

Request body:

```json
{
  "prompt": "Show me active users"
}
```

Response body:

```json
{
  "success": true,
  "id": 1,
  "created_at": "2026-05-06T12:00:00.000Z",
  "prompt": "Show me active users",
  "answer": "Here is a mock SQL tutoring response.",
  "sqlQuery": "SELECT * FROM users LIMIT 10;",
  "explanation": [
    {
      "title": "Step 1",
      "description": "Read the request and identify the intent."
    }
  ],
  "resultPreview": {
    "columns": ["id", "name", "email"],
    "rows": [
      {
        "id": 1,
        "name": "Demo User",
        "email": "demo@example.com"
      }
    ]
  },
  "suggestions": [
    "Explain this SQL",
    "Optimize the query",
    "Show a JOIN example"
  ]
}
```

Status codes: `200`

### POST `/api/sql/explain`

Request body:

```json
{
  "query": "SELECT * FROM users"
}
```

Response body:

```json
{
  "success": true,
  "id": 2,
  "created_at": "2026-05-06T12:00:00.000Z",
  "answer": "Here is a mock SQL tutoring response.",
  "sqlQuery": "SELECT * FROM users",
  "explanation": [
    {
      "title": "Step 1",
      "description": "Read the request and identify the intent."
    }
  ],
  "resultPreview": {
    "columns": ["id", "name", "email"],
    "rows": [
      {
        "id": 1,
        "name": "Demo User",
        "email": "demo@example.com"
      }
    ]
  },
  "suggestions": [
    "Explain this SQL",
    "Optimize the query",
    "Show a JOIN example"
  ]
}
```

Status codes: `200`

### POST `/api/sql/run`

Request body:

```json
{
  "query": "SELECT * FROM users LIMIT 10;"
}
```

Response body:

```json
{
  "success": true,
  "id": 3,
  "created_at": "2026-05-06T12:00:00.000Z",
  "answer": "Query executed successfully.",
  "sqlQuery": "SELECT * FROM users LIMIT 10;",
  "explanation": [
    {
      "title": "Result set",
      "description": "Returned mock rows from the query."
    }
  ],
  "resultPreview": {
    "columns": ["id", "name", "email"],
    "rows": [
      {
        "id": 1,
        "name": "Demo User",
        "email": "demo@example.com"
      }
    ]
  },
  "suggestions": [
    "Run another query",
    "Explain the result",
    "Try a JOIN query"
  ]
}
```

Status codes: `200`

### GET `/api/sql/quiz`

Request body: none.

Response body:

```json
{
  "success": true,
  "created_at": "2026-05-06T12:00:00.000Z",
  "quiz": [
    {
      "id": 1,
      "question": "Which clause filters rows before grouping?",
      "options": ["WHERE", "HAVING", "ORDER BY", "LIMIT"],
      "answer": "WHERE"
    }
  ]
}
```

Status codes: `200`
