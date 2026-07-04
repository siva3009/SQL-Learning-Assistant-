import { useState } from "react";
import { motion } from "motion/react";
import { 
  LineChart, Download, Calendar, Target, Flame, Database,
  Zap, Award, TrendingUp, BrainCircuit, ArrowUpRight,
  CheckCircle2, AlertTriangle, Shield, Star, Clock,
  ChevronRight, Activity
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, PolarRadiusAxis
} from "recharts";

const TREND_DATA = [
  { name: 'Mon', xp: 450, queries: 12 },
  { name: 'Tue', xp: 600, queries: 18 },
  { name: 'Wed', xp: 300, queries: 8 },
  { name: 'Thu', xp: 850, queries: 25 },
  { name: 'Fri', xp: 700, queries: 22 },
  { name: 'Sat', xp: 1100, queries: 35 },
  { name: 'Sun', xp: 950, queries: 30 },
];

const SKILL_DATA = [
  { subject: 'SELECT', score: 95 },
  { subject: 'JOINS', score: 70 },
  { subject: 'GROUP BY', score: 85 },
  { subject: 'Subqueries', score: 50 },
  { subject: 'Window Fns', score: 40 },
  { subject: 'Aggregates', score: 80 },
];

const TOPIC_PROGRESS = [
  { name: "Basic Queries", progress: 100 },
  { name: "Filtering Data", progress: 95 },
  { name: "Data Aggregation", progress: 80 },
  { name: "Table Joins", progress: 65 },
  { name: "Subqueries", progress: 40 },
  { name: "Window Functions", progress: 15 },
];

const HEATMAP_WEEKS = 20;
const HEATMAP_DATA = Array.from({ length: HEATMAP_WEEKS * 7 }).map(() => Math.floor(Math.random() * 4));

