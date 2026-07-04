import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sqlAPI } from "../utils/api";
import { 
  Database, Table2, FileCode2, History, Play, Lightbulb, 
  Wand2, Zap, Download, Clock, ChevronRight, 
  TerminalSquare, Sparkles, Code2, BookOpen, AlertCircle
} from "lucide-react";

// Mock Data
const SCHEMA = [
  { name: "users", columns: ["id", "name", "email", "created_at"] },
  { name: "orders", columns: ["id", "user_id", "total", "status", "date"] },
  { name: "employees", columns: ["id", "name", "department", "salary"] },
  { name: "products", columns: ["id", "name", "price", "stock"] },
];

const SAVED_QUERIES = [
  { id: 1, name: "Active Users Count", time: "2h ago" },
  { id: 2, name: "Monthly Revenue", time: "1d ago" },
  { id: 3, name: "Top 10 Products", time: "3d ago" },
];

type QueryRow = Record<string, unknown> | unknown[];

interface QueryResult {
  columns: string[];
  rows: QueryRow[];
}

// Background Code Particles
const Particles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; text: string; delay: number }>>([]);

  useEffect(() => {
    const chars = ["SELECT", "FROM", "WHERE", "JOIN", "*", "GROUP BY", "ORDER BY"];
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      text: chars[Math.floor(Math.random() * chars.length)],
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.03]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -100 }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          className="absolute text-violet-500 font-mono text-xl whitespace-nowrap"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          {p.text}
        </motion.div>
      ))}
    </div>
  );
};

