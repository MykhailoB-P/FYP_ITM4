import React from 'react';

export default function LeaderboardUnderConstruction() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-white bg-dot-pattern-live font-sans text-black selection:bg-black selection:text-white">
      <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full text-center flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-6 border-b-4 border-black pb-4 w-full">
          [ MODULE IN DEVELOPMENT ]
        </h1>
        
        <p className="font-mono text-lg font-bold mb-8 leading-relaxed text-left w-full">
          THE GLOBAL LEADERBOARD AND RANKING SYSTEM ARE CURRENTLY UNDERGOING ARCHITECTURAL UPGRADES.
        </p>

        <div className="bg-[#FF0000] text-white font-mono font-black text-2xl py-4 px-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full">
          STATUS: OFFLINE
        </div>
      </div>
    </div>
  );
}
