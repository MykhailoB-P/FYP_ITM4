"use client";

import { useState } from "react";
import Link from "next/link";

const beginningScenarios = [
  {
    id: "beg-1",
    tag: "[FUNDAMENTALS]",
    title: "INTRO: NAVIGATING SECU-OS",
    description: "Learn the basic commands and navigation techniques used within the SecuLab environment.",
    icon: "🖥️",
    xp: 50
  },
  {
    id: "beg-2",
    tag: "[RECON]",
    title: "OSINT: PUBLIC FOOTPRINT",
    description: "Gather publicly available information about a target organization using passive reconnaissance tools.",
    icon: "👁️",
    xp: 50
  },
  {
    id: "beg-3",
    tag: "[ANALYSIS]",
    title: "PHISHING: EMAIL ANALYSIS",
    description: "Inspect email headers and content to identify indicators of a phishing attempt.",
    icon: "🎣",
    xp: 50
  }
];

const intermediateScenarios = [
  {
    id: "1",
    tag: "[RECON]",
    title: "NET: PORT IDENTIFICATION",
    description: "Map target infrastructure by discovering open ports and identifying running services. A crucial first step in footprinting.",
    icon: "🔍",
    xp: 100,
    path: "/scenarios/port-identification"
  },
  {
    id: "2",
    tag: "[WEB]",
    title: "APP: SQL INJECTION",
    description: "Exploit improper input validation to manipulate backend database queries and extract confidential data.",
    icon: "💉",
    xp: 100,
    path: "/scenarios/sql-injection"
  },
  {
    id: "3",
    tag: "[AUTH]",
    title: "SYS: BRUTE FORCE",
    description: "Attempt multiple password combinations against an authentication endpoint to gain unauthorized access.",
    icon: "🔓",
    xp: 150
  },
  {
    id: "4",
    tag: "[WEB]",
    title: "APP: CROSS-SITE SCRIPTING",
    description: "Inject malicious scripts into benign and trusted websites to execute payload on the victims' browsers.",
    icon: "🕷️",
    xp: 150
  },
  {
    id: "5",
    tag: "[SYS]",
    title: "OS: PRIVILEGE ESCALATION",
    description: "Exploit a bug or design flaw to gain elevated access to resources that are normally protected.",
    icon: "🧗",
    xp: 200
  },
  {
    id: "6",
    tag: "[NET]",
    title: "NET: TRAFFIC ANALYSIS",
    description: "Capture and analyze network packets to identify suspicious anomalies, rogue devices, or unencrypted secrets.",
    icon: "🕸️",
    xp: 200
  }
];

const advancedScenarios = [];

export default function ScenariosPage() {
  const [activeTab, setActiveTab] = useState("Intermediate");


  const tabs = ["Beginning", "Intermediate", "Advanced"];

  let activeScenarios = [];
  if (activeTab === "Beginning") activeScenarios = beginningScenarios;
  if (activeTab === "Intermediate") activeScenarios = intermediateScenarios;
  if (activeTab === "Advanced") activeScenarios = advancedScenarios;

  return (
    <div className="flex-1 p-8 md:p-16 max-w-7xl mx-auto w-full min-h-screen">
      <div className="flex items-center justify-between mb-8 border-b-4 border-black pb-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Active Scenarios</h1>
          <p className="font-mono text-lg mt-2 font-bold opacity-80">SELECT_TARGET_FOR_SIMULATION()</p>
        </div>
        <div className="hidden md:flex font-mono bg-black text-white px-4 py-2 border-2 border-black uppercase font-bold text-sm">
          STATUS: LOCAL
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="flex mb-8 border-b-4 border-black gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-black uppercase text-xl px-8 py-4 border-t-4 border-l-4 border-r-4 border-black transition-colors whitespace-nowrap ${
              activeTab === tab 
                ? "bg-black text-white shadow-[4px_0px_0px_#000000]" 
                : "bg-white text-gray-500 hover:text-black hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeScenarios.length === 0 ? (
        <div className="border-4 border-black bg-gray-100 p-16 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl font-black uppercase mb-4 text-gray-500">[ FOLDER EMPTY ]</h2>
          <p className="font-mono text-xl text-gray-500">Modules for this difficulty level are currently under construction.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeScenarios.map((scenario) => {
            return (
              <div 
                key={scenario.id} 
                className="flex flex-col border-2 border-black p-6 transition-transform duration-200 bg-white shadow-brutal hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000000]"
              >
                {/* Top row: Icon and Tag */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 flex items-center justify-center text-2xl border-2 border-black bg-black text-white">
                    {scenario.icon}
                  </div>
                  <div className="flex gap-2">
                    <span className="font-mono text-sm font-bold bg-[#00FF00] text-black border-2 border-black px-2 py-1 uppercase shadow-[2px_2px_0px_#000000]">
                      +{scenario.xp} XP
                    </span>
                    <span className="font-mono text-sm font-bold bg-white text-black border-2 border-black px-2 py-1 uppercase shadow-[2px_2px_0px_#000000]">
                      {scenario.tag}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="flex-1 mb-8">
                  <h2 className="text-2xl font-black uppercase mb-3 leading-tight tracking-tight">
                    {scenario.title}
                  </h2>
                  <p className="text-base leading-relaxed font-medium">
                    {scenario.description}
                  </p>
                </div>

                {/* Terminal Button */}
                {scenario.path ? (
                  <Link href={scenario.path} className="w-full">
                    <button className="w-full font-mono font-bold text-sm py-3 px-4 uppercase tracking-widest border-2 border-black transition-colors text-left flex items-center bg-black text-white hover:bg-success hover:text-black">
                      <span className="text-success font-black mr-2 hover:text-black">{">_"}</span> 
                      LAUNCH SIMULATION
                    </button>
                  </Link>
                ) : (
                  <button className="w-full font-mono font-bold text-sm py-3 px-4 uppercase tracking-widest border-2 border-black transition-colors text-left flex items-center bg-black text-white hover:bg-success hover:text-black">
                    <span className="text-success font-black mr-2 hover:text-black">{">_"}</span> 
                    LAUNCH SIMULATION
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
