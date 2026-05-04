"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

const MOD_00_QUESTIONS = [
  {
    question: "What is the primary function of DNS?",
    options: [
      "To encrypt web traffic",
      "To translate domain names to IP addresses",
      "To block malicious packets",
      "To route emails"
    ],
    correctAnswer: 1, // index 1
  },
  {
    question: "Which element of the CIA Triad ensures data has not been tampered with?",
    options: [
      "Confidentiality",
      "Integrity",
      "Availability",
      "Authentication"
    ],
    correctAnswer: 1,
  },
  {
    question: "Why is relying solely on passwords considered a security failure?",
    options: [
      "They are too hard to remember",
      "They require too much database storage",
      "They are vulnerable to breaches and lack secondary verification (MFA)",
      "They slow down the network"
    ],
    correctAnswer: 2,
  }
];

const MOD_01_QUESTIONS = [
  {
    question: "Which OSI layer is responsible for logical addressing (e.g., IP Addresses)?",
    options: ["Layer 2 - Data Link", "Layer 3 - Network", "Layer 4 - Transport", "Layer 7 - Application"],
    correctAnswer: 1,
  },
  {
    question: "What port does HTTPS operate on?",
    options: ["80", "22", "443", "53"],
    correctAnswer: 2,
  },
  {
    question: "Which protocol translates Layer 3 IP addresses into Layer 2 MAC addresses?",
    options: ["DNS", "DHCP", "ARP", "TCP"],
    correctAnswer: 2,
  }
];

const MOD_02_QUESTIONS = [
  {
    question: "What psychological trigger is commonly exploited in phishing by impersonating a CEO?",
    options: ["Curiosity", "Authority", "Fear", "Greed"],
    correctAnswer: 1,
  },
  {
    question: "What is Typosquatting?",
    options: ["Injecting SQL into a login field", "Registering domains that look visually identical to legitimate ones", "Sending millions of ping requests", "Guessing passwords using a dictionary"],
    correctAnswer: 1,
  },
  {
    question: "Which email header reveals the actual IP addresses of the mail servers that relayed the message?",
    options: ["From", "Return-Path", "Received", "Subject"],
    correctAnswer: 2,
  }
];

const MOD_03_QUESTIONS = [
  {
    question: "What is the primary difference between DoS and DDoS?",
    options: ["DoS uses TCP, DDoS uses UDP", "DDoS uses multiple compromised systems (botnet), DoS uses one", "DoS is for websites, DDoS is for networks", "There is no difference"],
    correctAnswer: 1,
  },
  {
    question: "What is the correct sequence for a TCP 3-Way Handshake?",
    options: ["SYN, ACK, SYN-ACK", "ACK, SYN, SYN-ACK", "SYN, SYN-ACK, ACK", "SYN-ACK, SYN, ACK"],
    correctAnswer: 2,
  },
  {
    question: "How can a server mitigate a SYN Flood attack?",
    options: ["By using SYN Cookies", "By blocking all incoming traffic", "By disabling the firewall", "By using a weaker encryption key"],
    correctAnswer: 0,
  }
];

const MOD_04_QUESTIONS = [
  {
    question: "What is the primary difference between hashing and encryption?",
    options: ["Hashing is for files, encryption is for text", "Hashing is a one-way function, encryption is two-way", "Encryption is faster than hashing", "Hashing uses two keys, encryption uses one"],
    correctAnswer: 1,
  },
  {
    question: "What is the purpose of adding a 'Salt' to a password before hashing?",
    options: ["To make it taste better", "To make it easier to decrypt", "To ensure identical passwords have different hashes, defeating Rainbow Tables", "To compress the password size"],
    correctAnswer: 2,
  }
];

const MOD_05_QUESTIONS = [
  {
    question: "What does SQL Injection (SQLi) exploit?",
    options: ["Weak WiFi passwords", "Improper input validation in database queries", "Unencrypted network traffic", "Outdated antivirus software"],
    correctAnswer: 1,
  },
  {
    question: "What is Cross-Site Scripting (XSS)?",
    options: ["Injecting malicious client-side JavaScript into web pages", "Stealing a database file via FTP", "Guessing admin passwords", "Sending too many requests to crash a server"],
    correctAnswer: 0,
  }
];

