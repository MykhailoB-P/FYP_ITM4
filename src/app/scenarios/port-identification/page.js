"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGamification } from "@/hooks/useGamification";

export default function PortIdentificationScenario() {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLog, setTerminalLog] = useState(["SecuOS v1.4. Type 'help' for available commands."]);
  const [isCleared, setIsCleared] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const inputRef = useRef(null);
  const logContainerRef = useRef(null);
  const router = useRouter();
  const { processScenarioClear, isSyncing } = useGamification();

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [terminalLog]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!terminalInput.trim() || isScanning || isCleared || isFailed) return;

    const rawCmd = terminalInput.trim();
    const cmd = rawCmd.replace(/\s+/g, ' '); // normalize spaces
    
    setTerminalLog((prev) => [...prev, `operator@seculab:~$ ${rawCmd}`]);
    setTerminalInput("");

    if (cmd === "help") {
      setTerminalLog((prev) => [...prev, "AVAILABLE COMMANDS: ping [ip], nmap [args] [ip], clear, help"]);
    } else if (cmd === "clear") {
      setTerminalLog([]);
    } else if (cmd === "ping 192.168.1.105") {
      setTerminalLog((prev) => [
        ...prev,
        "64 bytes from 192.168.1.105: icmp_seq=1 ttl=64 time=0.04 ms",
        "64 bytes from 192.168.1.105: icmp_seq=2 ttl=64 time=0.03 ms",
        "64 bytes from 192.168.1.105: icmp_seq=3 ttl=64 time=0.05 ms"
      ]);
    } else if (cmd.startsWith("ping")) {
      setTerminalLog((prev) => [...prev, "ping: destination host unreachable or invalid address."]);
    } else if (cmd === "nmap 192.168.1.105" || cmd === "nmap -p- 192.168.1.105") {
      setIsScanning(true);
      setTerminalLog((prev) => [...prev, "Starting Nmap... Scanning 192.168.1.105..."]);
      
      setTimeout(() => {
        setTerminalLog((prev) => [
          ...prev,
          "DISCOVERED OPEN PORTS: 22 (SSH), 80 (HTTP), 443 (HTTPS), 21 (FTP)",
          { type: "ports" }
        ]);
        setIsScanning(false);
      }, 1500);
    } else {
      setTerminalLog((prev) => [...prev, `bash: ${rawCmd}: command not found`]);
    }
  };

  const handlePortClick = (port) => {
    setTerminalLog((prev) => [...prev, `> ATTEMPTING EXPLOIT ON PORT ${port}...`]);
    if (port === 21) {
      setTimeout(() => {
        setIsCleared(true);
      }, 500);
    } else {
      setTimeout(() => {
        setIsFailed(true);
      }, 500);
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
          [ SCENARIO: PORT IDENTIFICATION ]
        </h1>

      </header>

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Left Column (Terminal) */}
        <div className="flex-1 border-2 border-black bg-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col h-[600px]">
          <div className="bg-white border-b-2 border-black px-4 py-2 flex items-center justify-between">
            <span className="font-bold uppercase tracking-widest text-sm">TERMINAL // SECULAB-OS</span>
            <div className="flex gap-2">
              <div className="w-4 h-4 border-2 border-black bg-white"></div>
              <div className="w-4 h-4 border-2 border-black bg-white"></div>
              <div className="w-4 h-4 border-2 border-black bg-white"></div>
            </div>
          </div>
          
          <div 
            ref={logContainerRef}
            className="flex-1 p-6 overflow-y-auto font-mono text-[#00FF00] text-lg space-y-2 cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {terminalLog.map((log, index) => {
              if (typeof log === 'object' && log.type === 'ports') {
                return (
                  <div key={index} className="flex flex-col sm:flex-row flex-wrap gap-4 mt-4 mb-4">
                    <button onClick={() => handlePortClick(22)} className="bg-[#00FF00] text-black border-2 border-[#00FF00] px-3 py-1 font-bold hover:bg-black hover:text-[#00FF00] transition-colors">22 (SSH)</button>
                    <button onClick={() => handlePortClick(80)} className="bg-[#00FF00] text-black border-2 border-[#00FF00] px-3 py-1 font-bold hover:bg-black hover:text-[#00FF00] transition-colors">80 (HTTP)</button>
                    <button onClick={() => handlePortClick(443)} className="bg-[#00FF00] text-black border-2 border-[#00FF00] px-3 py-1 font-bold hover:bg-black hover:text-[#00FF00] transition-colors">443 (HTTPS)</button>
                    <button onClick={() => handlePortClick(21)} className="bg-[#00FF00] text-black border-2 border-[#00FF00] px-3 py-1 font-bold hover:bg-black hover:text-[#00FF00] transition-colors">21 (FTP)</button>
                  </div>
                );
              }
              return <div key={index}>{log}</div>;
            })}
            
            {!isCleared && (
              <form onSubmit={handleCommandSubmit} className="flex items-center mt-2">
                <span className="mr-2">operator@seculab:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-[#00FF00] font-mono text-lg w-full"
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                  disabled={isScanning}
                />
              </form>
            )}
            {isScanning && <div className="mt-2 animate-pulse">_</div>}
          </div>
        </div>

        {/* Right Column (HUD) */}
        <div className="w-full lg:w-[450px] flex flex-col gap-6">
          {isFailed ? (
            <div className="border-2 border-black bg-[#FF0000] text-white p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center text-center h-full">
              <h2 className="text-4xl font-black uppercase tracking-widest mb-8">
                [ CRITICAL FAILURE ]
              </h2>
              <div className="font-mono text-xl font-bold mb-8 space-y-2">
                <p>SYSTEM GOT HACKED.</p>
                <p>DATA LEAKAGE DETECTED.</p>
              </div>
              <button
                onClick={() => {
                  setIsFailed(false);
                  setTerminalLog(["SecuOS v1.4. Type 'help' for available commands."]);
                  setTerminalInput("");
                }}
                className="w-full py-6 px-4 font-black text-xl uppercase tracking-widest bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black active:translate-x-1 active:translate-y-1 active:shadow-none transition-transform"
              >
                [ TRY AGAIN ]
              </button>
            </div>
          ) : isCleared ? (
             <div className="border-2 border-black bg-[#00FF00] p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center text-center h-full">
               <h2 className="text-4xl font-black uppercase tracking-widest mb-8">
                 [ MISSION ACCOMPLISHED ]
               </h2>
               <div className="font-mono text-xl font-bold mb-8 space-y-2">
                 <p>TARGET VULNERABILITY EXPLOITED.</p>
                 <p>UNENCRYPTED FTP ACCESS SECURED.</p>
               </div>
               <button
                 onClick={async () => {
                   await processScenarioClear('1', 100);
                   router.push("/scenarios");
                 }}
                 disabled={isSyncing}
                 className={`w-full py-6 px-4 font-black text-xl uppercase tracking-widest bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform ${
                   isSyncing 
                     ? 'opacity-70 cursor-not-allowed' 
                     : 'hover:bg-white hover:text-black active:translate-x-1 active:translate-y-1 active:shadow-none'
                 }`}
               >
                 {isSyncing ? '[ SYNCHRONIZING DATABANK... ]' : '[ CLAIM XP ]'}
               </button>
             </div>
          ) : (
            <>
              <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-black text-xl uppercase mb-4 border-b-2 border-black pb-2">TARGET INFO</h3>
                <p className="font-mono text-lg font-bold bg-gray-100 p-3 border-2 border-black inline-block break-all">TARGET IP: 192.168.1.105 (IE-Node)</p>
              </div>

              <div className="border-2 border-black bg-[#ffff00] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-black text-xl uppercase mb-4 border-b-2 border-black pb-2">OBJECTIVE</h3>
                <p className="font-bold text-lg leading-relaxed">
                  Map the perimeter. Identify and isolate the most vulnerable unencrypted port on the target.
                </p>
              </div>

              <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="w-full bg-black text-white font-bold py-4 px-6 uppercase tracking-widest border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors mb-4"
                >
                  [ ? HINT ]
                </button>

                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="w-full bg-[#FF0000] text-white font-bold py-4 px-6 uppercase tracking-widest border-2 border-transparent hover:bg-white hover:text-[#FF0000] hover:border-[#FF0000] transition-colors"
                >
                  [ ! SHOW SOLUTION ]
                </button>
                
                {showHint && (
                  <div className="mt-6 p-4 border-2 border-black bg-gray-100 font-mono text-sm leading-relaxed">
                    <strong>HINT:</strong> Before exploiting a system, you need to see what doors are open. The tool <code>nmap</code> (Network Mapper) is available in your terminal. Try scanning the target IP by typing:
                    <br/><br/>
                    <code className="bg-black text-[#00FF00] px-2 py-1">nmap IP Address</code>
                    <br/><br/>
                    Reference: THEORY -&gt; 1.2 TCP/IP & Ports
                  </div>
                )}

                {showSolution && (
                  <div className="mt-4 p-4 border-2 border-[#FF0000] bg-[#FF0000]/10 font-mono text-sm leading-relaxed text-black">
                    <strong>SOLUTION:</strong> 
                    <br/><br/>
                    1. Type exactly <code className="bg-black text-[#00FF00] px-2 py-1">nmap 192.168.1.105</code> into the terminal and press Enter.
                    <br/>
                    2. Once the scan completes, click the <code className="bg-[#00FF00] text-black px-2 py-1 border border-black font-bold">21 (FTP)</code> button that appears in the log to exploit the vulnerability.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
