"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const supabase = createClient();
  const [operatorName, setOperatorName] = useState("UNKNOWN");
  const [xpScore, setXpScore] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("username, xp_score")
          .eq("id", user.id)
          .single();
        
        if (data && !error) {
          setOperatorName(data.username);
          setXpScore(data.xp_score);
        }
      } else {
        setOperatorName("UNKNOWN");
        setXpScore(0);
      }
    };
    
    fetchUserData();

    // Listen for custom events to update state instantly
    const handleUpdate = () => {
      fetchUserData();
    };
    window.addEventListener('gamification-update', handleUpdate);
    window.addEventListener('auth-change', handleUpdate);

    return () => {
      window.removeEventListener('gamification-update', handleUpdate);
      window.removeEventListener('auth-change', handleUpdate);
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.dispatchEvent(new Event('auth-change'));
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-black flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-8">
        {/* LOGO */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black flex items-center justify-center border-2 border-black">
            {/* Simple Shield Icon (SVG) */}
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4zm0 18.06c-3.95-1.12-6.84-5.35-7.5-9.66h7.5V4.26l7.5 3.34V10.4h-7.5v9.66z" />
            </svg>
          </div>
          <span className="font-bold text-xl tracking-wider uppercase">
            SecuLab
          </span>
        </Link>

        {/* LINKS */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="font-mono text-sm font-bold hover:bg-black hover:text-white px-2 py-1 transition-colors border-2 border-transparent hover:border-black uppercase"
          >
            [ Home ]
          </Link>
          <Link
            href="/scenarios"
            className="font-mono text-sm font-bold hover:bg-black hover:text-white px-2 py-1 transition-colors border-2 border-transparent hover:border-black uppercase"
          >
            [ Scenarios ]
          </Link>
          <Link
            href="/theory"
            className="font-mono text-sm font-bold hover:bg-black hover:text-white px-2 py-1 transition-colors border-2 border-transparent hover:border-black uppercase"
          >
            [ Theory ]
          </Link>
          <Link
            href="/leaderboard"
            className="font-mono text-sm font-bold hover:bg-black hover:text-white px-2 py-1 transition-colors border-2 border-transparent hover:border-black uppercase"
          >
            [ Leaderboard ]
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE: USER INFO & LOGOUT */}
      <div className="flex items-center space-x-4">
        <div className="hidden sm:flex flex-col items-end font-mono text-sm border-r-2 border-black pr-4">
          <span className="font-bold uppercase text-black">
            OP: {operatorName}
          </span>
          <span className="text-[#00FF00] bg-black px-2 mt-1 font-bold">
            {xpScore} XP
          </span>
        </div>

        {/* LOGOUT BUTTON */}
        <button 
          onClick={handleLogout}
          className="bg-black text-white px-6 py-2 font-bold font-mono tracking-widest uppercase border-2 border-black hover:bg-threat hover:text-black hover:shadow-brutal transition-all"
        >
          [ LOGOUT ]
        </button>
      </div>
    </nav>
  );
}
