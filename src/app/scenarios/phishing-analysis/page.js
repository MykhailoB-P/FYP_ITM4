"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGamification } from "@/hooks/useGamification";

export default function PhishingAnalysisScenario() {
  const [foundIndicators, setFoundIndicators] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasClaimedXp, setHasClaimedXp] = useState(false);
  const [hoverLink, setHoverLink] = useState(false);
  
  const router = useRouter();
  const { processScenarioClear, isSyncing } = useGamification();

  const handleIndicatorClick = (indicatorId) => {
    if (!foundIndicators.includes(indicatorId)) {
      const newIndicators = [...foundIndicators, indicatorId];
      setFoundIndicators(newIndicators);
      
      if (newIndicators.length === 3) {
        setTimeout(() => {
          setIsSuccess(true);
        }, 1000);
      }
    }
  };

  const handleClaimXp = async () => {
    await processScenarioClear("beg-3", 50);
    setHasClaimedXp(true);
  };

  const isFound = (id) => foundIndicators.includes(id);

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
          [ SCENARIO: EMAIL ANALYSIS ]
        </h1>
        <div className="mt-4 md:mt-0 font-mono bg-black text-[#00FF00] font-bold px-4 py-2 border-2 border-black uppercase text-xl flex items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <span className="mr-2">THREAT COUNTER:</span>
          <span className={foundIndicators.length === 3 ? "text-white" : ""}>
            {foundIndicators.length}/3 FOUND
          </span>
        </div>
      </header>

      {/* SUCCESS OVERLAY (Claimed) */}
      {(isSuccess && hasClaimedXp) && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
          <div className="bg-[#00FF00] border-4 border-black p-8 md:p-12 max-w-2xl w-full shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in duration-300">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-6 border-b-4 border-black pb-4 text-center">
              [ THREAT QUARANTINED ]
            </h2>
            <div className="font-mono text-xl font-bold mb-8 space-y-4 text-center bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p>Phishing vectors successfully identified.</p>
              <p>Mailbox secured and sender blocklisted.</p>
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
              [ ANALYSIS COMPLETE ]
            </h2>
            <p className="font-mono text-lg mb-8 text-center font-bold">
              You successfully identified all critical indicators of a phishing attempt.
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
        
        {/* LEFT COLUMN: INBOX SIDEBAR */}
        <div className="lg:w-1/3 flex flex-col border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[500px]">
          <div className="bg-black text-white font-black text-xl uppercase p-4 border-b-4 border-black flex justify-between items-center">
            <span>INBOX</span>
            <span className="text-sm bg-white text-black px-2 py-1">1 UNREAD</span>
          </div>
          
          <div className="flex flex-col flex-1 bg-gray-50">
            {/* Active Email Item */}
            <div className="p-4 border-b-2 border-black bg-[#FFFF00]/20 cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-lg font-mono">MTU IT Support</span>
                <span className="text-xs font-bold text-black bg-[#FF0000] text-white px-1">NEW</span>
              </div>
              <div className="font-bold text-sm mb-1 truncate">ACTION REQUIRED: Account Termination</div>
              <div className="text-xs text-gray-600 truncate font-mono">Please verify your account immediately...</div>
            </div>
            
            {/* Read Email Item */}
            <div className="p-4 border-b-2 border-gray-300 opacity-50 cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-lg font-mono">HR Department</span>
              </div>
              <div className="font-bold text-sm mb-1 truncate">Monthly Newsletter - Oct 2026</div>
              <div className="text-xs text-gray-600 truncate font-mono">Dear team, here are the updates for this month...</div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE EMAIL */}
        <div className="lg:w-2/3 flex flex-col border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative min-h-[500px]">
          
          {/* Email Header */}
          <div className="bg-gray-100 border-b-4 border-black p-6 font-mono text-sm sm:text-base">
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <span className="font-bold w-16 text-gray-500">FROM:</span>
                <span className="font-medium">
                  MTU IT Support &lt;
                  <span 
                    onClick={() => handleIndicatorClick("sender")}
                    className={`cursor-pointer px-1 transition-colors ${isFound("sender") ? "bg-[#FF0000] text-white font-bold" : "hover:bg-gray-300"}`}
                    title="Click to flag as suspicious"
                  >
                    admin@mtu-update-security.com
                  </span>
                  &gt;
                </span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold w-16 text-gray-500">TO:</span>
                <span className="font-medium">staff@mtu.ie</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold w-16 text-gray-500">DATE:</span>
                <span className="font-medium">Today, 09:14 AM</span>
              </div>
              <div className="flex gap-4 border-t-2 border-dashed border-gray-400 mt-2 pt-2">
                <span className="font-bold w-16 text-gray-500">SUBJECT:</span>
                <span className="font-bold text-lg">ACTION REQUIRED: Account Termination</span>
              </div>
            </div>
          </div>

          {/* Email Body */}
          <div className="p-8 text-base md:text-lg leading-relaxed flex-1 flex flex-col relative">
            <div className="mb-6">Dear MTU Staff Member,</div>
            
            <div className="mb-6">
              Our automated security systems have detected abnormal login activity on your account. To prevent unauthorized access, we have temporarily suspended some of your portal functions.
            </div>
            
            <div className="mb-8">
              Please verify your identity to restore full access.{" "}
              <span 
                onClick={() => handleIndicatorClick("urgency")}
                className={`cursor-pointer px-1 transition-colors ${isFound("urgency") ? "bg-[#FF0000] text-white font-bold" : "hover:bg-gray-200"}`}
                title="Click to flag as suspicious"
              >
                Your account will be terminated in 24 hours.
              </span>
              {" "}Failure to comply will result in permanent data loss.
            </div>
            
            <div className="my-8 text-center">
              <button 
                onClick={() => handleIndicatorClick("link")}
                onMouseEnter={() => setHoverLink(true)}
                onMouseLeave={() => setHoverLink(false)}
                className={`font-black tracking-widest uppercase py-4 px-8 border-4 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                  isFound("link") 
                    ? "bg-[#FF0000] text-white" 
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                title="Click to flag as suspicious"
              >
                [ UPDATE PASSWORD NOW ]
              </button>
            </div>
            
            <div className="mt-auto pt-8 border-t-2 border-gray-200 text-sm text-gray-500">
              <p>Munster Technological University IT Service Desk</p>
              <p>This is an automated message. Do not reply directly to this email.</p>
            </div>
          </div>
          
          {/* Malicious Link Tooltip (Status Bar) */}
          <div className={`absolute bottom-0 left-0 right-0 p-2 font-mono text-sm transition-opacity duration-200 ${hoverLink ? "opacity-100" : "opacity-0"}`}>
            <div className="bg-black text-white px-3 py-1 inline-block border-2 border-black">
              Link destination: <span className="text-[#FFFF00]">http://irish-tax-refund-scam.net/login</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
