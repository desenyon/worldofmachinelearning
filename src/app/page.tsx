'use client';

import { motion, useMotionValue, useTransform, animate, useSpring, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState, useCallback, useMemo } from 'react';

// Seeded random for deterministic values
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Generate background particles
const BACKGROUND_PARTICLES = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: seededRandom(i * 3) * 100,
  y: seededRandom(i * 3 + 1) * 100,
  size: 1 + seededRandom(i * 3 + 2) * 3,
  duration: 15 + seededRandom(i * 3 + 3) * 25,
  delay: seededRandom(i * 3 + 4) * 10,
}));

// Generate data points
const createDataPoints = () => {
  const points: Array<{
    id: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    size: number;
    class: 0 | 1;
    delay: number;
    pulseSpeed: number;
  }> = [];

  // Class 0 - Orange - Left cluster
  for (let i = 0; i < 40; i++) {
    const seed = i * 11 + 1;
    const angle = seededRandom(seed) * Math.PI * 2;
    const radius = 60 + seededRandom(seed + 1) * 140;
    points.push({
      id: i,
      startX: 100 + seededRandom(seed + 2) * 800,
      startY: 50 + seededRandom(seed + 3) * 450,
      endX: 230 + Math.cos(angle) * radius,
      endY: 280 + Math.sin(angle) * radius * 0.65,
      size: 4 + seededRandom(seed + 4) * 12,
      class: 0,
      delay: seededRandom(seed + 5) * 0.5,
      pulseSpeed: 1.5 + seededRandom(seed + 6) * 2,
    });
  }

  // Class 1 - Green - Right cluster
  for (let i = 40; i < 80; i++) {
    const seed = i * 11 + 200;
    const angle = seededRandom(seed) * Math.PI * 2;
    const radius = 50 + seededRandom(seed + 1) * 120;
    points.push({
      id: i,
      startX: 100 + seededRandom(seed + 2) * 800,
      startY: 50 + seededRandom(seed + 3) * 450,
      endX: 770 + Math.cos(angle) * radius,
      endY: 260 + Math.sin(angle) * radius * 0.6,
      size: 4 + seededRandom(seed + 4) * 12,
      class: 1,
      delay: seededRandom(seed + 5) * 0.5,
      pulseSpeed: 1.5 + seededRandom(seed + 6) * 2,
    });
  }

  return points;
};

// Generate neural network connections
const createConnections = (points: ReturnType<typeof createDataPoints>) => {
  const connections: Array<{ from: number; to: number; strength: number }> = [];
  
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      if (points[i].class === points[j].class) {
        const dx = points[i].endX - points[j].endX;
        const dy = points[i].endY - points[j].endY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          connections.push({ from: i, to: j, strength: 1 - dist / 90 });
        }
      }
    }
  }
  
  return connections.slice(0, 80);
};

// Generate flowing energy paths
const ENERGY_PATHS = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  startX: 50 + seededRandom(i * 5) * 400,
  startY: seededRandom(i * 5 + 1) * 560,
  midX: 400 + seededRandom(i * 5 + 2) * 200,
  midY: 100 + seededRandom(i * 5 + 3) * 360,
  endX: 550 + seededRandom(i * 5 + 4) * 400,
  endY: seededRandom(i * 5 + 5) * 560,
  duration: 4 + seededRandom(i * 5 + 6) * 4,
  delay: i * 0.8,
}));

