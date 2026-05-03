export const metadata = {
  title: "Legal & Disclaimer | SecuLab",
};

export default function LegalPage() {
  return (
    <div className="flex-1 p-8 md:p-16 max-w-4xl mx-auto w-full bg-white">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-12 border-b-4 border-black pb-4">
        [ ACADEMIC DISCLAIMER & TERMS OF USE ]
      </h1>

      <div className="space-y-12">
        <section className="bg-white border-4 border-black p-8 shadow-brutal">
          <h2 className="font-mono text-xl font-bold uppercase tracking-widest mb-4 bg-black text-white inline-block px-3 py-1">
            ACADEMIC PURPOSE
          </h2>
          <p className="text-lg leading-relaxed font-medium">
            This platform is a final-year academic project developed for Munster Technological University (MTU). It is an educational environment designed to teach cybersecurity awareness.
          </p>
        </section>

        <section className="bg-white border-4 border-black p-8 shadow-brutal">
          <h2 className="font-mono text-xl font-bold uppercase tracking-widest mb-4 bg-black text-white inline-block px-3 py-1">
            SIMULATED ENVIRONMENT
          </h2>
          <p className="text-lg leading-relaxed font-medium">
            All tactical scenarios, payloads, and network maps are strictly simulated. The application does not interact with, probe, or attack any real-world infrastructure.
          </p>
        </section>

        <section className="bg-white border-4 border-black p-8 shadow-brutal">
          <h2 className="font-mono text-xl font-bold uppercase tracking-widest mb-4 bg-black text-white inline-block px-3 py-1">
            COMPLIANCE & PRIVACY
          </h2>
          <p className="text-lg leading-relaxed font-medium">
            The system is designed with European (Irish) data protection standards in mind. User data (Operator IDs and XP) is stored securely and used solely for platform functionality.
          </p>
        </section>
      </div>
    </div>
  );
}
