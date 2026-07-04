import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, ArrowLeft, Terminal, Sparkles, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { authAPI } from '../utils/api';

export const Login = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname !== '/signup');

  useEffect(() => {
    setIsLogin(location.pathname !== '/signup');
  }, [location.pathname]);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isForgotPassword) {
      setError('Forgot password is not implemented yet.');
      return;
    }

    setIsLoading(true);

    try {
      const data = isLogin
        ? await authAPI.login(email, password)
        : await authAPI.register(name, email, password);

      if (!data?.token) {
        throw new Error('Authentication token not received');
      }

      localStorage.setItem('authToken', data.token);
      navigate('/chat');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['Inter',sans-serif] selection:bg-violet-500/30 flex overflow-hidden">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-10">
        {/* Top nav area */}
        <div className="p-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 lg:px-24 max-w-xl w-full mx-auto pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative"
          >
            <Link to="/" className="flex items-center gap-3 mb-8 w-fit hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <Database className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-2xl tracking-tight text-white">SQL Tutor</span>
            </Link>

            <AnimatePresence mode="wait">
              {isForgotPassword ? (
                <motion.div 
                  key="forgot-password"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                    Reset password
                  </h1>
                  <p className="text-white/50 text-sm md:text-base mb-8">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-1.5">
                      <label className="text-sm text-white/70 font-medium">Email</label>
                      <input 
                        type="email" 
                        required
                        placeholder="you@example.com" 
                        className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all hover:border-white/20 focus:bg-[#151515]"
                      />
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit" 
                      disabled={isLoading}
                      className="w-full mt-4 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send reset link'}
                    </motion.button>
                  </form>

                  <div className="mt-8 text-center text-sm text-white/50">
                    Remember your password?{' '}
                    <button 
                      type="button"
                      onClick={() => setIsForgotPassword(false)} 
                      className="text-white hover:text-violet-300 font-medium transition-colors"
                    >
                      Log in
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="login-signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                    {isLogin ? 'Welcome back' : 'Create an account'}
                  </h1>
                  <p className="text-white/50 text-sm md:text-base mb-8">
                    {isLogin 
                      ? 'Enter your details to access your personalized SQL learning path.' 
                      : 'Start your journey to mastering SQL with AI-powered tutoring.'}
                  </p>

                  {/* Google Button */}
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium text-white mb-6"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                  </motion.button>

                  <div className="relative flex items-center gap-4 mb-6">
                    <div className="h-px bg-white/10 flex-1" />
                    <span className="text-xs text-white/40 uppercase tracking-wider font-medium">Or continue with email</span>
                    <div className="h-px bg-white/10 flex-1" />
                  </div>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <AnimatePresence>
                      {!isLogin && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-1.5 overflow-hidden"
                        >
                          <label className="text-sm text-white/70 font-medium">Name</label>
                          <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required={!isLogin}
                            placeholder="John Doe" 
                            className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all hover:border-white/20 focus:bg-[#151515]"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <div className="space-y-1.5">
                      <label className="text-sm text-white/70 font-medium">Email</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com" 
                        className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all hover:border-white/20 focus:bg-[#151515]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-sm text-white/70 font-medium">Password</label>
                        {isLogin && (
                          <button 
                            type="button" 
                            onClick={() => setIsForgotPassword(true)}
                            className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div className="relative group">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          placeholder="••••••••" 
                          className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all hover:border-white/20 focus:bg-[#151515]"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors p-1"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {isLogin && (
                      <div className="flex items-center gap-2 pt-2">
                        <input type="checkbox" id="remember" className="w-4 h-4 rounded border-white/10 bg-[#111111] text-violet-500 focus:ring-violet-500 focus:ring-offset-0 transition-colors hover:border-white/30" />
                        <label htmlFor="remember" className="text-sm text-white/60 cursor-pointer hover:text-white/80 transition-colors">Remember me for 30 days</label>
                      </div>
                    )}

                    {error && (
                      <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
                        {error}
                      </div>
                    )}

                    <motion.button 
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit" 
                      disabled={isLoading}
                      className="w-full mt-4 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] flex justify-center items-center gap-2 disabled:opacity-70"
                    >
                      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? 'Log in' : 'Create account')}
                    </motion.button>
                  </form>

                  <div className="mt-8 text-center text-sm text-white/50">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <Link 
                      to={isLogin ? '/signup' : '/login'} 
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-white hover:text-violet-300 font-medium transition-colors"
                    >
                      {isLogin ? 'Sign up' : 'Log in'}
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#050505] border-l border-white/5 items-center justify-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        {/* Animated background elements (subtle grid/dots) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] opacity-50" />

        {/* Subtle SQL Floating Text */}
        <motion.div
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-1/4 left-[10%] font-mono text-[10px] text-violet-400/40 whitespace-nowrap -rotate-6 pointer-events-none select-none"
        >
          SELECT * FROM users WHERE active = true;
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 30, 0], opacity: [0.1, 0.25, 0.1] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-[10%] font-mono text-[10px] text-cyan-400/40 whitespace-nowrap rotate-6 pointer-events-none select-none"
        >
          INNER JOIN subscriptions s ON u.id = s.user_id
        </motion.div>

        <motion.div
          animate={{ x: [0, 20, 0], opacity: [0.05, 0.15, 0.05] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 5 }}
          className="absolute top-1/2 right-[5%] font-mono text-[10px] text-white/30 whitespace-nowrap -rotate-90 pointer-events-none select-none"
        >
          GROUP BY department_id HAVING count &gt; 5
        </motion.div>

        {/* Central Graphic */}
        <div className="relative z-10 w-full max-w-lg perspective-1000">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 50 }}
            className="relative"
          >
            {/* Main glass card */}
            <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-cyan-500" />
              
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
                <Sparkles className="w-5 h-5 text-violet-400" />
                <span className="font-mono text-sm text-white/80">AI Query Analysis</span>
                <span className="ml-auto flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>

              {/* Code block animation inside graphic */}
              <div className="space-y-3 font-mono text-xs md:text-sm">
                <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, delay: 0.5 }} className="overflow-hidden whitespace-nowrap">
                  <span className="text-violet-400">SELECT</span> u.name, <span className="text-cyan-400">COUNT</span>(o.id) <span className="text-violet-400">AS</span> total_orders
                </motion.div>
                <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, delay: 1 }} className="overflow-hidden whitespace-nowrap">
                  <span className="text-violet-400">FROM</span> users u
                </motion.div>
                <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, delay: 1.5 }} className="overflow-hidden whitespace-nowrap">
                  <span className="text-violet-400">LEFT JOIN</span> orders o <span className="text-violet-400">ON</span> u.id = o.user_id
                </motion.div>
                <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, delay: 2 }} className="overflow-hidden whitespace-nowrap">
                  <span className="text-violet-400">GROUP BY</span> u.id
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 3 }} className="pt-4 mt-4 border-t border-white/5 text-emerald-400 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-400/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  Query optimized: O(N) complexity
                </motion.div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [-10, 10, -10], rotateZ: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -right-12 top-10 bg-[#1A1A1C]/90 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-xl"
            >
              <Terminal className="w-5 h-5 text-cyan-400" />
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10], rotateZ: [2, -2, 2] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
              className="absolute -left-8 bottom-12 bg-[#1A1A1C]/90 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-xl"
            >
              <Database className="w-5 h-5 text-violet-400" />
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute right-10 -bottom-6 bg-gradient-to-r from-violet-500 to-cyan-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)]"
            >
              Pro User
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
