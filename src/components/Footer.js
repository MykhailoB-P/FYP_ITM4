import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t-4 border-black px-6 py-8 flex flex-col md:flex-row items-center justify-between z-10">
      <div className="font-mono font-bold text-sm uppercase tracking-wider mb-4 md:mb-0">
        © 2026 SECULAB. STRICTLY FOR ACADEMIC & EDUCATIONAL PURPOSES.
      </div>
      <div>
        <Link
          href="/legal"
          className="bg-black text-white font-mono font-bold text-xs px-4 py-2 border-2 border-black hover:bg-white hover:text-black hover:shadow-brutal transition-all uppercase tracking-widest"
        >
          [ VIEW LEGAL DISCLAIMER ]
        </Link>
      </div>
    </footer>
  );
}
