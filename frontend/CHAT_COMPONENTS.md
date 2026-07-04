# Chat UI Components Documentation

## Overview

The chat UI has been upgraded with reusable, rich components that support markdown, SQL syntax highlighting, tables, and interactive suggestions. All components follow the premium Linear-inspired design system with smooth animations.

## Message Structure

Messages now support rich content fields:

```typescript
interface Message {
  id: number;
  chat_id: number;
  user_id: number;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
  
  // Rich content fields (optional, assistant only)
  sqlQuery?: string;
  explanation?: string | Array<{ title: string; description: string; details?: string[] }>;
  resultPreview?: {
    columns: string[];
    rows: Array<{ [key: string]: any }>;
  };
  suggestions?: string[];
}
```

## Components

### 1. **AnswerCard.tsx**
Renders concise explanations with markdown support.

**Features:**
- Markdown formatting (bold, italic, inline code)
- Automatic line break handling
- Smooth animations

**Usage Example:**
```typescript
<AnswerCard
  text="The **SELECT** statement is used to retrieve data from a database. *For example:* `SELECT * FROM users`"
  animated={true}
/>
```

---

### 2. **SQLCodeCard.tsx**
Displays SQL code with syntax highlighting and action buttons.

**Features:**
- SQL keyword highlighting
- String and number coloring
- Copy button with feedback
- Run in Playground button
- Dark theme with horizontal scrolling

**Usage Example:**
```typescript
<SQLCodeCard
  query="SELECT users.id, users.name, COUNT(orders.id) as order_count
FROM users
LEFT JOIN orders ON users.id = orders.user_id
GROUP BY users.id
ORDER BY order_count DESC"
  onRun={() => handleRunSQL(query)}
  animated={true}
/>
```

**Syntax Highlighting:**
- Keywords: Blue
- Strings: Green
- Numbers: Yellow
- Comments: Gray

---

### 3. **ExplanationCard.tsx**
Step-by-step explanations with expandable details.

**Features:**
- Numbered steps with gradient badges
- Expandable detail sections
- Hover effects for better UX
- Supports array of objects or simple strings

**Usage Example:**
```typescript
<ExplanationCard
  steps={[
    {
      title: "FROM Clause",
      description: "Specifies which table(s) to query data from",
      details: [
        "Can be a single table or multiple tables",
        "Supports JOINs and subqueries",
        "Required in SELECT statements"
      ]
    },
    {
      title: "WHERE Clause",
      description: "Filters rows based on conditions",
      details: [
        "Uses comparison operators (=, >, <, etc)",
        "Supports AND, OR, NOT operators",
        "Applied before GROUP BY"
      ]
    }
  ]}
  title="SQL Query Execution Order"
  animated={true}
/>
```

---

### 4. **ResultTableCard.tsx**
Renders SQL query results in an interactive table.

**Features:**
- Auto-formatted columns
- Row alternating colors
- NULL value highlighting
- Boolean and number formatting
- Scrollable for large datasets
- Result count display

**Usage Example:**
```typescript
<ResultTableCard
  columns={["id", "name", "email", "created_at"]}
  rows={[
    { id: 1, name: "Alice", email: "alice@example.com", created_at: "2024-01-15" },
    { id: 2, name: "Bob", email: "bob@example.com", created_at: "2024-01-20" },
    { id: 3, name: null, email: "charlie@example.com", created_at: "2024-02-01" }
  ]}
  title="Users Table"
  animated={true}
/>
```

---

### 5. **SuggestedPrompts.tsx**
Clickable follow-up questions for continuing the conversation.

**Features:**
- Interactive button-style suggestions
- Hover animation with gradient background
- Arrow indicator with translation effect
- Easy onClick handling

**Usage Example:**
```typescript
<SuggestedPrompts
  suggestions={[
    "How do I optimize this query?",
    "Explain the LEFT JOIN in detail",
    "What's the execution plan?",
    "How to add indexes for this query?"
  ]}
  onSelect={(suggestion) => handleSendMessage(suggestion)}
  animated={true}
/>
```

---

### 6. **MessageBubble.tsx**
Wraps user and assistant messages with rich content support.

**Features:**
- User message: Gradient purple bubble, right-aligned
- Assistant message: White with rich cards, left-aligned
- Auto-renders all card types
- Timestamp display
- Responsive design

**Usage Example:**
```typescript
<MessageBubble
  message={{
    id: 1,
    chat_id: 1,
    user_id: 1,
    role: 'assistant',
    content: 'Here\'s how to write a JOIN query:',
    created_at: new Date().toISOString(),
    sqlQuery: 'SELECT * FROM users JOIN orders ON users.id = orders.user_id',
    explanation: [
      {
        title: 'Step 1',
        description: 'Identify tables to join',
        details: ['users', 'orders']
      }
    ],
    suggestions: ['Show me an INNER JOIN example', 'How about RIGHT JOIN?']
  }}
  onRunSQL={(query) => navigate('/playground')}
  onSelectSuggestion={(s) => sendMessage(s)}
/>
```

---

### 7. **ChatWindow.tsx**
Main container for displaying all messages with loading states.