const BADGES = [
  { id: 1, name: "First JOIN", icon: Database, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", earned: true },
  { id: 2, name: "7 Day Streak", icon: Flame, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", earned: true },
  { id: 3, name: "Query Master", icon: Shield, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20", earned: true },
  { id: 4, name: "Speed Demon", icon: Zap, color: "text-zinc-500", bg: "bg-white/5", border: "border-white/5", earned: false },
  { id: 5, name: "Subquery Pro", icon: Target, color: "text-zinc-500", bg: "bg-white/5", border: "border-white/5", earned: false },
  { id: 6, name: "Flawless", icon: Star, color: "text-zinc-500", bg: "bg-white/5", border: "border-white/5", earned: false },
];

export function ProgressPage() {
  const [timeFilter, setTimeFilter] = useState("This Week");

  return (
    <div className="flex flex-col lg:flex-row h-full bg-[#0a0a0a] text-zinc-300 overflow-hidden">
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto min-w-0 flex flex-col">
        <div className="p-6 md:p-8 space-y-6 max-w-6xl mx-auto w-full">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
                <LineChart className="w-6 h-6 text-violet-400" />
                Learning Progress
              </h1>
              <p className="text-zinc-400 mt-1 text-sm">Track your SQL mastery and performance analytics.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-[#111] border border-white/10 rounded-lg text-sm">
                <Calendar className="w-4 h-4 text-zinc-400" />
                <select 
                  className="bg-transparent border-none text-zinc-300 focus:outline-none cursor-pointer"
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                >
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>All Time</option>
                </select>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 font-medium rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "Topics", value: "12/20", icon: Database, color: "text-blue-400", bg: "bg-blue-500/10" },
              { label: "Accuracy", value: "84%", icon: Target, color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { label: "Queries", value: "342", icon: Zap, color: "text-cyan-400", bg: "bg-cyan-500/10" },
              { label: "Streak", value: "12", icon: Flame, color: "text-orange-400", bg: "bg-orange-500/10" },
              { label: "Level", value: "8", icon: Award, color: "text-yellow-400", bg: "bg-yellow-500/10" },
              { label: "Total XP", value: "10.8k", icon: Star, color: "text-violet-400", bg: "bg-violet-500/10" },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#111]/80 border border-white/5 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors">
                <div className={`w-8 h-8 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-4 h-4" />
                </div>
                <span className="text-xl font-bold text-zinc-100">{stat.value}</span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Area Chart */}
            <div className="lg:col-span-2 p-5 rounded-xl bg-[#111]/80 border border-white/5 flex flex-col min-h-[300px]">
              <h3 className="text-sm font-semibold text-zinc-200 mb-6 flex items-center gap-2">
                <Activity className="w-4 h-4 text-violet-400" /> Learning Trend
              </h3>
              <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs key="defs">
                      <linearGradient id="colorXpProgress" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid key="grid" strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis key="xaxis" dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis key="yaxis" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      key="tooltip"
                      contentStyle={{ backgroundColor: '#111', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      itemStyle={{ color: '#e4e4e7' }}
                    />
                    <Area key="area" type="monotone" dataKey="xp" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorXpProgress)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="p-5 rounded-xl bg-[#111]/80 border border-white/5 flex flex-col min-h-[300px]">
              <h3 className="text-sm font-semibold text-zinc-200 mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" /> Skill Radar
              </h3>
              <div className="flex-1 w-full relative -mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={SKILL_DATA} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <PolarGrid key="grid" stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis key="angle" dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                    <PolarRadiusAxis key="radius" angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar key="radar" name="Skill Level" dataKey="score" stroke="#22d3ee" strokeWidth={2} fill="#22d3ee" fillOpacity={0.2} />
                    <Tooltip 
                      key="tooltip"
                      contentStyle={{ backgroundColor: '#111', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      itemStyle={{ color: '#22d3ee' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Heatmap & Topic Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Weekly Heatmap */}
            <div className="lg:col-span-2 p-5 rounded-xl bg-[#111]/80 border border-white/5 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-400" /> Activity Map
                </h3>
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-medium">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-white/5"></div>
                    <div className="w-3 h-3 rounded-sm bg-emerald-500/20"></div>
                    <div className="w-3 h-3 rounded-sm bg-emerald-500/50"></div>
                    <div className="w-3 h-3 rounded-sm bg-emerald-500"></div>
                  </div>
                  <span>More</span>
                </div>
              </div>
              <div className="flex-1 overflow-x-auto scrollbar-hide flex items-center">
                <div 
                  className="grid gap-1.5" 
                  style={{ 
                    gridTemplateRows: 'repeat(7, minmax(0, 1fr))',
                    gridAutoFlow: 'column',
                    gridAutoColumns: 'max-content'
                  }}
                >
                  {HEATMAP_DATA.map((level, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.2 }}
                      className={`w-3 h-3 md:w-4 md:h-4 rounded-sm cursor-pointer transition-colors ${
                        level === 0 ? 'bg-white/5 hover:bg-white/10' :
                        level === 1 ? 'bg-emerald-500/20 hover:bg-emerald-500/40' :
                        level === 2 ? 'bg-emerald-500/50 hover:bg-emerald-500/70' :
                        'bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Topic Progress */}
            <div className="p-5 rounded-xl bg-[#111]/80 border border-white/5 flex flex-col">
              <h3 className="text-sm font-semibold text-zinc-200 mb-5 flex items-center gap-2">
                <Database className="w-4 h-4 text-orange-400" /> Module Completion
              </h3>
              <div className="space-y-4 flex-1">
                {TOPIC_PROGRESS.map((topic, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-zinc-300">{topic.name}</span>
                      <span className="text-zinc-400 font-medium">{topic.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${topic.progress}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`h-full rounded-full ${
                          topic.progress === 100 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' :
                          topic.progress >= 70 ? 'bg-violet-500' :
                          topic.progress >= 40 ? 'bg-cyan-500' :
                          'bg-orange-500'
                        }`} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-white/5">
            
            {/* Timeline */}
            <div className="p-5 rounded-xl bg-[#111]/50 border border-white/5">
              <h3 className="text-sm font-semibold text-zinc-200 mb-5 flex items-center gap-2">
                <Clock className="w-4 h-4 text-violet-400" /> Recent Milestones
              </h3>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-violet-500/50 before:to-transparent">
                {[
                  { title: "Completed 'Data Aggregation' module", date: "Today", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/20" },
                  { title: "Earned '7 Day Streak' badge", date: "Yesterday", icon: Flame, color: "text-orange-400", bg: "bg-orange-500/20" },
                  { title: "Passed 'Basic Joins' Quiz (95%)", date: "3 days ago", icon: Target, color: "text-violet-400", bg: "bg-violet-500/20" },
                ].map((item, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-[#0a0a0a] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -translate-x-1/2 md:translate-x-0 bg-[#111] z-10">
                      <item.icon className={`w-3 h-3 ${item.color}`} />
                    </div>
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-auto md:ml-0 p-3 rounded-lg bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors">
                      <p className="text-sm font-medium text-zinc-200">{item.title}</p>
                      <p className="text-xs text-zinc-500 mt-1">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvement Suggestions */}
            <div className="p-5 rounded-xl bg-[#111]/50 border border-white/5 flex flex-col">
              <h3 className="text-sm font-semibold text-zinc-200 mb-5 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" /> Focus Suggestions
              </h3>
              <div className="space-y-3 flex-1">
                {[
                  { text: "Your accuracy on Subqueries dropped below 60%. Try practicing isolated nested queries.", type: "warning" },
                  { text: "You typically solve Easy queries in 2 mins. Try Medium difficulty for a better challenge.", type: "tip" },
                  { text: "Review Window Functions theory before attempting the next Practice set.", type: "action" }
                ].map((sug, i) => (
                  <div key={i} className="p-3 rounded-lg border border-white/5 bg-white/[0.02] flex items-start gap-3 hover:bg-white/5 transition-colors">
                    {sug.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" /> :
                     sug.type === 'tip' ? <BrainCircuit className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" /> :
                     <ArrowUpRight className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />}
                    <p className="text-sm text-zinc-400 leading-relaxed">{sug.text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Right Sidebar Panel */}
      <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/5 bg-[#111]/30 backdrop-blur-xl flex flex-col overflow-y-auto shrink-0">
        <div className="p-6 space-y-6">
          
          {/* AI Insights */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-colors" />
              <div className="flex items-center gap-2 mb-2 text-emerald-400">
                <TrendingUp className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Strongest Area</h4>
              </div>
              <p className="text-lg font-bold text-zinc-100">Basic Queries</p>
              <p className="text-xs text-zinc-400 mt-1">Top 5% among all users</p>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full blur-xl group-hover:bg-red-500/20 transition-colors" />
              <div className="flex items-center gap-2 mb-2 text-red-400">
                <AlertTriangle className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Needs Work</h4>
              </div>
              <p className="text-lg font-bold text-zinc-100">Window Functions</p>
              <p className="text-xs text-zinc-400 mt-1">40% lower accuracy than average</p>
            </div>
          </div>

          {/* Next Milestone */}
          <div className="p-5 rounded-xl bg-[#111] border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-violet-400" />
              <h3 className="text-sm font-semibold text-zinc-200">Next Milestone</h3>
            </div>
            <div className="flex justify-between items-end mb-2">
              <div>
                <p className="text-base font-bold text-zinc-100">Level 9</p>
                <p className="text-xs text-zinc-500">Query Specialist</p>
              </div>
              <span className="text-xs font-medium text-violet-400">1.2k XP needed</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mt-3">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-violet-600 to-violet-400 rounded-full"
              />
            </div>
          </div>

          {/* Badges */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-400" /> Achievements
              </h3>
              <span className="text-xs text-zinc-500 font-medium">3/12</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {BADGES.map((badge) => (
                <div key={badge.id} className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                  badge.earned 
                    ? `bg-[#111] ${badge.border} hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] cursor-pointer` 
                    : `${badge.bg} ${badge.border} opacity-50 grayscale`
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${badge.earned ? badge.bg : 'bg-black/50'}`}>
                    <badge.icon className={`w-5 h-5 ${badge.color}`} />
                  </div>
                  <span className="text-xs font-semibold text-zinc-300">{badge.name}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 flex items-center justify-center gap-1 text-xs font-medium text-zinc-400 hover:text-zinc-200 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
              View All Badges <ChevronRight className="w-3 h-3" />
            </button>
          </div>

        </div>
      </div>
      
    </div>
  );
}
