"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function Navbar() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
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

      {/* LOGOUT BUTTON */}
      <button 
        onClick={handleLogout}
        className="bg-black text-white px-6 py-2 font-bold font-mono tracking-widest uppercase border-2 border-black hover:bg-threat hover:text-black hover:shadow-brutal transition-all"
      >
        [ LOGOUT ]
      </button>
    </nav>
  );
}
