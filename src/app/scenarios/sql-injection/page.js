"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function SqlInjectionScenario() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isCleared, setIsCleared] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setHasError(false);
    setErrorMsg("");

    const payloadRegex = /'\s*OR\s+1=1\s*--|'\s*OR\s*'1'='1/i;
    
    if (payloadRegex.test(username) || payloadRegex.test(password)) {
      setIsCleared(true);
    } else {
      setHasError(true);
      setErrorMsg("ACCESS DENIED: INVALID SYNTAX OR CREDENTIALS");
    }
  };



  return (
    <div className="min-h-screen p-8 bg-white bg-dot-pattern-live font-sans text-black selection:bg-black selection:text-white relative">
      {/* Top Navigation */}
      <div className="mb-8">
        <Link href="/scenarios">
          <button className="bg-black text-white font-bold py-3 px-6 uppercase tracking-widest border-2 border-black hover:bg-white hover:text-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none">
            [ &lt; EXIT TO LAB ]
          </button>
        </Link>
      </div>

      <header className="mb-8 border-b-4 border-black pb-4 flex flex-col md:flex-row justify-between items-start md:items-end">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
          [ SCENARIO: SQL INJECTION ]
        </h1>

      </header>

      {/* Success Modal */}
      {isCleared && (
        <div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-4">
          <div className="bg-[#00FF00] border-4 border-black p-8 max-w-2xl w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in duration-300">
            <h2 className="text-4xl font-black uppercase tracking-widest mb-6 border-b-4 border-black pb-4">
              [ SYSTEM COMPROMISED ]
            </h2>
            <div className="font-mono text-lg font-bold mb-6 space-y-4">
              <p>Excellent work, Operator. You've bypassed the primary security layer. Data extraction in progress...</p>
              <p className="bg-black text-[#00FF00] p-4 border-2 border-black">
                STATUS: PROMOTED. YOU ARE BECOMING A REAL THREAT TO THE SYSTEM. KEEP GOING, FUTURE HACKER.
              </p>
            </div>
            
            <button
              onClick={() => router.push("/scenarios")}
              className="w-full bg-black text-white font-black text-2xl py-6 px-4 uppercase tracking-widest border-4 border-black hover:bg-white hover:text-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none"
            >
              [ &lt; EXIT TO LAB ]
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Left Column (Login Form) */}
        <div className="flex-1">
          <div className={`bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 ${hasError ? 'border-[#FF0000] shadow-[4px_4px_0px_0px_#FF0000]' : ''}`}>
            <h2 className="text-2xl font-black uppercase tracking-widest mb-8 border-b-2 border-black pb-4">
              [ STAFF PORTAL - MTU-NODE ]
            </h2>

            {hasError && (
              <div className="bg-[#FF0000] text-white font-mono font-bold p-3 mb-6 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block font-mono font-bold uppercase mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white border-2 border-black p-4 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  placeholder="admin"
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block font-mono font-bold uppercase mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border-2 border-black p-4 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  placeholder="********"
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white font-bold py-4 px-6 uppercase tracking-widest border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors mt-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none"
              >
                [ AUTHENTICATE ]
              </button>
            </form>
          </div>
        </div>

        {/* Right Column (HUD) */}
        <div className="w-full lg:w-[500px] flex flex-col gap-6">
          <div className="border-2 border-black bg-[#ffff00] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-black text-xl uppercase mb-4 border-b-2 border-black pb-2">OBJECTIVE</h3>
            <p className="font-bold text-lg leading-relaxed">
              Bypass authentication using a tautology-based SQL Injection.
            </p>
          </div>

          <div className="border-2 border-black bg-black text-[#00FF00] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-black text-white text-xl uppercase mb-4 border-b-2 border-white pb-2">LIVE QUERY VIEWER</h3>
            <p className="font-mono text-lg leading-relaxed break-all">
              <span className="text-white">SELECT</span> * <span className="text-white">FROM</span> users <span className="text-white">WHERE</span> user=<span className="text-yellow-400">'{username}'</span> <span className="text-white">AND</span> pass=<span className="text-yellow-400">'{password}'</span>
            </p>
          </div>

          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="w-full bg-black text-white font-bold py-4 px-6 uppercase tracking-widest border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none mb-4"
            >
              [ ? REQUEST INTEL ]
            </button>

            <button
              type="button"
              onClick={() => setShowSolution(!showSolution)}
              className="w-full bg-[#FF0000] text-white font-bold py-4 px-6 uppercase tracking-widest border-2 border-transparent hover:bg-white hover:text-[#FF0000] hover:border-[#FF0000] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none"
            >
              [ ! SHOW SOLUTION ]
            </button>
            
            {showHint && (
              <div className="mt-6 p-4 border-2 border-black bg-gray-100 font-mono text-sm leading-relaxed">
                <strong>HINT:</strong> Databases follow strict logic. The backend query checks if your input matches exactly. You can "break out" of the string by starting with a single quote <code>'</code>, then injecting an OR condition that is always true like <code>OR 1=1</code>, and finally using <code>--</code> to comment out the rest of the query.
                <br/><br/>
                Try typing this exact payload into the username field:
                <br/><br/>
                <code className="bg-black text-[#00FF00] px-2 py-1">' OR 1=1 --</code>
                <br/><br/>
                Reference: THEORY -&gt; 5.1 SQL Injection
              </div>
            )}

            {showSolution && (
              <div className="mt-4 p-4 border-2 border-[#FF0000] bg-[#FF0000]/10 font-mono text-sm leading-relaxed text-black">
                <strong>SOLUTION:</strong> 
                <br/><br/>
                1. Click on the <strong>Username</strong> input field in the STAFF PORTAL.
                <br/>
                2. Type exactly <code className="bg-black text-[#00FF00] px-2 py-1">' OR 1=1 --</code>
                <br/>
                3. Click the <strong>[ AUTHENTICATE ]</strong> button to bypass the login.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