export function PlaygroundPage() {
  const [query, setQuery] = useState("SELECT *\nFROM users\nWHERE status = 'active'\nORDER BY created_at DESC;");
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<QueryResult | null>(null);
  const [runMeta, setRunMeta] = useState<{ executionTimeMs: number; rowCount: number; affectedRows: number } | null>(null);
  const [queryError, setQueryError] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);
  const [explainError, setExplainError] = useState<string | null>(null);
  const [explainText, setExplainText] = useState("Run Explain to get an AI breakdown of your SQL.");
  const [optimizationTip, setOptimizationTip] = useState("Run Explain to receive optimization guidance.");
  const [similarExamples, setSimilarExamples] = useState<string[]>([
    "Count active users per month",
    "Find newly registered active users",
    "Explain this query step by step"
  ]);
  const [activeTab, setActiveTab] = useState("query1.sql");
  const [rightPanelTab, setRightPanelTab] = useState<"assistant" | "cheatsheet">("assistant");

  const handleRunQuery = async () => {
    setIsRunning(true);
    setResults(null);
    setRunMeta(null);
    setQueryError(null);

    try {
      const data = await sqlAPI.runQuery(query);
      const rows = Array.isArray(data.rows) ? data.rows : [];
      const columns = Array.isArray(data.columns) ? data.columns : [];

      setResults({ columns, rows });
      setRunMeta({
        executionTimeMs: Number(data.executionTimeMs || 0),
        rowCount: Number(data.rowCount || rows.length),
        affectedRows: Number(data.affectedRows || 0)
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to execute SQL query";
      setQueryError(message);
    } finally {
      setIsRunning(false);
    }
  };

  const handleExplainQuery = async () => {
    setIsExplaining(true);
    setExplainError(null);

    try {
      const data = await sqlAPI.explainSQL(query);
      const explanationParts = Array.isArray(data.explanation)
        ? data.explanation
            .map((item: { title?: string; description?: string }) => {
              if (!item || !item.description) {
                return "";
              }
              return item.title ? `${item.title}: ${item.description}` : item.description;
            })
            .filter(Boolean)
        : [];

      setExplainText(String(data.answer || "No explanation available."));
      setOptimizationTip(explanationParts[0] || "No optimization tip available.");

      const suggestions = Array.isArray(data.suggestions)
        ? data.suggestions.map((item: unknown) => String(item)).filter(Boolean).slice(0, 3)
        : [];

      setSimilarExamples(suggestions.length > 0 ? suggestions : [
        "Try explaining a JOIN query",
        "Try explaining an aggregation query",
        "Try explaining a subquery"
      ]);
      setRightPanelTab("assistant");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to explain SQL query";
      setExplainError(message);
    } finally {
      setIsExplaining(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0a0a0a] relative overflow-hidden text-zinc-300">
      <Particles />

      {/* Header */}
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 z-10 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
            <TerminalSquare className="w-4 h-4 text-violet-400" />
          </div>
          <h1 className="font-semibold text-zinc-100">SQL Playground</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Database Connected
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden z-10">
        
        {/* Left Sidebar - Schema */}
        <div className="w-64 border-r border-white/5 flex flex-col bg-[#111]/50 backdrop-blur-sm overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Database className="w-3.5 h-3.5" /> Data Explorer
            </h2>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-zinc-300 mb-2 px-2">Tables</div>
                <div className="space-y-0.5">
                  {SCHEMA.map((table) => (
                    <div key={table.name} className="group">
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/5 cursor-pointer text-sm transition-colors">
                        <Table2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-zinc-300 group-hover:text-zinc-100">{table.name}</span>
                      </div>
                      <div className="pl-7 hidden group-hover:block space-y-1 mt-1 mb-2">
                        {table.columns.map((col) => (
                          <div key={col} className="text-xs text-zinc-500 flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-zinc-700" />
                            {col}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-zinc-300 mb-2 px-2 flex items-center gap-2 mt-6">
                  <History className="w-4 h-4" /> Saved Queries
                </div>
                <div className="space-y-1">
                  {SAVED_QUERIES.map((sq) => (
                    <div key={sq.id} className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-white/5 cursor-pointer text-sm transition-colors group">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FileCode2 className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                        <span className="text-zinc-400 group-hover:text-zinc-200 truncate">{sq.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel - Editor & Results */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Editor Area */}
          <div className="flex-1 flex flex-col border-b border-white/5 bg-[#0a0a0a]">
            {/* Editor Tabs */}
            <div className="flex bg-[#111] border-b border-white/5">
              {["query1.sql", "analytics.sql"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2.5 text-sm font-medium border-r border-white/5 flex items-center gap-2 transition-colors ${
                    activeTab === tab 
                      ? "bg-[#0a0a0a] text-zinc-100 border-t-2 border-t-violet-500" 
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border-t-2 border-t-transparent"
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  {tab}
                </button>
              ))}
            </div>

            {/* Editor Actions */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#0a0a0a] border-b border-white/5">
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleRunQuery}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-all shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRunning ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Zap className="w-3.5 h-3.5" />
                    </motion.div>
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current" />
                  )}
                  Run Query
                </button>
                <button
                  onClick={handleExplainQuery}
                  disabled={isExplaining}
                  className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-zinc-300 px-3 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Wand2 className="w-3.5 h-3.5 text-cyan-400" />
                  {isExplaining ? "Explaining..." : "Explain"}
                </button>
                <button className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-zinc-300 px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  Optimize
                </button>
              </div>
              <button className="flex items-center gap-1.5 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors">
                <Sparkles className="w-3.5 h-3.5" />
                AI Hint
              </button>
            </div>

            {/* Fake Monaco Editor */}
            <div className="flex-1 flex overflow-hidden relative group">
              <div className="w-12 bg-[#0a0a0a] border-r border-white/5 py-4 flex flex-col items-center text-xs text-zinc-600 font-mono select-none">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="h-6 leading-6">{i + 1}</div>
                ))}
              </div>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                spellCheck={false}
                className="flex-1 bg-transparent p-4 text-sm font-mono text-zinc-300 leading-6 resize-none outline-none focus:ring-inset focus:ring-1 focus:ring-violet-500/30 transition-shadow selection:bg-violet-500/30"
                style={{
                  color: "#e4e4e7",
                }}
              />
              {/* Neon active border effect */}
              <div className="absolute inset-0 border border-violet-500/0 group-focus-within:border-violet-500/20 pointer-events-none transition-colors duration-300" />
            </div>
          </div>

          {/* Results Area */}
          <div className="h-64 flex flex-col bg-[#111]">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-[#111]">
              <div className="flex items-center gap-4 text-xs font-medium text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Table2 className="w-3.5 h-3.5" /> Results
                </span>
                {results && (
                  <>
                    <span className="flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5" /> {runMeta?.rowCount ?? results.rows.length} rows
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {runMeta?.executionTimeMs ?? 0}ms
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" /> {runMeta?.affectedRows ?? 0} affected
                    </span>
                  </>
                )}
              </div>
              <button className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 text-xs font-medium transition-colors">
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4">
              <AnimatePresence mode="wait">
                {isRunning ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-zinc-500"
                  >
                    <div className="relative w-12 h-12 mb-4">
                      <div className="absolute inset-0 border-2 border-violet-500/20 rounded-full" />
                      <div className="absolute inset-0 border-2 border-violet-500 rounded-full border-t-transparent animate-spin" />
                    </div>
                    <p className="text-sm font-medium animate-pulse">Executing Query...</p>
                  </motion.div>
                ) : queryError ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-red-300"
                  >
                    <AlertCircle className="w-10 h-10 mb-3 text-red-400" />
                    <p className="text-sm font-medium">{queryError}</p>
                  </motion.div>
                ) : results ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-white/5 overflow-hidden"
                  >
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-white/5 border-b border-white/5 text-zinc-300 font-medium">
                          {results.columns.map((col, i) => (
                            <th key={i} className="px-4 py-2 whitespace-nowrap">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {results.rows.map((row, i) => (
                          <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] text-zinc-400 transition-colors">
                            {(Array.isArray(row)
                              ? row
                              : results.columns.map((column) => (row as Record<string, unknown>)[column]))
                              .map((cell, j) => (
                              <td key={j} className="px-4 py-2 whitespace-nowrap">
                                {cell === 'active' ? (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400">
                                    {cell}
                                  </span>
                                ) : cell === 'inactive' ? (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-500/10 text-red-400">
                                    {cell}
                                  </span>
                                ) : (
                                  cell
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-zinc-600"
                  >
                    <TerminalSquare className="w-12 h-12 mb-3 opacity-20" />
                    <p className="text-sm">Run a query to see results</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Sidebar - AI Assistant */}
        <div className="w-80 border-l border-white/5 flex flex-col bg-[#111]/80 backdrop-blur-md">
          <div className="flex border-b border-white/5">
            <button
              onClick={() => setRightPanelTab("assistant")}
              className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-colors ${
                rightPanelTab === "assistant" 
                  ? "border-violet-500 text-violet-400" 
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              AI Assistant
            </button>
            <button
              onClick={() => setRightPanelTab("cheatsheet")}
              className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-colors ${
                rightPanelTab === "cheatsheet" 
                  ? "border-cyan-500 text-cyan-400" 
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Cheat Sheet
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <AnimatePresence mode="wait">
              {rightPanelTab === "assistant" ? (
                <motion.div 
                  key="assistant"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
                    <h3 className="text-sm font-semibold text-violet-300 mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" /> Query Explanation
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {explainText}
                    </p>
                    {explainError && (
                      <p className="text-xs text-red-300 mt-3">{explainError}</p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Optimization Tips</h3>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex gap-3">
                        <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-zinc-300">{optimizationTip}</p>
                          <p className="text-xs text-zinc-500 mt-1">Generated from the Explain response.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Similar Examples</h3>
                    <div className="space-y-2">
                      {similarExamples.map((ex, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 text-sm text-zinc-300 cursor-pointer transition-colors flex items-center justify-between group">
                          {ex}
                          <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="cheatsheet"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {[
                    { title: "Filtering", code: "WHERE col = 'value'" },
                    { title: "Sorting", code: "ORDER BY col DESC" },
                    { title: "Grouping", code: "GROUP BY col" },
                    { title: "Join", code: "INNER JOIN table2 ON..." },
                    { title: "Aggregation", code: "SELECT COUNT(*)" },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/5">
                      <div className="text-xs font-medium text-zinc-400 mb-1.5">{item.title}</div>
                      <code className="text-sm text-cyan-400 font-mono block">{item.code}</code>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