export default function QuizWidget({ moduleId }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAlreadyCleared, setIsAlreadyCleared] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState(null);

  const supabase = createClient();

  const baseModuleId = moduleId.replace('_QUIZ', '');

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }
        setUserId(user.id);

        const { data, error } = await supabase
          .from("users")
          .select("completed_modules")
          .eq("id", user.id)
          .single();

        if (data && data.completed_modules) {
          if (data.completed_modules.includes(baseModuleId)) {
            setIsAlreadyCleared(true);
          }
        }
      } catch (err) {
        console.error("Error fetching user status:", err);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [baseModuleId, supabase]);

  let questions = [];
  if (baseModuleId === "MOD_00") questions = MOD_00_QUESTIONS;
  else if (baseModuleId === "MOD_01") questions = MOD_01_QUESTIONS;
  else if (baseModuleId === "MOD_02") questions = MOD_02_QUESTIONS;
  else if (baseModuleId === "MOD_03") questions = MOD_03_QUESTIONS;
  else if (baseModuleId === "MOD_04") questions = MOD_04_QUESTIONS;
  else if (baseModuleId === "MOD_05") questions = MOD_05_QUESTIONS;

  if (loading) {
    return (
      <div className="mt-12 p-8 border-4 border-black bg-white shadow-[8px_8px_0px_#000000] text-center font-mono animate-pulse">
        [ INITIATING KNOWLEDGE CHECK... ]
      </div>
    );
  }

  if (questions.length === 0) {
    return null; // No quiz for this module yet
  }

  if (isAlreadyCleared) {
    return (
      <div className="mt-12 p-8 border-4 border-black bg-success text-black shadow-[8px_8px_0px_#000000] text-center">
        <h2 className="text-3xl font-black uppercase tracking-tighter">[ OPERATOR CERTIFIED: MODULE {baseModuleId.replace('MOD_', '')} CLEARED ]</h2>
      </div>
    );
  }

  if (isCompleted) {
    const percentage = (score / questions.length) * 100;
    const isPerfect = percentage === 100;

    return (
      <div className="mt-12 p-8 border-4 border-black bg-white shadow-[8px_8px_0px_#000000] text-center">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">
          [ TACTICAL ASSESSMENT COMPLETE ]
        </h2>
        <p className="font-mono text-xl mb-6">
          SCORE: {score} / {questions.length} ({percentage}%)
        </p>
        
        {isPerfect ? (
          <p className="text-success font-bold text-xl uppercase animate-pulse mb-6">
            Module Cleared. +25 XP Awarded.
          </p>
        ) : (
          <div className="mb-6">
            <p className="text-red-600 font-bold text-xl uppercase mb-4">
              Failure. 100% Mastery Required.
            </p>
            <button 
              onClick={() => {
                setCurrentQuestionIndex(0);
                setSelectedAnswers({});
                setScore(0);
                setIsCompleted(false);
              }}
              className="bg-black text-white px-6 py-3 font-bold uppercase tracking-wider border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors"
            >
              [ RE-INITIALIZE SIMULATION ]
            </button>
          </div>
        )}
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];
  const hasAnsweredCurrent = selectedAnswers[currentQuestionIndex] !== undefined;

  const handleSelectAnswer = (index) => {
    if (hasAnsweredCurrent) return;

    const isCorrect = index === currentQ.correctAnswer;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: index
    }));

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Finished
      setIsCompleted(true);
      
      const computedScore = questions.reduce((total, q, idx) => {
        return total + (selectedAnswers[idx] === q.correctAnswer ? 1 : 0);
      }, 0);
      setScore(computedScore);
      
      const isPerfect = computedScore === questions.length;
      
      if (isPerfect && userId) {
        setSubmitting(true);
        try {
          // get current user row to append array and add XP
          const { data: userData } = await supabase
            .from("users")
            .select("xp_score, completed_modules")
            .eq("id", userId)
            .single();
            
          const currentXp = userData?.xp_score || 0;
          const currentModules = userData?.completed_modules || [];
          
          if (!currentModules.includes(baseModuleId)) {
            await supabase.from("users").update({
              xp_score: currentXp + 25,
              completed_modules: [...currentModules, baseModuleId]
            }).eq("id", userId);
            
            // Dispatch event so Navbar updates instantly
            window.dispatchEvent(new Event('gamification-update'));
          }
        } catch (err) {
          console.error("Failed to update XP:", err);
        } finally {
          setSubmitting(false);
        }
      }
    }
  };

  return (
    <div className="mt-4 p-6 md:p-8 border-2 border-black bg-white shadow-[4px_4px_0px_#000000]">
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-black font-mono font-bold">
        <span>KNOWLEDGE CHECK: {baseModuleId}</span>
        <span>QUESTION {currentQuestionIndex + 1} / {questions.length}</span>
      </div>

      <h3 className="text-2xl md:text-3xl font-black uppercase mb-8 leading-tight">
        {currentQ.question}
      </h3>

      <div className="space-y-4 mb-8">
        {currentQ.options.map((option, idx) => {
          const isSelected = selectedAnswers[currentQuestionIndex] === idx;
          const isCorrectAnswer = idx === currentQ.correctAnswer;
          
          let btnClass = "w-full text-left p-4 border-2 border-black bg-transparent font-medium md:text-lg transition-colors duration-200 outline-none";
          
          if (hasAnsweredCurrent) {
            if (isCorrectAnswer) {
              btnClass = "w-full text-left p-4 border-2 border-black bg-success text-black font-bold uppercase transition-colors outline-none";
            } else if (isSelected && !isCorrectAnswer) {
              btnClass = "w-full text-left p-4 border-2 border-transparent bg-red-600 text-white font-bold uppercase transition-colors outline-none";
            } else {
              btnClass = "w-full text-left p-4 border-2 border-gray-300 bg-gray-50 text-gray-400 font-medium transition-colors outline-none opacity-50 cursor-not-allowed";
            }
          } else {
            btnClass += " hover:bg-black hover:text-white cursor-pointer";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectAnswer(idx)}
              disabled={hasAnsweredCurrent}
              className={btnClass}
            >
              {option}
            </button>
          );
        })}
      </div>

      {hasAnsweredCurrent && (
        <div className="flex justify-end pt-4 border-t-2 border-black">
          <button 
            onClick={handleNext}
            disabled={submitting}
            className="bg-black text-white font-bold uppercase tracking-widest px-8 py-4 hover:bg-white hover:text-black border-2 border-transparent hover:border-black transition-colors flex items-center gap-2"
          >
            {submitting ? "[ UPLOADING CLEARANCE... ]" : (currentQuestionIndex === questions.length - 1 ? "[ SUBMIT RESULTS ]" : "[ NEXT QUESTION ]")}
          </button>
        </div>
      )}
    </div>
  );
}
