import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Trophy, Flame, Target, Star, Play, Clock, Zap, 
  Award, BrainCircuit, Activity, BarChart, ChevronRight,
  Dumbbell, Filter, Sparkles, CheckCircle2, XCircle
} from "lucide-react";

const TOPICS = ["All", "SELECT", "WHERE", "JOINS", "GROUP BY", "Subqueries"];
const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];

const CHALLENGES = [
  { id: 1, title: "Retrieve Active Users", desc: "Write a query to fetch all users with an 'active' status.", difficulty: "Easy", topic: "WHERE", xp: 50, time: "5m" },
  { id: 2, title: "Top Selling Products", desc: "Find the top 5 products by total sales volume.", difficulty: "Medium", topic: "GROUP BY", xp: 150, time: "15m" },
  { id: 3, title: "Customer Order History", desc: "Join users and orders tables to list complete purchase histories.", difficulty: "Medium", topic: "JOINS", xp: 200, time: "20m" },
  { id: 4, title: "Employees Above Avg Salary", desc: "Find all employees earning more than their department's average.", difficulty: "Hard", topic: "Subqueries", xp: 350, time: "25m" },
  { id: 5, title: "Basic Data Selection", desc: "Select specific columns from the inventory table.", difficulty: "Easy", topic: "SELECT", xp: 50, time: "5m" },
  { id: 6, title: "Complex Multi-Join", desc: "Join 4 related tables to generate a comprehensive financial report.", difficulty: "Hard", topic: "JOINS", xp: 400, time: "30m" },
];

const LEADERBOARD = [
  { rank: 1, name: "Alex K.", xp: 12450, isUser: false },
  { rank: 2, name: "Sarah J.", xp: 11200, isUser: false },
  { rank: 3, name: "You", xp: 10850, isUser: true },
  { rank: 4, name: "Mike T.", xp: 9500, isUser: false },
  { rank: 5, name: "Emma W.", xp: 8200, isUser: false },
];

