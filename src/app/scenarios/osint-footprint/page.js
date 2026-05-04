"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGamification } from "@/hooks/useGamification";

export default function OsintFootprintScenario() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasClaimedXp, setHasClaimedXp] = useState(false);
  
  const router = useRouter();
  const { processScenarioClear, isSyncing } = useGamification();

  const GENERIC_RESULTS = [
    { title: "Munster Technological University | MTU.ie", url: "https://www.mtu.ie", snippet: "Welcome to Munster Technological University. Discover our courses, research, and campus life. Apply now for the upcoming academic year." },
    { title: "Student Portal - MTU", url: "https://my.mtu.ie", snippet: "Login to the MTU student portal for timetables, grades, and campus announcements." },
    { title: "MTU Library Services", url: "https://library.mtu.ie", snippet: "Access digital resources, book study rooms, and find research materials." },
    { title: "MTU Contact Directory", url: "https://www.mtu.ie/contact", snippet: "Find contact information for MTU departments, staff, and support services." }
  ];

  const CRITICAL_RESULT = {
    id: "confidential",
    title: "[CONFIDENTIAL] 2026_Server_Architecture.pdf",
    url: "https://www.mtu.ie/internal/it/2026_Server_Architecture.pdf",
    snippet: "INTERNAL USE ONLY. Detailed network topology and server architecture for MTU Cork campuses. Includes legacy system IPs and firewall configurations."
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setHasSearched(true);
    const queryLower = searchQuery.toLowerCase();

    // Check for Google Dorks: site:mtu.ie and filetype:pdf
    if (queryLower.includes("site:mtu.ie") && queryLower.includes("filetype:pdf")) {
      setResults([CRITICAL_RESULT]);
    } else {
      // Return generic results if query doesn't match the specific dorks
      setResults(GENERIC_RESULTS);
    }
  };

  const handleResultClick = (result) => {
    if (result.id === "confidential") {
      setIsSuccess(true);
    }
  };

  const handleClaimXp = async () => {
    await processScenarioClear("beg-2", 50);
    setHasClaimedXp(true);
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
          [ SCENARIO: PUBLIC FOOTPRINT ]
        </h1>
      </header>

      {/* SUCCESS OVERLAY (Claimed) */}
      {(isSuccess && hasClaimedXp) && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
          <div className="bg-[#00FF00] border-4 border-black p-8 md:p-12 max-w-2xl w-full shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in duration-300">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-6 border-b-4 border-black pb-4 text-center">
              [ INTEL ACQUIRED ]
            </h2>
            <div className="font-mono text-xl font-bold mb-8 space-y-4 text-center bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p>Confidential document located via advanced search operators.</p>
              <p>Network topology successfully extracted.</p>
            </div>
            
            <button
              onClick={() => router.push("/scenarios")}
              className="w-full bg-black text-white font-black text-2xl py-6 px-4 uppercase tracking-widest border-4 border-black hover:bg-white hover:text-black transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none"
            >
              [ &lt; RETURN TO LAB ]
            </button>
          </div>
        </div>
      )}

      {/* XP CLAIM OVERLAY */}
      {(isSuccess && !hasClaimedXp) && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
          <div className="bg-white border-4 border-black p-8 md:p-12 max-w-xl w-full shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in duration-300">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest mb-6 border-b-4 border-black pb-4 text-center">
              [ TARGET LOCATED ]
            </h2>
            <p className="font-mono text-lg mb-8 text-center font-bold">
              You successfully utilized Google Dorks to uncover a leaked internal document.
            </p>
            <button
              onClick={handleClaimXp}
              disabled={isSyncing}
              className="w-full bg-[#00FF00] text-black font-black text-2xl py-6 px-4 uppercase tracking-widest border-4 border-black hover:bg-black hover:text-[#00FF00] hover:border-[#00FF00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSyncing ? "SYNCHRONIZING..." : "[ CLAIM 50 XP ]"}
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto items-stretch">
        
        {/* LEFT COLUMN: INSTRUCTIONS */}
        <div className="flex-1 lg:max-w-sm flex flex-col gap-6">
          <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
            <div className="bg-black text-white p-4 border-b-4 border-black">
              <h2 className="font-black text-2xl uppercase">MISSION BRIEFING</h2>
            </div>
            <div className="p-6 font-mono text-base space-y-4">
              <p className="font-bold text-lg">TARGET: mtu.ie</p>
              <p>An internal IT document detailing server architecture has reportedly been indexed by public search engines.</p>
              <p>Your goal is to construct an advanced search query (Google Dork) to locate this specific file.</p>
              <div className="bg-[#FFFF00]/20 border-2 border-black p-4 mt-4">
                <p className="font-bold mb-2">REQUIRED DORKS:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="font-bold">site:</span> Restricts results to a specific domain.</li>
                  <li><span className="font-bold">filetype:</span> Restricts results to a specific file extension (e.g., pdf).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SECU-SEARCH UI */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-black flex items-center justify-center gap-3">
                <span className="text-3xl text-gray-400">🔍</span>
                [ SECU-SEARCH ]
              </h2>
            </div>
            
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter search query..."
                className="flex-1 p-4 border-4 border-black font-mono text-lg outline-none focus:bg-gray-50"
              />
              <button 
                type="submit"
                className="bg-black text-white font-black text-xl py-4 px-8 uppercase border-4 border-black hover:bg-white hover:text-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none"
              >
                [ SEARCH ]
              </button>
            </form>
          </div>

          {/* RESULTS AREA */}
          {hasSearched && (
            <div className="flex flex-col gap-4">
              <div className="font-mono font-bold text-sm text-gray-500">
                Displaying results for: <span className="text-black bg-gray-200 px-2 py-1">{searchQuery}</span>
              </div>
              
              <div className="flex flex-col gap-6">
                {results.length === 0 && (
                  <div className="p-8 border-4 border-black bg-white text-center font-mono font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    NO RESULTS FOUND
                  </div>
                )}
                
                {results.map((result, idx) => {
                  const isCritical = result.id === "confidential";
                  return (
                    <div 
                      key={idx} 
                      onClick={() => handleResultClick(result)}
                      className={`p-6 border-4 transition-all ${
                        isCritical 
                          ? "border-[#FF0000] bg-white shadow-[6px_6px_0px_0px_#FF0000] cursor-pointer hover:-translate-y-1 hover:-translate-x-1" 
                          : "border-black bg-white shadow-[4px_4px_0px_0px_#000000] cursor-default"
                      }`}
                    >
                      <div className={`text-xl md:text-2xl font-black mb-2 ${isCritical ? "text-[#FF0000] underline" : "text-blue-700 underline"}`}>
                        {result.title}
                      </div>
                      <div className="text-sm font-bold text-green-700 mb-2 font-mono break-all">{result.url}</div>
                      <div className="text-gray-800 font-medium leading-relaxed">{result.snippet}</div>
                      
                      {isCritical && (
                        <div className="mt-4 inline-block bg-[#FF0000] text-white font-black px-3 py-1 uppercase text-sm animate-pulse">
                          [ CLICK TO ACQUIRE ASSET ]
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