const DATA_POINTS = createDataPoints();
const CONNECTIONS = createConnections(DATA_POINTS);

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<'initial' | 'scatter' | 'training' | 'clustering' | 'complete'>('initial');
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, { stiffness: 50, damping: 20 });
  const progressWidth = useTransform(smoothProgress, v => `${v}%`);
  const [progressValue, setProgressValue] = useState(0);
  const [epoch, setEpoch] = useState(0);
  
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (v) => {
      setProgressValue(Math.round(v));
      setEpoch(Math.floor(v / 10));
    });
    return () => unsubscribe();
  }, [smoothProgress]);
  
  useEffect(() => {
    setMounted(true);
    
    const timeline = async () => {
      await new Promise(r => setTimeout(r, 800));
      setPhase('scatter');
      
      await new Promise(r => setTimeout(r, 2500));
      setPhase('training');
      animate(progress, 100, { duration: 4, ease: 'easeInOut' });
      
      await new Promise(r => setTimeout(r, 2000));
      setPhase('clustering');
      
      await new Promise(r => setTimeout(r, 2500));
      setPhase('complete');
    };
    
    timeline();
  }, [progress]);

  const restart = useCallback(() => {
    setPhase('initial');
    progress.set(0);
    setProgressValue(0);
    setEpoch(0);
    
    setTimeout(() => {
      const timeline = async () => {
        await new Promise(r => setTimeout(r, 800));
        setPhase('scatter');
        await new Promise(r => setTimeout(r, 2500));
        setPhase('training');
        animate(progress, 100, { duration: 4, ease: 'easeInOut' });
        await new Promise(r => setTimeout(r, 2000));
        setPhase('clustering');
        await new Promise(r => setTimeout(r, 2500));
        setPhase('complete');
      };
      timeline();
    }, 100);
  }, [progress]);

  if (!mounted) {
    return (
      <div className="relative min-h-screen bg-[#0a0e1a]">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-white/30 font-mono text-sm"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Initializing neural network...
          </motion.div>
        </div>
      </div>
    );
  }

  const isTraining = phase === 'training' || phase === 'clustering' || phase === 'complete';
  const isClustered = phase === 'clustering' || phase === 'complete';
  const isComplete = phase === 'complete';

  return (
    <div className="relative h-screen w-full max-w-[100vw] bg-[#0a0e1a] overflow-hidden flex flex-col">
      {/* Main content area */}
      <div className="relative flex-1 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(236, 55, 80, 0.08) 0%, transparent 50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 25% 50%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)',
          }}
          animate={{
            x: ['-5%', '5%', '-5%'],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 50% 35% at 75% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
          }}
          animate={{
            x: ['5%', '-5%', '5%'],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #fff 1px, transparent 1px),
            linear-gradient(to bottom, #fff 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {BACKGROUND_PARTICLES.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main SVG Canvas */}
      <svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 560"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Glow filters */}
          <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradients */}
          <radialGradient id="orangeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#f97316" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="greenGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#22c55e" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec3750" stopOpacity="0" />
            <stop offset="50%" stopColor="#ec3750" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ec3750" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="boundaryGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ec3750" stopOpacity="0" />
            <stop offset="20%" stopColor="#ec3750" stopOpacity="1" />
            <stop offset="80%" stopColor="#ec3750" stopOpacity="1" />
            <stop offset="100%" stopColor="#ec3750" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Energy flow paths during training */}
        {isTraining && !isComplete && ENERGY_PATHS.map((path) => (
          <motion.g key={path.id}>
            <motion.circle
              r="4"
              fill="#ec3750"
              filter="url(#strongGlow)"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                cx: [path.startX, path.midX, path.endX],
                cy: [path.startY, path.midY, path.endY],
              }}
              transition={{
                duration: path.duration,
                delay: path.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.g>
        ))}

        {/* Cluster glow effects */}
        <motion.ellipse
          cx="230"
          cy="280"
          rx="200"
          ry="180"
          fill="url(#orangeGlow)"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ 
            opacity: isClustered ? 1 : 0,
            scale: isClustered ? 1 : 0.3,
          }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        <motion.ellipse
          cx="770"
          cy="260"
          rx="180"
          ry="160"
          fill="url(#greenGlow)"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ 
            opacity: isClustered ? 1 : 0,
            scale: isClustered ? 1 : 0.3,
          }}
          transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
        />

        {/* Connection lines - Neural network style */}
        {CONNECTIONS.map((conn, i) => {
          const from = DATA_POINTS[conn.from];
          const to = DATA_POINTS[conn.to];
          const color = from.class === 0 ? '#f97316' : '#22c55e';

          return (
            <motion.line
              key={`conn-${i}`}
              stroke={color}
              strokeWidth={conn.strength * 2.5}
              strokeLinecap="round"
              initial={{ 
                opacity: 0,
                x1: from.startX,
                y1: from.startY,
                x2: to.startX,
                y2: to.startY,
              }}
              animate={{ 
                opacity: isComplete ? conn.strength * 0.5 : 0,
                x1: isClustered ? from.endX : from.startX,
                y1: isClustered ? from.endY : from.startY,
                x2: isClustered ? to.endX : to.startX,
                y2: isClustered ? to.endY : to.startY,
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: i * 0.01 },
                x1: { duration: 3, ease: [0.25, 0.1, 0.25, 1] },
                y1: { duration: 3, ease: [0.25, 0.1, 0.25, 1] },
                x2: { duration: 3, ease: [0.25, 0.1, 0.25, 1] },
                y2: { duration: 3, ease: [0.25, 0.1, 0.25, 1] },
              }}
            />
          );
        })}

        {/* Decision Boundary with animation */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: isComplete ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          {/* Glow behind the line */}
          <motion.line
            x1="500"
            y1="30"
            x2="500"
            y2="530"
            stroke="#ec3750"
            strokeWidth="8"
            strokeLinecap="round"
            filter="url(#strongGlow)"
            opacity="0.3"
          />
          {/* Main line */}
          <motion.line
            x1="500"
            y1="30"
            x2="500"
            y2="530"
            stroke="url(#boundaryGradient)"
            strokeWidth="3"
            strokeDasharray="12 8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isComplete ? 1 : 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          {/* Animated pulse on the line */}
          {isComplete && (
            <motion.circle
              cx="500"
              r="6"
              fill="#ec3750"
              filter="url(#strongGlow)"
              animate={{ cy: [50, 510, 50] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </motion.g>

        {/* Data Points with pulsing effect */}
        {DATA_POINTS.map((point) => {
          const color = point.class === 0 ? '#f97316' : '#22c55e';
          const isVisible = phase !== 'initial';

          return (
            <motion.g key={point.id}>
              {/* Outer pulse ring */}
              {isComplete && (
                <motion.circle
                  r={point.size + 8}
                  fill="none"
                  stroke={color}
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.4, 0],
                    scale: [0.8, 1.5, 0.8],
                    cx: point.endX,
                    cy: point.endY,
                  }}
                  transition={{
                    duration: point.pulseSpeed,
                    repeat: Infinity,
                    delay: point.delay,
                  }}
                />
              )}
              {/* Main point */}
              <motion.circle
                r={point.size}
                fill={color}
                filter={isComplete ? 'url(#glow)' : 'none'}
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  cx: point.startX,
                  cy: point.startY,
                }}
                animate={{
                  opacity: isVisible ? 0.9 : 0,
                  scale: isVisible ? 1 : 0,
                  cx: isClustered ? point.endX : point.startX,
                  cy: isClustered ? point.endY : point.startY,
                }}
                transition={{
                  opacity: { duration: 0.5, delay: point.id * 0.01 },
                  scale: { duration: 0.5, delay: point.id * 0.01, type: 'spring', stiffness: 150 },
                  cx: { duration: 3, ease: [0.25, 0.1, 0.25, 1], delay: point.delay * 0.2 },
                  cy: { duration: 3, ease: [0.25, 0.1, 0.25, 1], delay: point.delay * 0.2 },
                }}
              />
              {/* Inner highlight */}
              <motion.circle
                r={point.size * 0.4}
                fill="white"
                opacity="0.3"
                initial={{ 
                  cx: point.startX,
                  cy: point.startY - point.size * 0.2,
                  opacity: 0,
                }}
                animate={{
                  opacity: isVisible ? 0.3 : 0,
                  cx: isClustered ? point.endX : point.startX,
                  cy: isClustered ? point.endY - point.size * 0.2 : point.startY - point.size * 0.2,
                }}
                transition={{
                  cx: { duration: 3, ease: [0.25, 0.1, 0.25, 1], delay: point.delay * 0.2 },
                  cy: { duration: 3, ease: [0.25, 0.1, 0.25, 1], delay: point.delay * 0.2 },
                }}
              />
            </motion.g>
          );
        })}

        {/* Cluster labels */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: isComplete ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <text x="230" y="480" textAnchor="middle" fill="#f97316" fontSize="14" fontFamily="monospace" fontWeight="bold">
            CLASS 0
          </text>
          <text x="230" y="500" textAnchor="middle" fill="#f97316" fontSize="11" fontFamily="monospace" opacity="0.6">
            Perished
          </text>
          <text x="770" y="440" textAnchor="middle" fill="#22c55e" fontSize="14" fontFamily="monospace" fontWeight="bold">
            CLASS 1
          </text>
          <text x="770" y="460" textAnchor="middle" fill="#22c55e" fontSize="11" fontFamily="monospace" opacity="0.6">
            Survived
          </text>
        </motion.g>

        {/* Decision boundary label */}
        <motion.text
          x="500"
          y="18"
          textAnchor="middle"
          fill="#ec3750"
          fontSize="10"
          fontFamily="monospace"
          letterSpacing="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isComplete ? 0.8 : 0 }}
          transition={{ delay: 2 }}
        >
          DECISION BOUNDARY
        </motion.text>
      </svg>

      {/* Custom Nav for homepage */}
      <motion.div 
        className="absolute top-0 left-0 right-0 p-4 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="2" width="24" height="24" rx="4" fill="#ec3750"/>
              <path d="M8 10h4v8H8v-8zm8 0h4v8h-4v-8zm-4 4h4v4h-4v-4z" fill="white"/>
            </svg>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-white leading-tight">World of ML</span>
              <span className="text-[10px] text-white/50 font-mono">HACK CLUB</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-1">
            {[
              { href: '/', label: 'Home', active: true },
              { href: '/learn', label: 'Learn' },
              { href: '/gallery', label: 'Gallery' },
              { href: '/submit', label: 'Submit' },
              { href: '/store', label: 'Store' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  item.active 
                    ? 'text-white bg-white/10' 
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <Link 
            href="/store"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#ec3750]/30 bg-[#ec3750]/10 transition-colors hover:bg-[#ec3750]/20"
          >
            <span className="text-sm font-mono font-bold text-[#ec3750]">0 XP</span>
          </Link>
        </div>
      </motion.div>

      {/* Center Info Card */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] z-10"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, type: 'spring' }}
      >
        <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-7 shadow-2xl overflow-hidden">
          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(236,55,80,0.3), transparent)',
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          
          <div className="relative">
            <div className="flex items-center justify-center gap-3 mb-5">
              <motion.svg 
                width="36" 
                height="36" 
                viewBox="0 0 28 28" 
                fill="none"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <rect x="2" y="2" width="24" height="24" rx="4" fill="#ec3750"/>
                <path d="M8 10h4v8H8v-8zm8 0h4v8h-4v-8zm-4 4h4v4h-4v-4z" fill="white"/>
              </motion.svg>
              <span className="font-mono text-xl font-bold text-white tracking-wide">WORLD OF ML</span>
            </div>
            
            <p className="text-white/60 text-sm leading-relaxed mb-6 text-center">
              Watch a neural network learn to classify Titanic passengers in real-time. 
              Chaos transforms into clarity as the model discovers patterns.
            </p>
            
            <Link href="/learn">
              <motion.button
                className="w-full py-3.5 bg-[#ec3750] text-white text-sm font-mono font-bold rounded-xl transition-all shadow-lg shadow-[#ec3750]/40"
                whileHover={{ scale: 1.03, boxShadow: '0 20px 40px -10px rgba(236,55,80,0.5)' }}
                whileTap={{ scale: 0.97 }}
              >
                START YOUR JOURNEY
              </motion.button>
            </Link>
            
            <div className="mt-5 flex justify-center gap-5 text-white/40 text-xs font-mono">
              <Link href="/gallery" className="hover:text-white/70 transition-colors">Gallery</Link>
              <span className="text-white/20">|</span>
              <Link href="/submit" className="hover:text-white/70 transition-colors">Submit</Link>
              <span className="text-white/20">|</span>
              <Link href="/about" className="hover:text-white/70 transition-colors">About</Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Status Panel - Top Left */}
      <motion.div
        className="absolute top-20 left-4"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-3 min-w-[160px]">
          <div className="font-mono text-[9px] text-white/40 mb-2 tracking-widest">MODEL STATUS</div>
          <div className="flex items-center gap-2 mb-2">
            <motion.div 
              className={`w-2 h-2 rounded-full ${
                phase === 'complete' ? 'bg-emerald-500' :
                phase === 'clustering' || phase === 'training' ? 'bg-amber-500' :
                'bg-white/30'
              }`}
              animate={phase === 'training' || phase === 'clustering' ? { 
                scale: [1, 1.3, 1],
                opacity: [1, 0.5, 1],
              } : {}}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
            <span className="font-mono text-xs text-white">
              {phase === 'initial' && 'Initializing...'}
              {phase === 'scatter' && 'Loading Data'}
              {phase === 'training' && 'Training Model'}
              {phase === 'clustering' && 'Optimizing...'}
              {phase === 'complete' && 'Complete'}
            </span>
          </div>
          {isTraining && (
            <div className="font-mono text-[10px] text-white/50">
              Epoch: {epoch}/10
            </div>
          )}
        </div>
      </motion.div>

      {/* Legend - Bottom Left */}
      <motion.div
        className="absolute bottom-20 left-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: isComplete ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-3">
          <div className="font-mono text-[9px] text-white/40 mb-2 tracking-widest">LEGEND</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#22c55e] shadow-lg shadow-[#22c55e]/50" />
              <span className="text-[11px] text-white/60">Survived</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#f97316] shadow-lg shadow-[#f97316]/50" />
              <span className="text-[11px] text-white/60">Perished</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-[#ec3750] shadow-lg shadow-[#ec3750]/50" />
              <span className="text-[11px] text-white/60">Decision Boundary</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hack Club Badge */}
      <motion.div
        className="absolute bottom-20 right-4"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
      >
        <Link href="https://hackclub.com" target="_blank">
          <motion.div 
            className="w-14 h-14 rounded-full bg-[#ec3750] flex items-center justify-center text-white text-[9px] font-bold text-center leading-tight shadow-xl shadow-[#ec3750]/40"
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              boxShadow: [
                '0 10px 30px -5px rgba(236,55,80,0.4)',
                '0 15px 40px -5px rgba(236,55,80,0.6)',
                '0 10px 30px -5px rgba(236,55,80,0.4)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Hack<br/>Club
          </motion.div>
        </Link>
      </motion.div>

      </div>{/* End of main content area */}

      {/* Bottom Progress Bar */}
      <div className="h-14 bg-black/80 backdrop-blur-xl border-t border-white/5 z-30 flex-shrink-0">
        <div className="h-full max-w-7xl mx-auto px-4 flex items-center gap-4">
          <div className="flex-1 flex items-center gap-3">
            <span className="text-white/40 font-mono text-xs w-12 text-right">
              {progressValue}%
            </span>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full rounded-full"
                style={{ 
                  width: progressWidth,
                  background: 'linear-gradient(90deg, #ec3750, #f97316)',
                }}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className={`font-mono text-[10px] px-2.5 py-1 rounded-lg ${
              phase === 'complete' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
              phase === 'training' || phase === 'clustering' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
              'bg-white/10 text-white/50 border border-white/10'
            }`}>
              {phase === 'complete' ? 'TRAINED' : 
               phase === 'training' || phase === 'clustering' ? 'TRAINING' : 'READY'}
            </span>
            
            <button 
              onClick={restart}
              className="text-white/30 hover:text-white font-mono text-[10px] transition-all px-2.5 py-1 rounded-lg hover:bg-white/10 border border-transparent hover:border-white/20"
            >
              RESTART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
