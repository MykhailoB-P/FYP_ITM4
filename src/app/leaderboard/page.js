"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const CyberBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth) * 2 - 1;
          const y = (e.clientY / window.innerHeight) * 2 - 1;
          setMousePos({ x, y });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Deep Layer: Breathing Grid with Parallax */}
      <div 
        className="absolute inset-[-5%] opacity-[0.03] transition-transform duration-1000 ease-out animate-grid-breathe"
        style={{
          backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`
        }}
      />

      {/* 2. Mid Layer: Data Streams */}
      <div className="absolute inset-0 opacity-[0.06]">
        {/* Vertical streams */}
        <div className="absolute top-0 bottom-0 left-[15%] w-[1px] bg-gradient-to-b from-transparent via-black to-transparent animate-data-stream-v" />
        <div className="absolute top-0 bottom-0 left-[65%] w-[1px] bg-gradient-to-b from-transparent via-black to-transparent animate-data-stream-v-slow" />
        {/* Horizontal streams */}
        <div className="absolute left-0 right-0 top-[25%] h-[1px] bg-gradient-to-r from-transparent via-black to-transparent animate-data-stream-h" />
        <div className="absolute left-0 right-0 top-[80%] h-[1px] bg-gradient-to-r from-transparent via-black to-transparent animate-data-stream-h-fast" />
        {/* Intersecting Nodes */}
        <div className="absolute left-[15%] top-[25%] w-1 h-1 bg-black -translate-x-1/2 -translate-y-1/2 animate-node-pulse" />
        <div className="absolute left-[65%] top-[80%] w-1 h-1 bg-black -translate-x-1/2 -translate-y-1/2 animate-node-pulse-delayed" />
      </div>

      {/* 3. Cursor Highlight Trail */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full transition-transform duration-700 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 60%)",
          left: '50%',
          top: '50%',
          transform: `translate(calc(-50% + ${mousePos.x * (typeof window !== 'undefined' ? window.innerWidth / 2.5 : 0)}px), calc(-50% + ${mousePos.y * (typeof window !== 'undefined' ? window.innerHeight / 2.5 : 0)}px))`
        }}
      />

      {/* 4. Foreground: Scanlines with Glitch Container */}
      <div className="absolute inset-0 animate-glitch-layer">
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)",
            backgroundSize: "100% 4px",
            animation: "scrollScanlines 20s linear infinite"
          }}
        />
      </div>

      {/* 5. Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
        </svg>
      </div>

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollScanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 400px; }
        }
        @keyframes grid-breathe {
          0%, 100% { opacity: 0.02; }
          50% { opacity: 0.04; }
        }
        @keyframes data-stream-v {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes data-stream-v-slow {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes data-stream-h {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        @keyframes data-stream-h-fast {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100vw); }
        }
        @keyframes node-pulse {
          0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(2); }
        }
        @keyframes glitch-layer {
          0%, 96%, 100% { transform: translate(0); opacity: 1; filter: none; }
          97% { transform: translate(-2px, 1px); opacity: 0.8; filter: contrast(120%); }
          98% { transform: translate(2px, -1px); opacity: 1; filter: none; }
          99% { transform: translate(-1px, 2px); opacity: 0.9; filter: contrast(110%); }
        }
        
        .animate-grid-breathe { animation: grid-breathe 8s ease-in-out infinite; }
        .animate-data-stream-v { animation: data-stream-v 15s linear infinite; }
        .animate-data-stream-v-slow { animation: data-stream-v-slow 25s linear infinite 5s; }
        .animate-data-stream-h { animation: data-stream-h 20s linear infinite 2s; }
        .animate-data-stream-h-fast { animation: data-stream-h-fast 12s linear infinite 8s reverse; }
        .animate-node-pulse { animation: node-pulse 4s ease-in-out infinite; }
        .animate-node-pulse-delayed { animation: node-pulse 4s ease-in-out infinite 2s; }
        .animate-glitch-layer { animation: glitch-layer 14s infinite; }
      `}} />
    </div>
  );
};

export default function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
      }
    };
    fetchCurrentUser();
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('id, username, xp_score')
        .order('xp_score', { ascending: false });

      if (data && !error) {
        setUsers(data);
      }
      setLoading(false);
    };

    fetchLeaderboard();

    // Setup realtime subscription to auto-update
    const channel = supabase
      .channel('leaderboard-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'users' },
        () => {
          fetchLeaderboard();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // Simple sequential ranking (1 to N)
  const getRankings = () => {
    return users.map((u, index) => {
      return { ...u, rank: index + 1 };
    });
  };

  const rankedUsers = getRankings();

  return (
    <div className="relative min-h-screen bg-[#fafafa] font-mono text-black flex justify-center items-start p-8 pt-16 overflow-hidden">
      
      <CyberBackground />

      {/* LEADERBOARD CONTAINER */}
      <div className="relative z-10 w-full max-w-3xl border border-black p-8 bg-white/95 backdrop-blur-[2px] shadow-[0_0_30px_rgba(0,0,0,0.03)]">
        
        <header className="mb-8 border-b border-black pb-4 text-center">
          <h1 className="text-2xl uppercase tracking-widest">
            Leaderboard
          </h1>
          <p className="text-sm text-gray-500 mt-2">SYSTEM RANKING OVERVIEW</p>
        </header>

        {loading ? (
          <div className="text-center text-gray-500 py-12 uppercase text-sm animate-pulse">
            Fetching metrics...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b border-black py-3 px-4 w-24 text-xs uppercase text-gray-500 tracking-wider">Rank</th>
                  <th className="border-b border-black py-3 px-4 text-xs uppercase text-gray-500 tracking-wider">Operator</th>
                  <th className="border-b border-black py-3 px-4 text-right text-xs uppercase text-gray-500 tracking-wider">XP Score</th>
                </tr>
              </thead>
              <tbody>
                {rankedUsers.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center py-8 text-gray-500 text-sm">No data available.</td>
                  </tr>
                )}
                {rankedUsers.map((user) => {
                  let badgeStyles = "border-gray-400 text-gray-700";
                  if (user.rank === 1) badgeStyles = "border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10 font-bold";
                  else if (user.rank === 2) badgeStyles = "border-[#9CA3AF] text-[#9CA3AF] bg-[#9CA3AF]/10 font-bold";
                  else if (user.rank === 3) badgeStyles = "border-[#CD7F32] text-[#CD7F32] bg-[#CD7F32]/10 font-bold";

                  const isCurrentUser = user.id === currentUserId;
                  const rowClasses = isCurrentUser 
                    ? "border-b border-gray-200 bg-gray-100/80 transition-all duration-200 hover:bg-gray-200 shadow-[inset_4px_0_0_0_#000]"
                    : "border-b border-gray-200 transition-all duration-200 hover:bg-gray-100 hover:shadow-[inset_4px_0_0_0_#000]";

                  return (
                    <tr 
                      key={user.id} 
                      className={rowClasses}
                    >
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center justify-center w-7 h-7 border ${badgeStyles}`}>
                          {user.rank}
                        </span>
                      </td>
                      <td className={`py-4 px-4 uppercase tracking-wide text-black ${isCurrentUser ? 'font-bold' : ''}`}>
                        {user.username} {isCurrentUser && <span className="text-gray-400 text-xs ml-2 tracking-widest font-normal">[YOU]</span>}
                      </td>
                      <td className="py-4 px-4 text-right text-black">
                        {user.xp_score}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
