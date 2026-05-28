const steps = [
  { n: "01", title: "Discovery call", desc: "We learn your goals, market, and constraints — and map the realistic path." },
  { n: "02", title: "Design & build", desc: "Model, ops, tech stack, and brand. Every piece engineered to launch." },
  { n: "03", title: "Launch & grow", desc: "Open your doors with a patient pipeline and a system you can scale." },
];

export function Process() {
  return (
    <section className="py-[50px]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
            The process
          </span>
          <h2
            className="mt-3 text-4xl md:text-5xl font-semibold text-navy"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            From idea to open doors in <span className="italic text-gold">90 days.</span>
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-border bg-white p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div
                className="text-6xl text-gold/80 leading-none"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {s.n}
              </div>
              <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-navy/50 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