**Features:**
- Empty state with example prompts
- Auto-scroll to latest message
- Loading indicator with animation
- Smooth message animations
- Full-screen responsive layout

**Usage Example:**
```typescript
<ChatWindow
  messages={messages}
  loading={loading}
  onRunSQL={handleRunSQL}
  onSelectSuggestion={handleSelectSuggestion}
/>
```

---

## Complete Message Example (Backend Response)

```json
{
  "id": 42,
  "chat_id": 5,
  "user_id": 1,
  "role": "assistant",
  "content": "Here's how to use JOINs to combine data from multiple tables:",
  "created_at": "2024-02-15T10:30:00Z",
  "sqlQuery": "SELECT users.id, users.name, COUNT(orders.id) as total_orders FROM users LEFT JOIN orders ON users.id = orders.user_id GROUP BY users.id ORDER BY total_orders DESC",
  "explanation": [
    {
      "title": "SELECT Clause",
      "description": "Choose which columns to display",
      "details": [
        "users.id - Get user ID",
        "users.name - Get user name",
        "COUNT(orders.id) - Count orders for each user"
      ]
    },
    {
      "title": "LEFT JOIN",
      "description": "Combine users with their orders, keeping all users",
      "details": [
        "Returns all users even if they have no orders",
        "Matches orders where user_id matches",
        "Use INNER JOIN to only get users with orders"
      ]
    },
    {
      "title": "GROUP BY",
      "description": "Combine rows with the same user_id",
      "details": [
        "Required when using aggregate functions like COUNT",
        "Groups results by specified columns",
        "Each group gets one row in output"
      ]
    }
  ],
  "resultPreview": {
    "columns": ["id", "name", "total_orders"],
    "rows": [
      { "id": 1, "name": "Alice Johnson", "total_orders": 5 },
      { "id": 2, "name": "Bob Smith", "total_orders": 3 },
      { "id": 3, "name": "Charlie Brown", "total_orders": 0 },
      { "id": 4, "name": "Diana Prince", "total_orders": 7 }
    ]
  },
  "suggestions": [
    "How do I optimize this query with indexes?",
    "Explain the difference between LEFT and INNER JOIN",
    "How would this work with 3 tables?",
    "What about RIGHT JOIN instead?"
  ]
}
```

---

## Design System

### Colors
- **Primary Gradient**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Background**: `#f9fafb` (light gray)
- **Card Background**: `#ffffff` (white)
- **Dark Code Background**: `#1f2937` (dark gray)
- **Text Primary**: `#1f2937` (dark)
- **Text Secondary**: `#6b7280` (medium gray)
- **Text Tertiary**: `#9ca3af` (light gray)

### Typography
- **Headings**: 700 weight, -0.5px letter-spacing
- **Body**: 14px, 1.6 line-height
- **Code**: Monaco, 13px

### Animations
- **Slide Up**: 400ms ease - Cards slide in from bottom
- **Fade In**: 300ms ease - Subtle fade effect
- **Wave**: 1.4s infinite - Loading indicator dots

---

## Responsive Behavior

### Desktop (1024px+)
- Full width cards
- Two-column layout ready
- All interactive elements visible

### Tablet (768px - 1023px)
- Slightly reduced padding
- Cards maintain max-width
- Touch-friendly buttons

### Mobile (< 768px)
- Single column layout
- Reduced font sizes
- Touch-optimized interactions
- Table horizontal scroll

---

## Integration Guide

### 1. **With ChatContext**
```typescript
import { useChat } from '../context/ChatContext';
import ChatWindow from '../components/chat/ChatWindow';

function MyComponent() {
  const { messages, loading } = useChat();
  
  return (
    <ChatWindow
      messages={messages}
      loading={loading}
      onRunSQL={handleRunSQL}
      onSelectSuggestion={handleSelectSuggestion}
    />
  );
}
```

### 2. **Custom Rich Content Handler**
```typescript
const handleAssistantResponse = (response) => {
  // Transform API response to Message format
  const richMessage: Message = {
    id: Date.now(),
    chat_id: currentChat.id,
    user_id: user.id,
    role: 'assistant',
    content: response.text,
    created_at: new Date().toISOString(),
    sqlQuery: response.sql || undefined,
    explanation: response.steps || undefined,
    resultPreview: response.results || undefined,
    suggestions: response.followUps || undefined
  };
  
  setMessages(prev => [...prev, richMessage]);
};
```

---

## Component Re-export

All components are exported from `src/components/chat/cards/index.ts`:

```typescript
import {
  AnswerCard,
  SQLCodeCard,
  ExplanationCard,
  ResultTableCard,
  SuggestedPrompts,
  MessageBubble
} from '../components/chat/cards';
```

---

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- ARIA labels on interactive elements
- Color contrast compliant (WCAG AA)
- Focus indicators on all buttons

---

## Performance

- Components are memoized
- CSS modules prevent style conflicts
- Lazy loading ready
- Smooth 60fps animations
- Optimized re-renders

---

## Future Enhancements

- [ ] Code syntax highlighting for other languages
- [ ] Collapsible card sections
- [ ] Message editing and deletion
- [ ] Rich text editor for input
- [ ] File upload support
- [ ] Code execution in browser
- [ ] Database visualization
- [ ] Query performance metrics
