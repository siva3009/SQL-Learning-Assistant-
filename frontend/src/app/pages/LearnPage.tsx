import { useState } from "react";
import { motion } from "motion/react";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis 
} from "recharts";
import { 
  CheckCircle2, 
  Circle, 
  Lock, 
  Play, 
  Trophy, 
  Flame, 
  Star,
  Clock,
  Code2,
  BookOpen
} from "lucide-react";

// Mock Data
const MODULES = [
  { id: "m1", title: "SQL Foundations", progress: 100, isLocked: false },
  { id: "m2", title: "Filtering & Sorting", progress: 75, isLocked: false },
  { id: "m3", title: "Joins & Relations", progress: 10, isLocked: false },
  { id: "m4", title: "Aggregations", progress: 0, isLocked: true },
  { id: "m5", title: "Window Functions", progress: 0, isLocked: true },
  { id: "m6", title: "CTEs & Subqueries", progress: 0, isLocked: true },
  { id: "m7", title: "Schema Design", progress: 0, isLocked: true },
];

const TOPICS_DATA = {
  "m3": [
    { id: "t1", title: "INNER JOIN Basics", description: "Learn to combine rows from two or more tables based on a related column.", status: "completed", duration: "10 min", xp: 50 },
    { id: "t2", title: "LEFT & RIGHT JOINs", description: "Keep all records from one side of the join even if there are no matches.", status: "in-progress", duration: "15 min", xp: 75 },
    { id: "t3", title: "FULL OUTER JOIN", description: "Return all records when there is a match in either left or right table.", status: "locked", duration: "12 min", xp: 60 },
    { id: "t4", title: "Self Joins", description: "Join a table to itself to compare rows within the same table.", status: "locked", duration: "20 min", xp: 100 },
    { id: "t5", title: "Cross Joins", description: "Generate a Cartesian product of rows from tables in the join.", status: "locked", duration: "10 min", xp: 40 },
    { id: "t6", title: "Join Challenge", description: "Put your knowledge to the test in this comprehensive interactive challenge.", status: "locked", duration: "30 min", xp: 200 },
  ]
};

const SKILL_DATA = [
  { subject: 'Basic Queries', A: 100, fullMark: 100 },
  { subject: 'Filtering', A: 85, fullMark: 100 },
  { subject: 'Joins', A: 40, fullMark: 100 },
  { subject: 'Aggregation', A: 20, fullMark: 100 },
  { subject: 'Window Funcs', A: 5, fullMark: 100 },
  { subject: 'Optimization', A: 10, fullMark: 100 },
];

