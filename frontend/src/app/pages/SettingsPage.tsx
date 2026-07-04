import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Settings as SettingsIcon, Save, RotateCcw, User, Mail, 
  Camera, BookOpen, Database, BrainCircuit, Mic, Sparkles,
  Bell, Check, Palette, Crown, Flame, Trophy, Target, Award,
  Moon, Sun, Sliders
} from "lucide-react";
import { useChat } from "../context/ChatContext";

export function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const navigate = useNavigate();
  const { clearChats } = useChat();

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    clearChats();
    navigate('/login', { replace: true });
  };

  // Profile State
  const [name, setName] = useState("Alex Developer");
  const [email, setEmail] = useState("alex@example.com");
  const [title, setTitle] = useState("Data Enthusiast");

  // Learning Preferences
  const [level, setLevel] = useState("Intermediate");
  const [dialect, setDialect] = useState("PostgreSQL");
  const [dailyGoal, setDailyGoal] = useState(30);

  // AI Tutor Settings
  const [explainStyle, setExplainStyle] = useState("Detailed");
  const [hintMode, setHintMode] = useState("Guided");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [exampleFirst, setExampleFirst] = useState(true);

  // Notifications
  const [notifyDaily, setNotifyDaily] = useState(true);
  const [notifyWeekly, setNotifyWeekly] = useState(true);
  const [notifyAchievements, setNotifyAchievements] = useState(true);

  // Theme Settings
  const [themeMode, setThemeMode] = useState("Dark");
  const [accent, setAccent] = useState("violet");
  const [animationIntensity, setAnimationIntensity] = useState(80);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }, 1200);
  };

  const CustomToggle = ({ enabled, onChange }: { enabled: boolean, onChange: (val: boolean) => void }) => (
    <div 
      onClick={() => onChange(!enabled)}
      className={`w-11 h-6 rounded-full flex items-center p-1 cursor-pointer transition-all duration-300 shadow-inner ${
        enabled ? 'bg-violet-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_0_10px_rgba(139,92,246,0.3)]' : 'bg-white/10'
      }`}
    >
      <motion.div 
        layout
        className={`w-4 h-4 rounded-full shadow-sm ${enabled ? 'bg-white' : 'bg-zinc-400'}`}
        initial={false}
        animate={{ x: enabled ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  );

  const RadioPills = ({ options, selected, onChange }: { options: string[], selected: string, onChange: (val: string) => void }) => (
    <div className="flex bg-[#0a0a0a] border border-white/5 rounded-lg p-1 w-full relative z-0 overflow-hidden">
      {options.map(opt => (
        <button 
          key={opt} 
          onClick={() => onChange(opt)}
          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors relative z-10 ${
            selected === opt ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {selected === opt && (
            <motion.div
              layoutId={`pill-${options.join('-')}`}
              className="absolute inset-0 bg-white/10 rounded-md border border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.2)] -z-10"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          {opt}
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row h-full bg-[#0a0a0a] text-zinc-300 overflow-hidden">
      
      {/* Main Settings Area */}
      <div className="flex-1 overflow-y-auto min-w-0 flex flex-col scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto w-full">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-xl z-50 py-4 -my-4 mb-4 border-b border-white/5">
            <div>
              <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
                <SettingsIcon className="w-6 h-6 text-violet-400" />
                Settings
              </h1>
              <p className="text-zinc-400 mt-1 text-sm">Manage your preferences and AI learning experience.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-white/5 border border-white/10 text-zinc-300 font-medium rounded-lg transition-colors text-sm">
                <RotateCcw className="w-4 h-4" />
                Reset Defaults
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className={`flex items-center justify-center gap-2 w-36 py-2 font-medium rounded-lg transition-all duration-300 text-sm overflow-hidden relative ${
                  saveSuccess 
                    ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
                    : isSaving
                      ? "bg-violet-600/50 text-white/70 cursor-not-allowed"
                      : "bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]"
                }`}
              >
                <AnimatePresence mode="wait">
                  {saveSuccess ? (
                    <motion.div key="success" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-2">
                      <Check className="w-4 h-4" /> Saved
                    </motion.div>
                  ) : isSaving ? (
                    <motion.div key="saving" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                        <RotateCcw className="w-4 h-4" />
                      </motion.div>
                      Saving...
                    </motion.div>
                  ) : (
                    <motion.div key="default" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="flex items-center gap-2">
                      <Save className="w-4 h-4" /> Save Changes
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            
            {/* Profile Settings */}
            <div className="p-6 rounded-xl bg-[#111]/80 border border-white/5 relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <User className="w-4 h-4 text-blue-400" />
                </div>
                <h2 className="text-base font-semibold text-zinc-100">Profile Settings</h2>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 p-0.5 cursor-pointer group/avatar">
                    <div className="w-full h-full bg-[#111] rounded-full overflow-hidden flex items-center justify-center relative">
                      <span className="text-3xl font-bold text-white tracking-widest">AD</span>
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity backdrop-blur-sm">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Change Avatar</span>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400 ml-1">Display Name</label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400 ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-medium text-zinc-400 ml-1">Learning Title / Badge</label>
                    <select 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all appearance-none cursor-pointer"
                    >
                      <option>Beginner Query Writer</option>
                      <option>Data Enthusiast</option>
                      <option>Junior Analyst</option>
                      <option>SQL Architect</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Preferences */}
            <div className="p-6 rounded-xl bg-[#111]/80 border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                </div>
                <h2 className="text-base font-semibold text-zinc-100">Learning Preferences</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400 ml-1">Current Skill Level</label>
                    <RadioPills options={["Beginner", "Intermediate", "Advanced"]} selected={level} onChange={setLevel} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400 ml-1">Preferred SQL Dialect</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["PostgreSQL", "MySQL", "SQLite", "SQL Server"].map(d => (
                        <button
                          key={d}
                          onClick={() => setDialect(d)}
                          className={`flex items-center gap-2 p-3 rounded-lg border transition-all text-left ${
                            dialect === d 
                              ? 'bg-violet-500/10 border-violet-500/30 text-violet-300' 
                              : 'bg-[#0a0a0a] border-white/5 text-zinc-400 hover:border-white/10 hover:text-zinc-200'
                          }`}
                        >
                          <Database className={`w-4 h-4 ${dialect === d ? 'text-violet-400' : 'text-zinc-500'}`} />
                          <span className="text-sm font-medium">{d}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between ml-1">
                      <label className="text-xs font-medium text-zinc-400">Daily Learning Goal</label>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">{dailyGoal} mins</span>
                    </div>
                    <div className="pt-2 pb-6 px-1">
                      <input 
                        type="range" 
                        min="10" max="120" step="10" 
                        value={dailyGoal}
                        onChange={(e) => setDailyGoal(parseInt(e.target.value))}
                        className="w-full accent-emerald-500 bg-white/10 h-1.5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                      />
                      <div className="flex justify-between text-[10px] text-zinc-500 mt-2 font-medium">
                        <span>10m</span>
                        <span>60m</span>
                        <span>120m</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Tutor Settings */}
            <div className="p-6 rounded-xl bg-gradient-to-b from-violet-500/[0.02] to-transparent border border-violet-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                  <BrainCircuit className="w-4 h-4 text-violet-400" />
                </div>
                <h2 className="text-base font-semibold text-violet-100 flex items-center gap-2">
                  AI Tutor Behavior
                  <span className="text-[9px] uppercase tracking-widest font-bold bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded border border-violet-500/30">Premium</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400 ml-1">Explanation Style</label>
                    <RadioPills options={["Simple", "Detailed", "Expert"]} selected={explainStyle} onChange={setExplainStyle} />
                    <p className="text-[10px] text-zinc-500 ml-1">Controls the verbosity and technical depth of AI responses.</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400 ml-1">Hint Strategy</label>
                    <RadioPills options={["Subtle", "Guided", "Full Hint"]} selected={hintMode} onChange={setHintMode} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#0a0a0a] border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <Mic className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-200">Voice Explanations</p>
                        <p className="text-xs text-zinc-500">Read AI answers aloud</p>
                      </div>
                    </div>
                    <CustomToggle enabled={voiceEnabled} onChange={setVoiceEnabled} />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#0a0a0a] border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-200">Example-First Teaching</p>
                        <p className="text-xs text-zinc-500">Show code before theory</p>
                      </div>
                    </div>
                    <CustomToggle enabled={exampleFirst} onChange={setExampleFirst} />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Notifications */}
              <div className="p-6 rounded-xl bg-[#111]/80 border border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <Bell className="w-4 h-4 text-orange-400" />
                  </div>
                  <h2 className="text-base font-semibold text-zinc-100">Notifications</h2>
                </div>
                
                <div className="space-y-4">
                  {[
                    { title: "Daily Reminders", desc: "Keep your learning streak alive", state: notifyDaily, setter: setNotifyDaily },
                    { title: "Weekly Progress Report", desc: "Analytics sent to your email", state: notifyWeekly, setter: setNotifyWeekly },
                    { title: "Achievements", desc: "When you level up or earn a badge", state: notifyAchievements, setter: setNotifyAchievements },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-zinc-300">{item.title}</p>
                        <p className="text-xs text-zinc-500">{item.desc}</p>
                      </div>
                      <CustomToggle enabled={item.state} onChange={item.setter} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Theme & Display */}
              <div className="p-6 rounded-xl bg-[#111]/80 border border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/20">
                    <Palette className="w-4 h-4 text-pink-400" />
                  </div>
                  <h2 className="text-base font-semibold text-zinc-100">Appearance</h2>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400 ml-1">Color Theme</label>
                    <div className="flex gap-2">
                      <button onClick={() => setThemeMode("Dark")} className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg border transition-all ${themeMode === "Dark" ? "bg-white/10 border-white/20 text-white" : "bg-[#0a0a0a] border-white/5 text-zinc-500 hover:text-zinc-300"}`}>
                        <Moon className="w-4 h-4" /> Dark
                      </button>
                      <button onClick={() => setThemeMode("Light")} className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg border transition-all ${themeMode === "Light" ? "bg-white/10 border-white/20 text-white" : "bg-[#0a0a0a] border-white/5 text-zinc-500 hover:text-zinc-300"}`}>
                        <Sun className="w-4 h-4" /> Light
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400 ml-1">Accent Color</label>
                    <div className="flex items-center gap-3 px-1">
                      {[
                        { id: 'violet', color: 'bg-violet-500', shadow: 'shadow-[0_0_10px_rgba(139,92,246,0.5)]' },
                        { id: 'cyan', color: 'bg-cyan-500', shadow: 'shadow-[0_0_10px_rgba(34,211,238,0.5)]' },
                        { id: 'emerald', color: 'bg-emerald-500', shadow: 'shadow-[0_0_10px_rgba(16,185,129,0.5)]' },
                        { id: 'rose', color: 'bg-rose-500', shadow: 'shadow-[0_0_10px_rgba(244,63,94,0.5)]' },
                      ].map(c => (
                        <button 
                          key={c.id}
                          onClick={() => setAccent(c.id)}
                          className={`w-6 h-6 rounded-full transition-all ${c.color} ${accent === c.id ? `ring-2 ring-white/50 ring-offset-2 ring-offset-[#111] ${c.shadow} scale-110` : 'opacity-50 hover:opacity-100 hover:scale-110'}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between ml-1">
                      <label className="text-xs font-medium text-zinc-400 flex items-center gap-1"><Sliders className="w-3.5 h-3.5" /> Animation Intensity</label>
                      <span className="text-xs font-bold text-zinc-300">{animationIntensity}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" step="10" 
                      value={animationIntensity} onChange={(e) => setAnimationIntensity(parseInt(e.target.value))}
                      className="w-full accent-zinc-300 bg-white/10 h-1.5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Spacer for bottom scrolling */}
            <div className="h-8" />
          </div>
        </div>
      </div>

      {/* Right Sidebar Panel */}
      <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/5 bg-[#111]/30 backdrop-blur-xl flex flex-col overflow-y-auto shrink-0 z-10">
        <div className="p-6 space-y-6">
          
          {/* Membership Card */}
          <div className="relative p-5 rounded-2xl border border-yellow-500/30 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-orange-500/5 to-transparent z-0" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:bg-yellow-500/30 transition-colors z-0" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1 text-yellow-500">
                <Crown className="w-5 h-5 fill-yellow-500" />
                <span className="text-sm font-bold uppercase tracking-widest">Pro Plan</span>
              </div>
              <p className="text-xs text-zinc-400 mb-4">Active until Dec 2026</p>
              
              <button className="w-full py-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded-lg border border-yellow-500/20 transition-colors">
                Manage Subscription
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Account Overview</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col text-center">
                <span className="text-xs text-zinc-500 mb-1">Member Since</span>
                <span className="text-sm font-bold text-zinc-200">Oct 2023</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col text-center">
                <span className="text-xs text-zinc-500 mb-1">Time Learned</span>
                <span className="text-sm font-bold text-zinc-200">42h 15m</span>
              </div>
            </div>
          </div>

          {/* Current Progress */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-semibold text-zinc-200">Current Streak</span>
              </div>
              <span className="text-sm font-bold text-orange-400">12 Days</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Level 8</span>
                <span className="text-violet-400 font-medium">850 / 1200 XP</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 rounded-full w-[70%]" />
              </div>
            </div>
          </div>

          {/* Achievements Snapshot */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Top Badges</h3>
              <button className="text-[10px] text-violet-400 hover:text-violet-300 font-medium">View All</button>
            </div>
            <div className="flex gap-2">
              {[
                { icon: Database, color: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500/30" },
                { icon: Trophy, color: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500/30" },
                { icon: Target, color: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500/30" },
              ].map((badge, i) => (
                <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center border ${badge.bg} ${badge.border} cursor-pointer hover:scale-110 transition-transform`}>
                  <badge.icon className={`w-5 h-5 ${badge.color}`} />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full flex items-center justify-center border border-dashed border-white/20 text-xs text-zinc-500 cursor-pointer hover:border-white/40 hover:text-zinc-400 transition-colors">
                +9
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="pt-4 border-t border-white/5">
            <button onClick={handleSignOut} className="w-full py-2.5 flex items-center justify-center gap-2 text-sm font-medium text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors border border-transparent hover:border-red-500/20">
              Sign Out
            </button>
          </div>

        </div>
      </div>
      
    </div>
  );
}
