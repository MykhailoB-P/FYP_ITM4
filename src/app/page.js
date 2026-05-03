"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LiveBackground from "@/components/LiveBackground";

export default function Home() {
  const [glitching, setGlitching] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // End the full-screen glitch after 1 second
    const timer = setTimeout(() => {
      setGlitching(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const scenarios = [
    {
      id: "phish",
      tag: "[PHISH/APP]",
      title: "EMAIL FORENSICS",
      desc: "Analyze suspicious email headers and attachments to trace the origin of a targeted phishing campaign.",
      icon: "📧",
    },
    {
      id: "sql",
      tag: "[WEB/APP]",
      title: "SQL INJECTION",
      desc: "Exploit improper input validation to manipulate backend database queries and extract confidential data.",
      icon: "💉",
    },
    {
      id: "recon",
      tag: "[NET/RECON]",
      title: "NET: PORT IDENTIFICATION",
      desc: "Map target infrastructure by discovering open ports and identifying running services. A crucial footprinting step.",
      icon: "🔍",
    },
  ];

  return (
    <div className={`flex-1 flex flex-col bg-dot-pattern-live scroll-smooth relative ${glitching ? "glitch-effect-load" : ""}`}>
      <LiveBackground />
      {/* Glitch Overlay Effect during load */}
      {glitching && (
        <div className="fixed inset-0 z-50 pointer-events-none backdrop-brightness-150 mix-blend-difference" />
      )}

      <div className="max-w-7xl mx-auto w-full p-4 md:p-12 space-y-12 relative z-10 overflow-hidden">
        
        {/* Header Section */}
        <section className="border-2 border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-hydrate delay-100 flex flex-col justify-center overflow-hidden break-words w-full">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter flex flex-col gap-y-2">
            <span className="glitch-persistent break-words">WELCOME, OPERATOR //</span>
            <span className="break-words">
              CURRENT STATUS: <span className="glitch-persistent color-shift-optimal">LOCAL.</span>
            </span>
          </h1>
          <div className="mt-6 border-t-2 border-black w-32 mb-6"></div>
          <p className="text-lg md:text-2xl font-medium max-w-3xl leading-relaxed break-words">
            The ultimate tactical environment for mastering cybersecurity operations.
            Engage in realistic scenarios, identify vulnerabilities, and elevate your skills.
          </p>
        </section>

        {/* Top Scenarios Grid */}
        <section className="animate-hydrate delay-300">
          <div className="flex items-center justify-between mb-6 border-b-4 border-black pb-2">
            <h2 className="text-3xl font-black uppercase tracking-tight">Active Operations</h2>
            <span className="font-mono font-bold uppercase hidden md:inline-block bg-black text-white px-3 py-1 text-sm border-2 border-black">
              LIVE ENVIRONMENT
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scenarios.map((scenario) => (
              <div 
                key={scenario.id} 
                className="flex flex-col bg-white border-4 border-black p-6 shadow-brutal hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000000] transition-all"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-black text-white text-2xl border-2 border-black">
                    {scenario.icon}
                  </div>
                  <span className="font-mono text-xs font-bold bg-white text-black border-2 border-black px-2 py-1 uppercase">
                    {scenario.tag}
                  </span>
                </div>
                
                <div className="flex-1 mb-8">
                  <h3 className="text-2xl font-black uppercase mb-3 leading-tight tracking-tight">
                    {scenario.title}
                  </h3>
                  <p className="text-base leading-relaxed font-medium">
                    {scenario.desc}
                  </p>
                </div>
                
                <button 
                  onClick={() => router.push('/scenarios')}
                  className="w-full bg-black text-white font-mono font-bold text-sm py-3 px-4 uppercase tracking-widest border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center shadow-brutal active:shadow-none active:translate-y-1 active:translate-x-1"
                >
                  <span className="text-success font-black mr-2 bg-black px-1 group-hover:bg-white">
                    {">_"}
                  </span> 
                  LAUNCH COMPONENT
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Security Briefing Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-hydrate delay-500">
          
          {/* Block A: Tactical Advice */}
          <div className="bg-white border-4 border-black p-8 shadow-brutal flex flex-col">
            <h2 className="font-mono text-xl font-bold uppercase tracking-widest mb-6 bg-black text-white inline-block px-4 py-2 self-start">
              [ BEGINNER TACTICAL ADVICE ]
            </h2>
            <ul className="font-mono text-base space-y-4 font-bold flex-1">
              <li className="flex items-start">
                <span className="text-threat mr-3">1.</span>
                <span>Always check URLs for slight misspellings before entering credentials.</span>
              </li>
              <li className="flex items-start">
                <span className="text-threat mr-3">2.</span>
                <span>Zero-Trust: Never implicitly trust a network, even an internal one.</span>
              </li>
              <li className="flex items-start">
                <span className="text-threat mr-3">3.</span>
                <span>MFA is mandatory. Weak passwords are the #1 attack vector.</span>
              </li>
              <li className="flex items-start">
                <span className="text-threat mr-3">4.</span>
                <span>Keep systems updated; patch management prevents 90% of automated exploits.</span>
              </li>
            </ul>
          </div>

          {/* Block B: Global Impact Facts */}
          <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_#00FF00] flex flex-col border-r-threat">
            <h2 className="font-mono text-xl font-bold uppercase tracking-widest mb-6 bg-black text-white inline-block px-4 py-2 self-start border-2 border-black">
              [ GLOBAL IMPACT FACTS ]
            </h2>
            <ul className="text-lg space-y-4 font-medium flex-1 list-disc pl-5 marker:text-black">
              <li>
                <strong>95% of breaches</strong> are caused by human error, demonstrating the need for comprehensive security awareness.
              </li>
              <li>
                The global average cost of a data breach in 2023 was over <strong>$4.45 million</strong>.
              </li>
              <li>
                A ransomware attack is estimated to occur every <strong>14 seconds</strong> globally.
              </li>
              <li>
                Cybersecurity isn't just an IT issue; it’s a fundamental business risk impacting critical infrastructure and personal privacy.
              </li>
            </ul>
          </div>
        </section>

      </div>
    </div>
  );
}
