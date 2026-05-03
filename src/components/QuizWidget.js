"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

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

export default function QuizWidget({ moduleId }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAlreadyCleared, setIsAlreadyCleared] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

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
          .select("cleared_modules")
          .eq("id", user.id)
          .single();

        if (data && data.cleared_modules) {
          if (data.cleared_modules.includes(baseModuleId)) {
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

  const questions = baseModuleId === "MOD_00" ? MOD_00_QUESTIONS : [];

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
            Module Cleared. +50 XP Awarded.
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
      const isPerfect = (score + (selectedAnswers[currentQuestionIndex] === currentQ.correctAnswer ? 1 : 0)) === questions.length;
      
      if (isPerfect && userId) {
        setSubmitting(true);
        try {
          // get current user row to append array and add XP
          const { data: userData } = await supabase
            .from("users")
            .select("xp_score, cleared_modules")
            .eq("id", userId)
            .single();
            
          const currentXp = userData?.xp_score || 0;
          const currentModules = userData?.cleared_modules || [];
          
          if (!currentModules.includes(baseModuleId)) {
            await supabase.from("users").update({
              xp_score: currentXp + 50,
              cleared_modules: [...currentModules, baseModuleId]
            }).eq("id", userId);
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
