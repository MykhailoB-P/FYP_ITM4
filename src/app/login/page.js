"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const [operatorId, setOperatorId] = useState("");
  const [passcode, setPasscode] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const supabase = createClient();

  const handlePasscodeChange = (e) => {
    // Only allow digits, max 6 length
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPasscode(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!operatorId.trim()) {
      setError("OPERATOR ID IS REQUIRED.");
      setLoading(false);
      return;
    }

    if (passcode.length !== 6) {
      setError("PASSCODE MUST BE EXACTLY 6 DIGITS.");
      setLoading(false);
      return;
    }

    const sanitizedId = operatorId.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    
    if (!sanitizedId) {
      setError("OPERATOR ID MUST CONTAIN ALPHANUMERIC CHARACTERS.");
      setLoading(false);
      return;
    }

    const fakeEmail = `${sanitizedId}@seculab.ie`;

    try {
      let result;
      if (isRegistering) {
        // Check uniqueness explicitly
        const { data: existingUser } = await supabase
          .from('users')
          .select('id')
          .ilike('username', operatorId.trim())
          .maybeSingle();
          
        if (existingUser) {
          setError("OPERATOR ID ALREADY IN USE.");
          setLoading(false);
          return;
        }

        result = await supabase.auth.signUp({
          email: fakeEmail,
          password: passcode,
        });

        if (!result.error && result.data?.user) {
          const { error: insertError } = await supabase.from('users').insert([
            { id: result.data.user.id, username: operatorId.trim(), xp_score: 0, completed_modules: [] }
          ]);
          
          if (insertError) {
            console.error("Profile creation error:", insertError);
          }
        }
      } else {
        result = await supabase.auth.signInWithPassword({
          email: fakeEmail,
          password: passcode,
        });
      }

      if (result.error) {
        let msg = result.error.message.toUpperCase();
        if (msg.includes("ALREADY REGISTERED") || msg.includes("ALREADY EXISTS")) {
          msg = "OPERATOR ID ALREADY IN USE.";
        } else if (msg.includes("INVALID LOGIN CREDENTIALS")) {
          msg = "INVALID OPERATOR ID OR PASSCODE.";
        }
        setError(msg);
      } else {
        // Auth-to-Profile Sync (TASK 1)
        if (result.data?.user) {
          const { data: userRecord, error: fetchError } = await supabase
            .from('users')
            .select('id')
            .eq('id', result.data.user.id)
            .maybeSingle();

          if (!userRecord && !fetchError) {
            const defaultUsername = result.data.user.email.split('@')[0];
            await supabase.from('users').insert([
              { id: result.data.user.id, username: defaultUsername, xp_score: 0, completed_modules: [] }
            ]);
          }
        }
        window.dispatchEvent(new Event('auth-change'));
        router.push("/");
      }
    } catch (err) {
      setError("AN UNEXPECTED ERROR OCCURRED.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[url('/bg-pattern.svg')] bg-white">
      {/* Neo-brutalist card */}
      <div className="w-full max-w-lg bg-white border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_#000000] flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8 text-center border-b-4 border-black pb-4 w-full">
          [ OPERATOR AUTHENTICATION ]
        </h1>

        {error && (
          <div className="w-full bg-white border-2 border-threat text-threat font-mono font-bold p-3 mb-6 uppercase text-sm shadow-[4px_4px_0px_#FF0000]">
            ERROR: {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="operatorId" className="font-bold uppercase tracking-wider text-sm">
              OPERATOR ID
            </label>
            <input
              id="operatorId"
              type="text"
              required
              value={operatorId}
              onChange={(e) => setOperatorId(e.target.value)}
              className="font-mono text-lg p-3 border-2 border-black outline-none focus:bg-gray-100 transition-colors"
              placeholder="e.g. ALPHA_WOLF"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="passcode" className="font-bold uppercase tracking-wider text-sm">
              6-DIGIT PASSCODE
            </label>
            <input
              id="passcode"
              type="password"
              required
              maxLength={6}
              pattern="\d{6}"
              value={passcode}
              onChange={handlePasscodeChange}
              className="font-mono text-lg p-3 border-2 border-black outline-none focus:bg-gray-100 transition-colors tracking-[0.5em] text-center"
              placeholder="••••••"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white text-xl font-bold font-mono uppercase tracking-widest px-6 py-4 border-2 border-black hover:bg-success hover:text-black hover:-translate-y-1 hover:shadow-brutal active:translate-y-0 active:shadow-none transition-all disabled:opacity-50 disabled:hover:transform-none disabled:hover:shadow-none disabled:cursor-not-allowed"
            >
              {loading ? "PROCESSING..." : "[ INITIATE SESSION ]"}
            </button>
          </div>
        </form>

        <div className="mt-8">
          <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError(null);
            }}
            className="font-mono text-sm underline hover:text-success hover:bg-black transition-colors px-2 py-1 uppercase font-bold"
          >
            {isRegistering
              ? "Existing Operator? Login here."
              : "New Operator? Register here."}
          </button>
        </div>
      </div>
    </div>
  );
}
