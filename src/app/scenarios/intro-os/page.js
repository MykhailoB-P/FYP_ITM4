"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGamification } from "@/hooks/useGamification";
import { createClient } from "@/utils/supabase/client";

const STEPS = [
  {
    id: 0,
    instruction: "Enter 'whoami' to identify your current user.",
    expectedCmd: "whoami",
    output: "guest-operator"
  },
  {
    id: 1,
    instruction: "List the directory contents using 'ls'.",
    expectedCmd: "ls",
    output: "readme.txt   system_keys.bak"
  },
  {
    id: 2,
    instruction: "Read the backup file using 'cat system_keys.bak'.",
    expectedCmd: "cat system_keys.bak",
    output: "ACCESS GRANTED. INITIALIZATION COMPLETE."
  }
];

export default function IntroOsScenario() {
  const [step, setStep] = useState(0);
  const [terminalInput, setTerminalInput] = useState("");
  const [logs, setLogs] = useState([
    { type: "system", content: "Secu-OS Terminal Environment Initialization..." },
    { type: "system", content: "Establishing connection to local host..." },
    { type: "system", content: "Connected." }
  ]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasClaimedXp, setHasClaimedXp] = useState(false);
  const [username, setUsername] = useState("guest-operator");
  
  const terminalBottomRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();
  const { processScenarioClear, isSyncing } = useGamification();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("users")
          .select("username")
          .eq("id", user.id)
          .single();
        if (data && data.username) {
          setUsername(data.username);
        }
      }
    };
    fetchUser();
  }, [supabase]);

  // Keep terminal scrolled to bottom
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Focus terminal input on load or when clicking the terminal area
  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };
  
  useEffect(() => {
    focusInput();
  }, []);

  const handleCommandSubmit = async (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim();
    const currentStepConfig = STEPS[step];
    
    // Echo the command
    const newLogs = [...logs, { type: "input", content: `guest@seculab:~$ ${cmd}` }];
    
    let outputLog = null;
    let nextStep = step;
    let scenarioCompleted = false;

    if (cmd === currentStepConfig.expectedCmd) {
      // Correct command for current step
      outputLog = { type: "output", content: cmd === "whoami" ? username : currentStepConfig.output };
      
      if (step < STEPS.length - 1) {
        nextStep = step + 1;
      } else {
        // Scenario Finished!
        scenarioCompleted = true;
      }
    } else {
      // Basic fallback for other standard commands or errors
      if (cmd === "whoami") {
        outputLog = { type: "output", content: username };
      } else if (cmd === "ls") {
        outputLog = { type: "output", content: "readme.txt   system_keys.bak" };
      } else if (cmd === "clear") {
        setLogs([]);
        setTerminalInput("");
        return; // Early return for clear
      } else {
        outputLog = { type: "error", content: `bash: ${cmd}: command not found` };
      }
    }

    if (outputLog) {
      newLogs.push(outputLog);
    }
    
    setLogs(newLogs);
    setTerminalInput("");
    setStep(nextStep);

    if (scenarioCompleted) {
      setTimeout(() => {
        setIsSuccess(true);
      }, 500);
    }
  };

  const handleClaimXp = async () => {
    await processScenarioClear("beg-1", 50);
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
          [ SCENARIO: NAVIGATING SECU-OS ]
        </h1>
      </header>

      {/* SUCCESS OVERLAY */}
      {(isSuccess && hasClaimedXp) && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
          <div className="bg-[#00FF00] border-4 border-black p-8 md:p-12 max-w-2xl w-full shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in duration-300">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-6 border-b-4 border-black pb-4 text-center">
              [ MODULE CLEARED ]
            </h2>
            <div className="font-mono text-xl font-bold mb-8 space-y-4 text-center bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p>Basic navigation protocols established.</p>
              <p>Secu-OS terminal access verified.</p>
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
              [ SIMULATION COMPLETE ]
            </h2>
            <p className="font-mono text-lg mb-8 text-center font-bold">
              You have successfully completed the Secu-OS navigation training. 
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
        
        {/* LEFT COLUMN: SYSTEM BRIEFING */}
        <div className="flex-1 lg:max-w-md border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
          <div className="bg-black text-white p-4 border-b-4 border-black">
            <h2 className="font-black text-2xl uppercase">SYSTEM BRIEFING</h2>
          </div>
          
          <div className="p-6 flex-1 flex flex-col gap-6">
            <p className="font-mono font-bold text-lg mb-2">
              Follow the instructions to familiarize yourself with the Secu-OS environment.
            </p>
            
            <div className="flex flex-col gap-4">
              {STEPS.map((s, idx) => {
                const isActive = step === idx;
                const isCompleted = step > idx || isSuccess;
                
                return (
                  <div 
                    key={s.id} 
                    className={`p-4 border-2 transition-all ${
                      isActive 
                        ? "border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#FFFF00]/10" 
                        : isCompleted 
                          ? "border-[#00FF00] bg-[#00FF00]/10 opacity-70"
                          : "border-gray-300 bg-gray-50 opacity-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 border-2 flex items-center justify-center font-bold shrink-0 ${
                        isCompleted ? "border-[#00FF00] text-[#00FF00] bg-black" : "border-black text-black bg-white"
                      }`}>
                        {isCompleted ? "✓" : s.id + 1}
                      </div>
                      <div className={`font-mono text-base ${isActive ? "font-bold text-black" : isCompleted ? "text-black line-through decoration-2" : "text-gray-500"}`}>
                        {s.instruction}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 p-4 border-2 border-black bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-black text-lg mb-2 uppercase border-b-2 border-black pb-1">COMMAND REFERENCE</h3>
              <ul className="font-mono text-sm space-y-3">
                <li><span className="font-bold bg-black text-white px-1">whoami</span> : Returns the name of the currently logged-in user.</li>
                <li><span className="font-bold bg-black text-white px-1">ls</span> : Lists files and directories in the current location.</li>
                <li><span className="font-bold bg-black text-white px-1">cat [file]</span> : Reads and outputs the contents of a specified file.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SECULAB TERMINAL */}
        <div 
          className="flex-1 border-4 border-black bg-black text-[#00FF00] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col min-h-[500px]"
          onClick={focusInput}
        >
          <div className="bg-white border-b-4 border-black px-4 py-2 flex items-center justify-between">
            <div className="font-black uppercase text-black">SECULAB TERMINAL</div>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-black rounded-full"></div>
              <div className="w-3 h-3 bg-black rounded-full"></div>
            </div>
          </div>
          
          <div className="flex-1 p-6 font-mono text-sm md:text-base overflow-y-auto cursor-text">
            {logs.map((log, i) => (
              <div key={i} className="mb-2">
                {log.type === "system" && <div className="text-gray-400 opacity-80">{log.content}</div>}
                {log.type === "input" && <div className="text-white font-bold">{log.content}</div>}
                {log.type === "output" && <div>{log.content}</div>}
                {log.type === "error" && <div className="text-[#FF0000]">{log.content}</div>}
              </div>
            ))}
            
            {/* Active Input Line */}
            {!isSuccess && (
              <form onSubmit={handleCommandSubmit} className="flex items-center mt-2">
                <span className="text-white font-bold mr-2 whitespace-nowrap">guest@seculab:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="flex-1 bg-transparent text-[#00FF00] outline-none caret-white"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
              </form>
            )}
            
            <div ref={terminalBottomRef} />
          </div>
        </div>

      </div>
    </div>
  );
}
