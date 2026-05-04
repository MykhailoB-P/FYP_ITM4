"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGamification } from "@/hooks/useGamification";

const DICTIONARY = [
  "password123",
  "admin",
  "qwerty",
  "12345678",
  "letmein",
  "cork2024",
  "cork_admin26", // Correct password (7th item, index 6)
  "winter2024",
  "P@ssw0rd",
  "mtu_admin"
];

const CORRECT_PASSWORD = "cork_admin26";

export default function BruteForceUiScenario() {
  const [attackLogs, setAttackLogs] = useState([]);
  const [isAttacking, setIsAttacking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentPasswordIndex, setCurrentPasswordIndex] = useState(-1);
  const [dictionaryLoaded, setDictionaryLoaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showErrorWindow, setShowErrorWindow] = useState(false);
  const [activeGibberish, setActiveGibberish] = useState("");
  const [attackFinished, setAttackFinished] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [hasClaimedXp, setHasClaimedXp] = useState(false);
  
  const { processScenarioClear, isSyncing } = useGamification();
  const logContainerRef = useRef(null);
  const attackIntervalRef = useRef(null);
  const router = useRouter();

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [attackLogs]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (attackIntervalRef.current) clearInterval(attackIntervalRef.current);
    };
  }, []);

  const handleLoadDictionary = (type) => {
    setDictionaryLoaded(true);
    setSelectedFile(type);
    const fileName = type === 'rockyou' ? 'rockyou_lite.txt' : 'encrypted_payload.bin';
    setAttackLogs(prev => [...prev, { status: "INFO", payload: `${fileName} LOADED`, length: "-", color: "text-white" }]);
  };

  const generateRandomGibberish = () => {
    const chars = "@#$%^&*()_+!{}[]|\\\\:;\\\"'<>,.?/";
    let res = "";
    for(let i=0; i<8; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    return res;
  };

  const handleLaunchAttack = () => {
    if (!dictionaryLoaded || isAttacking || isSuccess) return;

    setIsAttacking(true);
    setCurrentPasswordIndex(0);
    setAttackLogs(prev => [...prev, { status: "START", payload: "INITIATING BRUTE FORCE...", length: "-", color: "text-white" }]);

    let currentIndex = 0;
    const isCorrupted = selectedFile === 'corrupted';

    // Slower interval so user can see it
    attackIntervalRef.current = setInterval(() => {
      const maxLimit = isCorrupted ? 5 : DICTIONARY.length;
      
      if (currentIndex >= maxLimit) {
        clearInterval(attackIntervalRef.current);
        setIsAttacking(false);
        if (isCorrupted) {
          setShowErrorWindow(true);
        } else {
          setAttackFinished(true);
          setAttackLogs(prev => [...prev, { status: "INFO", payload: "DICTIONARY EXHAUSTED. ATTACK COMPLETE.", length: "-", color: "text-gray-400" }]);
        }
        return;
      }

      if (isCorrupted) {
        const gibberish = generateRandomGibberish();
        setActiveGibberish(gibberish);
        setAttackLogs(prev => [...prev, { status: "500 ERR", payload: `admin : ${gibberish}`, length: "0", color: "text-[#FF0000]" }]);
      } else {
        const currentPass = DICTIONARY[currentIndex];
        setCurrentPasswordIndex(currentIndex);

        if (currentPass === CORRECT_PASSWORD) {
          setAttackLogs(prev => [...prev, { status: "200 OK", payload: `admin : ${currentPass}`, length: "1024", color: "text-gray-300" }]);
        } else {
          setAttackLogs(prev => [...prev, { status: "401 UNAUTH", payload: `admin : ${currentPass}`, length: "240", color: "text-gray-500" }]);
        }
      }

      currentIndex++;
    }, 1200); // 1.2 seconds per tick
  };

  const handleClaimXp = async () => {
    if (passwordInput === CORRECT_PASSWORD) {
      await processScenarioClear("3", 150); // Assuming ID 3 for Brute Force
      setHasClaimedXp(true);
      setIsSuccess(true);
    } else {
      setAttackLogs(prev => [...prev, { status: "ERROR", payload: "INCORRECT PAYLOAD VERIFICATION", length: "-", color: "text-white bg-[#FF0000]" }]);
      setPasswordInput("");
    }
  };

  const activePassword = selectedFile === 'corrupted' ? activeGibberish : (currentPasswordIndex >= 0 ? DICTIONARY[currentPasswordIndex] : "");

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
          [ SCENARIO: UI BRUTE FORCER ]
        </h1>
      </header>

      {/* ERROR OVERLAY */}
      {showErrorWindow && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
          <div className="bg-[#FF0000] border-4 border-black p-8 md:p-12 max-w-2xl w-full shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in duration-300">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-6 border-b-4 border-black pb-4 text-center text-white">
              [ CRITICAL FAULT ]
            </h2>
            <div className="font-mono text-xl font-bold mb-8 space-y-4 text-center bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p>PAYLOAD ENCODING MISMATCH.</p>
              <p>The selected file contains binary/encrypted data instead of plaintext credentials.</p>
              <p className="mt-4 text-sm opacity-70 text-[#FF0000]">Intruder tool crashed during execution.</p>
            </div>
            
            <button
              onClick={() => {
                setShowErrorWindow(false);
                setDictionaryLoaded(false);
                setSelectedFile(null);
                setAttackLogs([]);
                setCurrentPasswordIndex(-1);
                setActiveGibberish("");
              }}
              className="w-full bg-black text-white font-black text-2xl py-6 px-4 uppercase tracking-widest border-4 border-black hover:bg-white hover:text-black transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none"
            >
              [ REBOOT INTRUDER ]
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS OVERLAY */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
          <div className="bg-[#00FF00] border-4 border-black p-8 md:p-12 max-w-2xl w-full shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in duration-300">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-6 border-b-4 border-black pb-4 text-center">
              [ SYSTEM COMPROMISED ]
            </h2>
            <div className="font-mono text-xl font-bold mb-8 space-y-4 text-center bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p>Dictionary attack successful.</p>
              <p>Authentication bypassed.</p>
              <p className="mt-4 text-sm opacity-70">TARGET: portal.cork-datacenter.ie</p>
              <p className="text-sm opacity-70">CREDENTIALS: admin / {CORRECT_PASSWORD}</p>
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

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto items-stretch">
        
        {/* LEFT COLUMN: THE TARGET */}
        <div className="flex-1 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col min-h-[600px]">
          {/* Fake Browser Header */}
          <div className="bg-black text-white p-3 flex items-center gap-3 border-b-4 border-black">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div className="flex-1 bg-white text-black font-mono text-sm px-3 py-1 ml-4 border-2 border-black flex items-center">
              <span className="text-gray-400 mr-2">🔒</span> https://portal.cork-datacenter.ie/login
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 relative">
            {/* Login Form UI */}
            {!hasClaimedXp ? (
              <div className="bg-white border-2 border-black w-full max-w-md p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-center mb-8 border-b-2 border-black pb-4">
                  <h2 className="text-2xl font-black uppercase tracking-wider">EMPLOYEE PORTAL</h2>
                  <p className="font-mono text-xs text-gray-500 mt-1">MTU CORK DATACENTER</p>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  <div>
                    <label className="block font-mono font-bold uppercase text-sm mb-2">Username</label>
                    <input 
                      type="text" 
                      readOnly 
                      value="admin"
                      className="w-full p-3 font-mono border-2 border-black bg-gray-100 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono font-bold uppercase text-sm mb-2 flex justify-between">
                      Password
                      {isAttacking && <span className="text-[#FF0000] animate-pulse font-black text-xs">INTRUDER ACTIVE</span>}
                    </label>
                    <input 
                      type={isAttacking ? "text" : "password"} 
                      readOnly 
                      value={activePassword}
                      placeholder={!isAttacking ? "********" : ""}
                      className={`w-full p-3 font-mono border-2 border-black outline-none transition-colors ${isAttacking ? 'bg-[#FFFF00]/20 text-[#FF0000] font-black' : 'bg-white'}`}
                    />
                  </div>
                  <button 
                    disabled
                    className={`w-full py-4 font-black uppercase tracking-widest border-2 border-black transition-colors ${isAttacking ? 'bg-[#FFFF00] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-black text-white opacity-50 cursor-not-allowed'}`}
                  >
                    {isAttacking ? "AUTHENTICATING..." : "LOGIN"}
                  </button>
                </form>
              </div>
            ) : (
              /* Success Target UI */
              <div className="bg-[#00FF00] border-4 border-black w-full max-w-lg p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-black text-[#00FF00] border-4 border-black flex items-center justify-center text-4xl mb-6">
                  ✓
                </div>
                <h2 className="text-3xl font-black uppercase tracking-wider mb-2">ADMIN DASHBOARD</h2>
                <div className="font-mono font-bold text-black border-t-4 border-black pt-4 w-full mt-4">
                  ACCESS GRANTED. WELCOME SYSTEM ADMINISTRATOR.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: ATTACK SUITE */}
        <div className="flex-1 lg:max-w-md flex flex-col gap-6">
          <div className="border-4 border-black bg-black text-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-black text-xl uppercase border-b-2 border-white pb-2 flex items-center justify-between">
              ATTACK SUITE (INTRUDER)
              <span className="text-[#00FF00] text-sm font-mono animate-pulse">● LIVE</span>
            </h3>
            
            <div className="mt-4 flex flex-col gap-3">
              {!dictionaryLoaded ? (
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleLoadDictionary('corrupted')}
                    className="flex-1 bg-white text-black font-bold font-mono py-2 px-2 uppercase border-2 border-black hover:bg-gray-200 transition-colors text-xs"
                  >
                    [ LOAD encrypted_payload.bin ]
                  </button>
                  <button 
                    onClick={() => handleLoadDictionary('rockyou')}
                    className="flex-1 bg-white text-black font-bold font-mono py-2 px-2 uppercase border-2 border-black hover:bg-gray-200 transition-colors text-xs"
                  >
                    [ LOAD rockyou_lite.txt ]
                  </button>
                </div>
              ) : (
                <button 
                  disabled
                  className="w-full bg-black text-white font-bold font-mono py-3 px-4 uppercase border-2 border-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  [ {selectedFile === 'rockyou' ? 'rockyou_lite.txt' : 'encrypted_payload.bin'} LOADED ]
                </button>
              )}
              
              <button 
                onClick={handleLaunchAttack}
                disabled={!dictionaryLoaded || isAttacking || isSuccess}
                className={`w-full font-black text-lg py-4 px-4 uppercase border-2 border-transparent transition-all ${
                  isAttacking || isSuccess || !dictionaryLoaded
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-[#FF0000] text-white hover:bg-white hover:text-[#FF0000] hover:border-[#FF0000] shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none'
                }`}
              >
                [ LAUNCH ATTACK ]
              </button>
            </div>

            {attackFinished && !hasClaimedXp && (
              <div className="mt-6 border-t-4 border-dashed border-gray-600 pt-6 animate-in fade-in duration-500">
                <p className="font-mono text-sm mb-3 text-white font-bold">[?] ANALYSIS REQUIRED</p>
                <p className="font-mono text-xs mb-3 text-gray-400">Review the logs. If a valid authentication bypass occurred, extract the payload and submit it below.</p>
                <input 
                  type="text" 
                  placeholder="Enter compromised password..." 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  disabled={isSyncing}
                  className="w-full p-3 mb-3 font-mono border-2 border-[#00FF00] bg-black text-white outline-none focus:bg-[#00FF00]/10"
                />
                <button 
                  onClick={handleClaimXp}
                  disabled={isSyncing || !passwordInput}
                  className="w-full bg-[#00FF00] text-black font-black py-4 border-2 border-[#00FF00] hover:bg-white hover:border-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                >
                  {isSyncing ? "SYNCHRONIZING..." : "[ VERIFY & CLAIM 150 XP ]"}
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 border-4 border-black bg-white flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[300px]">
            <div className="bg-gray-200 border-b-4 border-black px-4 py-2 font-black uppercase text-sm flex">
              <div className="w-24">STATUS</div>
              <div className="flex-1 border-l-2 border-black pl-3">PAYLOAD</div>
              <div className="w-16 border-l-2 border-black pl-3 text-right">LEN</div>
            </div>
            
            <div 
              ref={logContainerRef}
              className="flex-1 p-2 overflow-y-auto font-mono text-sm bg-black"
            >
              {attackLogs.length === 0 && (
                <div className="text-gray-500 p-4 text-center italic">Waiting for configuration...</div>
              )}
              {attackLogs.map((log, idx) => (
                <div key={idx} className={`flex py-1 px-2 mb-1 ${log.color || "text-white"}`}>
                  <div className="w-24 font-bold">{log.status}</div>
                  <div className="flex-1 truncate px-2">{log.payload}</div>
                  <div className="w-16 text-right">{log.length}</div>
                </div>
              ))}
              {isAttacking && (
                <div className="flex py-1 px-2 text-[#FFFF00] animate-pulse">
                  <div className="w-24 font-bold">...</div>
                  <div className="flex-1 px-2">Injecting payload...</div>
                  <div className="w-16 text-right">-</div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