export function LearnPage() {
  const [activeModule, setActiveModule] = useState("m3");

  const topics = TOPICS_DATA[activeModule as keyof typeof TOPICS_DATA] || TOPICS_DATA["m3"];

  return (
    <div className="flex h-full w-full">
      {/* Column 1: Learning Paths (25%) */}
      <div className="w-1/4 min-w-[280px] border-r border-white/5 bg-[#0a0a0a]/50 p-6 flex flex-col gap-6 overflow-y-auto">
        <div>
          <h2 className="text-lg font-medium text-zinc-100 mb-1">Learning Paths</h2>
          <p className="text-sm text-zinc-500">Master SQL step-by-step</p>
        </div>

        <div className="flex flex-col gap-2">
          {MODULES.map((mod) => (
            <button
              key={mod.id}
              onClick={() => !mod.isLocked && setActiveModule(mod.id)}
              className={`
                flex flex-col gap-2 p-3 rounded-xl border text-left transition-all duration-200
                ${activeModule === mod.id 
                  ? "bg-white/10 border-white/20 shadow-[0_0_20px_-5px_rgba(139,92,246,0.15)]" 
                  : "bg-white/5 border-transparent hover:bg-white/10"
                }
                ${mod.isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              <div className="flex items-center justify-between">
                <span className={`font-medium text-sm ${mod.isLocked ? 'text-zinc-500' : 'text-zinc-200'}`}>
                  {mod.title}
                </span>
                {mod.progress === 100 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : mod.isLocked ? (
                  <Lock className="w-4 h-4 text-zinc-600" />
                ) : (
                  <span className="text-xs font-medium text-cyan-400">{mod.progress}%</span>
                )}
              </div>
              
              {!mod.isLocked && (
                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${mod.progress}%` }}
                    className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full"
                  />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Column 2: Topic Grid (50%) */}
      <div className="flex-1 p-8 bg-[#0a0a0a] flex flex-col gap-8 overflow-y-auto">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-100 mb-2">
              {MODULES.find(m => m.id === activeModule)?.title || "Topics"}
            </h1>
            <p className="text-zinc-400 max-w-xl">
              Understand how to query across multiple tables to bring together related data into meaningful insights.
            </p>
          </div>
          <button className="px-4 py-2 bg-white/10 hover:bg-white/15 text-zinc-200 text-sm font-medium rounded-lg border border-white/5 transition-colors flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            Resume Path
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topics.map((topic, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={topic.id}
              className={`
                relative p-5 rounded-2xl border flex flex-col gap-4 overflow-hidden group
                ${topic.status === 'completed' ? 'bg-white/5 border-emerald-500/20' : 
                  topic.status === 'in-progress' ? 'bg-gradient-to-br from-violet-500/10 to-cyan-500/5 border-violet-500/30' : 
                  'bg-[#111] border-white/5 opacity-80'}
              `}
            >
              {topic.status === 'in-progress' && (
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-violet-500 to-cyan-400 shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
              )}
              
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center border
                    ${topic.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 
                      topic.status === 'in-progress' ? 'bg-violet-500/20 border-violet-500/30 text-violet-400' : 
                      'bg-white/5 border-white/10 text-zinc-600'}
                  `}>
                    {topic.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : 
                     topic.status === 'locked' ? <Lock className="w-4 h-4" /> : 
                     <Play className="w-3 h-3 translate-x-0.5" />}
                  </div>
                  <h3 className={`font-medium text-sm ${topic.status === 'locked' ? 'text-zinc-500' : 'text-zinc-200'}`}>
                    {topic.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed flex-1">
                {topic.description}
              </p>

              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <Clock className="w-3.5 h-3.5" />
                  {topic.duration}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <Star className="w-3.5 h-3.5 text-yellow-500/70" />
                  {topic.xp} XP
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Column 3: Skill Map & Stats (25%) */}
      <div className="w-1/4 min-w-[280px] border-l border-white/5 bg-[#111] p-6 flex flex-col gap-8 overflow-y-auto">
        {/* Streak & Level */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#0a0a0a] border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center gap-1">
            <Flame className="w-6 h-6 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]" />
            <div className="text-xl font-semibold text-zinc-100">12</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">Day Streak</div>
          </div>
          <div className="bg-[#0a0a0a] border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center gap-1">
            <Trophy className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
            <div className="text-xl font-semibold text-zinc-100">Lvl 4</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">Data Analyst</div>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-medium text-zinc-200">Skill Map</h3>
            <p className="text-xs text-zinc-500 mt-1">Your SQL proficiency profile</p>
          </div>
          
          <div className="aspect-square w-full relative bg-[#0a0a0a] border border-white/5 rounded-2xl flex items-center justify-center overflow-hidden">
            {/* Soft glow behind chart */}
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-cyan-500/10 blur-xl rounded-full scale-75" />
            
            <ResponsiveContainer width="100%" height="100%">
              {/* Note: The user explicitly mentioned they resolved a Recharts key duplication error 
                  by assigning static IDs to our charts. We do this via the id prop on RadarChart. */}
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={SKILL_DATA} id="skill-map-radar">
                <PolarGrid stroke="rgba(255,255,255,0.05)" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={false} 
                  axisLine={false}
                />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#colorUv)"
                  fillOpacity={0.5}
                />
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Next Goals */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-zinc-200">Up Next</h3>
          <div className="flex flex-col gap-3">
            {[
              { title: "Complete LEFT JOINs", xp: "+75 XP", icon: Code2 },
              { title: "Review 3 past concepts", xp: "+30 XP", icon: BookOpen },
            ].map((goal, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#0a0a0a] border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <goal.icon className="w-4 h-4 text-zinc-400" />
                  </div>
                  <span className="text-xs font-medium text-zinc-300">{goal.title}</span>
                </div>
                <span className="text-xs text-cyan-400 font-medium">{goal.xp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