export function PracticePage() {
  const [activeTopic, setActiveTopic] = useState("All");
  const [activeDiff, setActiveDiff] = useState("All");

  const filteredChallenges = CHALLENGES.filter(c => 
    (activeTopic === "All" || c.topic === activeTopic) &&
    (activeDiff === "All" || c.difficulty === activeDiff)
  );

  return (
    <div className="flex flex-col lg:flex-row h-full bg-[#0a0a0a] text-zinc-300 overflow-hidden">
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto min-w-0 flex flex-col">
        
        {/* Top Header & Filters */}
        <div className="p-6 md:p-8 space-y-6 max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
                <Dumbbell className="w-6 h-6 text-violet-400" />
                Practice Challenges
              </h1>
              <p className="text-zinc-400 mt-1 text-sm">Sharpen your SQL skills with real-world scenarios.</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-lg transition-all shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]">
              <Sparkles className="w-4 h-4" />
              Random Challenge
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between p-4 rounded-xl bg-[#111] border border-white/5">
            {/* Topic Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              <span className="text-xs font-semibold text-zinc-500 uppercase mr-2 shrink-0">Topic</span>
              {TOPICS.map(topic => (
                <button
                  key={topic}
                  onClick={() => setActiveTopic(topic)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                    activeTopic === topic 
                      ? "bg-violet-500/20 text-violet-300 border border-violet-500/30" 
                      : "bg-white/5 text-zinc-400 border border-transparent hover:bg-white/10 hover:text-zinc-200"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            <div className="w-px h-6 bg-white/10 hidden lg:block" />

            {/* Difficulty Filters */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <span className="text-xs font-semibold text-zinc-500 uppercase mr-2 shrink-0">Difficulty</span>
              {DIFFICULTIES.map(diff => (
                <button
                  key={diff}
                  onClick={() => setActiveDiff(diff)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                    activeDiff === diff 
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" 
                      : "bg-white/5 text-zinc-400 border border-transparent hover:bg-white/10 hover:text-zinc-200"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Center: Challenge Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredChallenges.map(challenge => (
                <motion.div
                  key={challenge.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -4 }}
                  className="group flex flex-col p-5 rounded-2xl bg-[#111]/80 backdrop-blur-sm border border-white/5 hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500/0 to-transparent group-hover:via-violet-500/50 transition-all duration-500" />
                  
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md border ${
                      challenge.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      challenge.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {challenge.difficulty}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-violet-300 bg-violet-500/10 px-2 py-1 rounded-md border border-violet-500/20">
                      <Zap className="w-3.5 h-3.5" /> {challenge.xp} XP
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-zinc-100 mb-2 group-hover:text-violet-300 transition-colors">{challenge.title}</h3>
                  <p className="text-sm text-zinc-400 line-clamp-2 mb-4 flex-1">{challenge.desc}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {challenge.time}</span>
                      <span className="flex items-center gap-1 bg-white/5 px-1.5 py-0.5 rounded">{challenge.topic}</span>
                    </div>
                    <button className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 group-hover:bg-violet-600 text-zinc-400 group-hover:text-white transition-colors">
                      <Play className="w-4 h-4 ml-0.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredChallenges.length === 0 && (
              <div className="col-span-full py-12 flex flex-col items-center justify-center text-zinc-500">
                <Filter className="w-8 h-8 mb-3 opacity-50" />
                <p>No challenges match your exact filters.</p>
                <button onClick={() => {setActiveTopic("All"); setActiveDiff("All");}} className="mt-3 text-violet-400 hover:text-violet-300 text-sm underline">Clear Filters</button>
              </div>
            )}
          </div>

          {/* Bottom Sections */}
          <div className="pt-8 border-t border-white/5 grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Recent & Completed */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-[#111]/50 rounded-xl border border-white/5 p-5">
                <h3 className="text-sm font-semibold text-zinc-200 mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" /> Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-zinc-300">Employees Above Avg Salary</p>
                      <p className="text-xs text-zinc-500">Failed • 10m ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-zinc-300">Retrieve Active Users</p>
                      <p className="text-xs text-zinc-500">Completed • 2h ago • +50 XP</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weak Topics */}
            <div className="lg:col-span-1">
              <div className="bg-[#111]/50 rounded-xl border border-white/5 p-5 h-full">
                <h3 className="text-sm font-semibold text-zinc-200 mb-4 flex items-center gap-2">
                  <BarChart className="w-4 h-4 text-yellow-400" /> Focus Areas
                </h3>
                <p className="text-xs text-zinc-400 mb-4">Topics with &lt; 60% accuracy</p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-300">Subqueries</span>
                      <span className="text-red-400 font-medium">42%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: '42%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-300">Advanced JOINS</span>
                      <span className="text-yellow-400 font-medium">58%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: '58%' }} />
                    </div>
                  </div>
                </div>
                <button className="w-full mt-5 py-2 text-xs font-medium text-violet-400 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 rounded-lg transition-colors">
                  Practice Weak Areas
                </button>
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-violet-500/10 to-cyan-500/10 rounded-xl border border-white/10 p-5 h-full flex flex-col relative overflow-hidden group cursor-pointer hover:border-violet-500/30 transition-colors">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-violet-500/20 rounded-full blur-2xl group-hover:bg-violet-500/30 transition-colors" />
                <h3 className="text-sm font-semibold text-violet-300 mb-2 flex items-center gap-2 relative z-10">
                  <BrainCircuit className="w-4 h-4" /> AI Recommended
                </h3>
                <h4 className="text-base font-bold text-white mb-2 relative z-10 group-hover:text-cyan-300 transition-colors">Mastering Subqueries</h4>
                <p className="text-xs text-zinc-400 mb-4 relative z-10 flex-1">Based on your recent struggles, we recommend completing this curated module on correlated subqueries.</p>
                <div className="flex items-center gap-1 text-xs font-semibold text-cyan-400 relative z-10">
                  Start Module <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Right Sidebar Panel */}
      <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/5 bg-[#111]/30 backdrop-blur-xl flex flex-col overflow-y-auto shrink-0">
        <div className="p-6 space-y-8">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-colors">
              <Flame className="w-5 h-5 text-orange-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xl font-bold text-zinc-100">12</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Day Streak</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-colors">
              <Target className="w-5 h-5 text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xl font-bold text-zinc-100">84%</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Accuracy</span>
            </div>
            <div className="col-span-2 p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/10 to-violet-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Zap className="w-5 h-5 text-violet-400 mb-1" />
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-violet-100">10,850</span>
                <span className="text-xs font-semibold text-violet-400">XP</span>
              </div>
              <span className="text-[10px] text-violet-300/70 uppercase tracking-wider mt-1">Total Experience</span>
            </div>
          </div>

          {/* Daily Challenge Card */}
          <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Star className="w-24 h-24 text-yellow-400" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-xs font-bold text-yellow-400 uppercase tracking-wider mb-2">
                <Star className="w-3.5 h-3.5 fill-yellow-400" /> Daily Quest
              </div>
              <h4 className="text-base font-bold text-zinc-100 mb-1">Window Functions 101</h4>
              <p className="text-xs text-zinc-400 mb-4">Complete 3 window function challenges to earn double XP today.</p>
              <div className="w-full bg-black/50 h-2 rounded-full mb-3 overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '66%' }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full" 
                />
              </div>
              <div className="flex justify-between items-center text-xs text-zinc-500 mb-4">
                <span>2/3 Completed</span>
                <span className="text-yellow-400 font-medium">+500 XP</span>
              </div>
              <button className="w-full py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-500/30 text-xs font-semibold rounded-lg transition-colors">
                Continue Quest
              </button>
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-orange-400" /> Global Rank
              </h3>
              <button className="text-[10px] text-zinc-500 hover:text-zinc-300 uppercase font-bold tracking-wider">View All</button>
            </div>
            
            <div className="space-y-2">
              {LEADERBOARD.map((user) => (
                <div 
                  key={user.rank} 
                  className={`flex items-center gap-3 p-2.5 rounded-lg border transition-colors ${
                    user.isUser 
                      ? "bg-violet-500/10 border-violet-500/20 shadow-[0_0_10px_rgba(139,92,246,0.1)]" 
                      : "bg-white/[0.02] border-transparent hover:bg-white/5"
                  }`}
                >
                  <div className={`w-6 h-6 flex items-center justify-center rounded text-xs font-bold ${
                    user.rank === 1 ? "bg-yellow-500/20 text-yellow-400" :
                    user.rank === 2 ? "bg-zinc-300/20 text-zinc-300" :
                    user.rank === 3 ? "bg-orange-500/20 text-orange-400" :
                    "bg-white/5 text-zinc-500"
                  }`}>
                    {user.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${user.isUser ? "text-violet-300" : "text-zinc-300"}`}>
                      {user.name}
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-zinc-400 flex items-center gap-1">
                    {user.xp} <Zap className="w-3 h-3 text-violet-400 opacity-70" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}
