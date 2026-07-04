import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Bug, TerminalSquare, AlertTriangle, CheckCircle2, 
  Copy, Trash2, ShieldAlert, Sparkles, BookOpen, 
  MessageSquare, Zap, ChevronRight, Code2, History,
  Lightbulb
} from "lucide-react";

const HISTORY = [
  { id: 1, issue: "Missing GROUP BY", time: "10m ago" },
  { id: 2, issue: "Syntax error near 'JOIN'", time: "2h ago" },
  { id: 3, issue: "Ambiguous column 'id'", time: "1d ago" },
];

const COMMON_MISTAKES = [
  "SELECT * without limits",
  "Missing JOIN conditions",
  "GROUP BY column mismatch",
  "Using Reserved Words",
];

export function DebuggerPage() {
  const [query, setQuery] = useState("SELECT id, name, COUNT(order_id)\nFROM users\nJOIN orders ON users.id = orders.user_id\nWHERE status = 'active';");
  const [isDebugging, setIsDebugging] = useState(false);
  const [debugState, setDebugState] = useState<"idle" | "error" | "fixed">("idle");
  const [rightTab, setRightTab] = useState<"chat" | "fixes">("chat");

  const handleDebug = () => {
    setIsDebugging(true);
    setDebugState("idle");
    setTimeout(() => {
      setIsDebugging(false);
      setDebugState("error");
    }, 1500);
  };

  const handleFix = () => {
    setQuery("SELECT users.id, users.name, COUNT(orders.id) as order_count\nFROM users\nJOIN orders ON users.id = orders.user_id\nWHERE users.status = 'active'\nGROUP BY users.id, users.name;");
    setDebugState("fixed");
  };

  const handleClear = () => {
    setQuery("");
    setDebugState("idle");
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0a0a0a] text-zinc-300 overflow-hidden">
      
      {/* Header */}
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 z-10 bg-[#0a0a0a]/80 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20">
            <Bug className="w-4 h-4 text-red-400" />
          </div>
          <h1 className="font-semibold text-zinc-100">SQL Debugger</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            AI Powered
          </div>
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        
        {/* Left Panel */}
        <div className="w-64 border-r border-white/5 bg-[#111]/50 backdrop-blur-sm flex flex-col overflow-y-auto">
          <div className="p-4 space-y-6">
            
            <div>
              <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <History className="w-3.5 h-3.5" /> Debug History
              </h2>
              <div className="space-y-1">
                {HISTORY.map((item) => (
                  <div key={item.id} className="group flex items-center justify-between px-2 py-2 rounded-md hover:bg-white/5 cursor-pointer transition-colors">
                    <span className="text-sm text-zinc-400 group-hover:text-zinc-200 truncate pr-2">
                      {item.issue}
                    </span>
                    <span className="text-[10px] text-zinc-600 group-hover:text-zinc-500 shrink-0">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5" /> Common Mistakes
              </h2>
              <div className="space-y-2">
                {COMMON_MISTAKES.map((mistake, i) => (
                  <div key={i} className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-xs text-zinc-400 hover:text-zinc-200 hover:border-white/10 transition-colors cursor-pointer">
                    {mistake}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Center Panel */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#0a0a0a]">
          
          <div className="p-6 flex flex-col gap-6 max-w-4xl mx-auto w-full">
            
            {/* Editor Area */}
            <div className="flex flex-col rounded-xl overflow-hidden border border-white/5 bg-[#111] shadow-2xl relative">
              
              {/* Toolbar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#111]/80 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm font-medium text-zinc-300">query.sql</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleClear}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/5 rounded-md transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/5 rounded-md transition-colors">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Explain
                  </button>
                  <button 
                    onClick={handleDebug}
                    disabled={isDebugging}
                    className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-white rounded-md transition-all shadow-[0_0_15px_rgba(139,92,246,0.2)] ${
                      isDebugging ? "bg-violet-600/50 cursor-not-allowed" : "bg-violet-600 hover:bg-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                    }`}
                  >
                    {isDebugging ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                        <Zap className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <Bug className="w-4 h-4" />
                    )}
                    {isDebugging ? "Scanning..." : "Debug Query"}
                  </button>
                </div>
              </div>

              {/* Editor Component */}
              <div className="relative group">
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#0a0a0a] border-r border-white/5 py-4 flex flex-col items-center text-xs text-zinc-600 font-mono select-none">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-6 leading-6">{i + 1}</div>
                  ))}
                </div>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  spellCheck={false}
                  className={`w-full bg-transparent pl-16 pr-4 py-4 text-sm font-mono text-zinc-300 leading-6 resize-none outline-none min-h-[200px] transition-shadow duration-500 ${
                    debugState === "error" ? "ring-1 ring-inset ring-red-500/50 bg-red-500/[0.02]" :
                    debugState === "fixed" ? "ring-1 ring-inset ring-emerald-500/50 bg-emerald-500/[0.02]" :
                    "focus:ring-1 focus:ring-inset focus:ring-violet-500/30"
                  }`}
                />
                
                {/* Animated Scanner */}
                <AnimatePresence>
                  {isDebugging && (
                    <motion.div 
                      initial={{ top: "0%", opacity: 0 }}
                      animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                      className="absolute left-12 right-0 h-8 bg-gradient-to-b from-transparent via-violet-500/20 to-violet-500/40 pointer-events-none border-b border-violet-500"
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Results Grid */}
            <AnimatePresence mode="wait">
              {debugState === "error" && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {/* Error Detected */}
                  <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <h3 className="text-sm font-semibold text-red-400">Error Detected</h3>
                      <span className="ml-auto text-[10px] uppercase font-bold bg-red-500/20 text-red-400 px-2 py-0.5 rounded">High Severity</span>
                    </div>
                    <code className="text-xs text-red-300 font-mono bg-red-500/10 p-2 rounded mb-3">
                      Column 'users.id' is invalid in the select list because it is not contained in either an aggregate function or the GROUP BY clause.
                    </code>
                    <p className="text-xs text-red-300/80 mt-auto">Line 1: Missing GROUP BY clause for aggregation.</p>
                  </div>

                  {/* Why it happens */}
                  <div className="p-5 rounded-xl bg-[#111] border border-white/5 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-4 h-4 text-violet-400" />
                      <h3 className="text-sm font-semibold text-zinc-200">Why this happens</h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      When using an aggregate function like <code className="text-cyan-400 bg-white/5 px-1 rounded">COUNT()</code>, all other columns in your <code className="text-violet-400 bg-white/5 px-1 rounded">SELECT</code> statement must be included in a <code className="text-violet-400 bg-white/5 px-1 rounded">GROUP BY</code> clause. The database doesn't know how to display the individual user rows alongside the aggregated count without it.
                    </p>
                  </div>

                  {/* Corrected Query */}
                  <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex flex-col md:col-span-2 relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-3 relative z-10">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <h3 className="text-sm font-semibold text-emerald-400">Corrected Query</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-emerald-400/70 hover:text-emerald-300 hover:bg-emerald-500/10 rounded transition-colors">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={handleFix}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium rounded-md transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                        >
                          Apply Fix
                        </button>
                      </div>
                    </div>
                    <div className="bg-[#0a0a0a] p-4 rounded-lg border border-emerald-500/10 relative z-10">
                      <code className="text-sm font-mono text-zinc-300 whitespace-pre-wrap">
                        <span className="text-violet-400">SELECT</span> users.id, users.name, <span className="text-cyan-400">COUNT</span>(orders.id) as order_count{"\n"}
                        <span className="text-violet-400">FROM</span> users{"\n"}
                        <span className="text-violet-400">JOIN</span> orders <span className="text-violet-400">ON</span> users.id = orders.user_id{"\n"}
                        <span className="text-violet-400">WHERE</span> users.status = <span className="text-yellow-400">'active'</span>{"\n"}
                        <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1 rounded block mt-1">GROUP BY users.id, users.name;</span>
                      </code>
                    </div>
                    <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Optimization Suggestion */}
                  <div className="p-5 rounded-xl bg-cyan-500/5 border border-cyan-500/20 flex flex-col md:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-sm font-semibold text-cyan-400">Optimization Tip</h3>
                    </div>
                    <p className="text-sm text-cyan-100/70">
                      Always explicitly define column origins (e.g., <code className="text-cyan-300">users.id</code> instead of just <code className="text-cyan-300">id</code>) when using JOINs to prevent "Ambiguous column name" errors in the future.
                    </p>
                  </div>
                </motion.div>
              )}

              {debugState === "fixed" && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center justify-center text-center mt-8 shadow-[0_0_40px_rgba(16,185,129,0.15)]"
                >
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 relative">
                    <div className="absolute inset-0 rounded-full border border-emerald-500 animate-ping opacity-20" />
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-emerald-400 mb-2">Query Successfully Fixed!</h3>
                  <p className="text-zinc-400 max-w-md">Your query is now syntactically correct and optimized. You can safely run this in the Playground.</p>
                  <div className="mt-6 flex gap-3">
                    <button className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors">
                      Run in Playground
                    </button>
                    <button onClick={handleClear} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-zinc-300 font-medium rounded-lg transition-colors">
                      Debug Another
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Right Panel */}
        <div className="w-80 border-l border-white/5 bg-[#111]/80 backdrop-blur-md flex flex-col">
          <div className="flex border-b border-white/5 shrink-0">
            <button
              onClick={() => setRightTab("chat")}
              className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-colors ${
                rightTab === "chat" 
                  ? "border-violet-500 text-violet-400" 
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Assistant
            </button>
            <button
              onClick={() => setRightTab("fixes")}
              className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-colors ${
                rightTab === "fixes" 
                  ? "border-cyan-500 text-cyan-400" 
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Quick Fixes
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <AnimatePresence mode="wait">
              {rightTab === "chat" ? (
                <motion.div 
                  key="chat"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col h-full"
                >
                  <div className="flex-1 space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 text-violet-400" />
                      </div>
                      <div className="bg-white/5 rounded-2xl rounded-tl-none p-3 text-sm text-zinc-300 border border-white/5">
                        Hello! I'm your AI debugging assistant. Paste a query with an error, and I'll help you break it down and fix it.
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 relative">
                    <input 
                      type="text" 
                      placeholder="Ask about an error..." 
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-4 pr-10 py-3 text-sm text-zinc-300 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-zinc-500 hover:text-violet-400 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="fixes"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {[
                    { title: "Syntax Error", desc: "Check for missing commas, mismatched quotes, or missing keywords like FROM or WHERE." },
                    { title: "Invalid Column", desc: "Ensure the column exists in the table and isn't misspelled." },
                    { title: "Ambiguous Name", desc: "Prefix column names with table aliases (e.g., users.id) when joining multiple tables." },
                    { title: "Type Mismatch", desc: "You cannot compare a string to an integer without casting." }
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors cursor-pointer group">
                      <div className="text-sm font-medium text-cyan-400 mb-1 flex items-center justify-between">
                        {item.title}
                        <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-xs text-zinc-400 leading-relaxed">{item.desc}</div>
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
