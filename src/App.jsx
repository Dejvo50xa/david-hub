import { useState, useEffect, useRef, useCallback } from "react";

const STORAGE_KEY = "david-hub-notes";

// --- DATA ---
const MOTIVATIONAL_VIDEOS = [
  { id: "v1", title: "David Goggins — Who's Gonna Carry The Boats", url: "https://www.youtube.com/embed/u_ktRTWMX3M", note: "When comfort whispers, this screams back." },
  { id: "v2", title: "Jocko Willink — Good", url: "https://www.youtube.com/embed/IdTMDpizis8", note: "Reframe every setback. Good." },
  { id: "v3", title: "Steve Jobs — Stanford Commencement", url: "https://www.youtube.com/embed/UF8uR6Z6KLc", note: "Connecting the dots only works backwards." },
  { id: "v4", title: "Denzel Washington — Fall Forward", url: "https://www.youtube.com/embed/tbnzAVRZ9Xc", note: "Fail big. That's how winning is done." },
  { id: "v5", title: "Kobe Bryant — Mamba Mentality", url: "https://www.youtube.com/embed/VSceuiPBpxY", note: "Obsession is the price of mastery." },
  { id: "v6", title: "Naval Ravikant — How To Get Rich", url: "https://www.youtube.com/embed/1-TZqOsVCNM", note: "Specific knowledge, leverage, accountability." },
  { id: "v7", title: "Andrew Huberman — The Science of Motivation", url: "https://www.youtube.com/embed/vA50EK70whE", note: "Dopamine is the molecule of more." },
  { id: "v8", title: "Alex Hormozi — $100M Mindset", url: "https://www.youtube.com/embed/h2yJbMu_4mA", note: "Volume negates luck." },
];

const PHILOSOPHY_CARDS = [
  { title: "Marcus Aurelius", school: "Stoicism", core: "You have power over your mind — not outside events. Realize this, and you will find strength.", ideas: ["Memento mori — remember death to fuel urgency", "The obstacle is the way", "Morning meditation on what may go wrong", "Journaling as philosophical practice"] },
  { title: "Seneca", school: "Stoicism", core: "We suffer more in imagination than in reality.", ideas: ["Premeditatio malorum — rehearse adversity", "Time is our most precious asset", "Voluntary discomfort builds resilience", "Letters as a tool for thinking"] },
  { title: "Epictetus", school: "Stoicism", core: "It's not what happens to you, but how you react to it that matters.", ideas: ["Dichotomy of control", "We are disturbed not by things but by our judgments", "Character over circumstance", "Freedom through self-discipline"] },
  { title: "Viktor Frankl", school: "Existentialism", core: "Those who have a 'why' to live, can bear with almost any 'how'.", ideas: ["Meaning is found in suffering", "Logotherapy — meaning as primary motivation", "The last human freedom: choosing one's attitude", "Tragic optimism"] },
  { title: "Nassim Taleb", school: "Antifragility", core: "Some things benefit from shocks; they thrive and grow when exposed to disorder.", ideas: ["Antifragile > Resilient > Fragile", "Barbell strategy in all domains", "Skin in the game", "Via negativa — growth by subtraction"] },
  { title: "Naval Ravikant", school: "Modern Wisdom", core: "A calm mind, a fit body, a house full of love. These things cannot be bought.", ideas: ["Happiness is a skill you train", "Specific knowledge is found by pursuing curiosity", "Read what you love until you love to read", "Desire is a contract with suffering"] },
];

const TRAINING_SECTIONS = [
  { title: "Strength", icon: "◆", items: ["Compound lifts 3x/week — squat, deadlift, press, row", "Progressive overload: add 2.5% weekly", "RPE-based autoregulation", "Deload every 4th week"] },
  { title: "Conditioning", icon: "◇", items: ["Zone 2: 150-180 min/week (nasal breathing test)", "VO₂ max intervals: 4x4 min at 90-95% HR max", "Sport-specific: cutting drills, acceleration work", "HRV-guided intensity — respect Oura readiness score"] },
  { title: "Mobility & Recovery", icon: "○", items: ["Daily 10-min movement prep", "Post-training: 90/90 hip work, thoracic rotation", "Cold exposure: 1-3 min deliberate cold (Huberman protocol)", "Sleep: 7.5-8.5h, consistent wake time, last meal 3h before bed"] },
  { title: "Sport-Specific (Ultimate)", icon: "●", items: ["Explosive first step drills — 10yd acceleration", "Change of direction: 5-10-5 shuttle, L-drill", "Disc skills: high-rep catching under fatigue", "Game film review: processing speed development"] },
];

const LONGEVITY_ITEMS = [
  { title: "Peter Attia's Medicine 3.0", desc: "Shift from reactive to proactive. Four horsemen: heart disease, cancer, neurodegenerative disease, metabolic dysfunction. Exercise is the most potent longevity drug." },
  { title: "Sleep Optimization", desc: "Non-negotiable foundation. Track with Oura. Cool room (18°C), dark, consistent schedule. Magnesium threonate, apigenin protocol. Avoid alcohol — even 1 drink disrupts deep sleep architecture." },
  { title: "Zone 2 Cardio", desc: "Mitochondrial efficiency. 150-180 min/week at conversational pace. Improves fat oxidation, metabolic flexibility. The boring work that compounds over decades." },
  { title: "Blood Markers", desc: "ApoB (most predictive CVD marker), HbA1c, fasting insulin, Lp(a), hsCRP, homocysteine. Annual comprehensive panels. Track trends, not snapshots." },
  { title: "Nutrition Framework", desc: "Protein: 1.6-2.2g/kg. Prioritize whole foods. Time-restricted eating window if it suits lifestyle. Minimize seed oils and ultra-processed food. Evidence hierarchy: RCTs > observational > anecdote." },
  { title: "Cognitive Health", desc: "BDNF through exercise and learning. Novel challenges daily. Social connection. Omega-3 (EPA/DHA). Manage chronic stress — cortisol is neurotoxic at sustained levels." },
];

const SELF_IMPROVEMENT = [
  { title: "Atomic Habits", principles: ["1% better daily compounds to 37x/year", "Environment design > willpower", "Habit stacking: attach new to existing", "Identity-based change: become, don't just do"] },
  { title: "Deep Work", principles: ["Depth is rare and valuable", "Schedule blocks: 90-min deep work sessions", "Ritualize the start — same place, same trigger", "Embrace boredom to build attention muscle"] },
  { title: "Mental Models", principles: ["Inversion: think about what to avoid", "Second-order thinking: then what?", "Circle of competence: know your edge", "Map vs territory: models are approximations"] },
  { title: "Decision Making", principles: ["Reversible vs irreversible decisions", "10/10/10 rule: how will I feel in 10 min/months/years?", "Pre-mortem: imagine failure, work backwards", "Satisfice on reversible, maximize on irreversible"] },
];

const FIRE_SECTIONS = [
  { title: "Core Math", content: "25x annual expenses = FI number. 4% safe withdrawal rate (Trinity Study). Every $1 saved is $25 less needed. Savings rate matters more than returns." },
  { title: "Investment Principles", content: "Low-cost index funds as foundation. Dollar-cost averaging removes emotion. Asset allocation by age and risk tolerance. Rebalance annually. Ignore noise." },
  { title: "Crypto-Native Wealth", content: "Bitcoin as asymmetric bet and digital property. DCA strategy. Cold storage (Trezor). Understand cycles. Position sizing: only what you can hold through -80%." },
  { title: "Passive Income", content: "Dividends, rental income, digital products, consulting retainers. Stack income streams. Each stream should eventually run without daily input." },
];

// --- PRIVATE SECTIONS ---
const MY_LIFE_TIMELINE = [
  { year: "Values", text: "Service to others · Mastery · Autonomy · Legacy · Meaningful challenge" },
  { year: "Identity", text: "Czech professional navigating global finance and crypto. Elite athlete who cross-applies competitive frameworks. Lifelong student of systems — monetary, physical, philosophical." },
  { year: "North Star", text: "Build things that outlast me. Compete at the highest level in everything I touch. Help others see what's possible when you refuse to accept default settings." },
];

const MY_CAREER = [
  { phase: "Foundation", detail: "Master's in Business Economics — rigorous analytical training" },
  { phase: "Crypto Entry", detail: "Entered crypto finance — drawn by the community's willingness to challenge foundational assumptions about money" },
  { phase: "Invity Finance", detail: "Head of Treasury & Liquidity · Product Owner, Satoshi Bridge Fund · MiCA-regulated fintech backed by SatoshiLabs (Trezor)" },
  { phase: "Expertise", detail: "Crypto treasury operations · Banking relationships for crypto companies · Financial systems architecture · MiCA regulation" },
  { phase: "On Horizon", detail: "Crypto treasury consulting · Banking access advisory · MiCA regulation newsletter · Building the bridge between TradFi and crypto" },
];

const MY_ACHIEVEMENTS = [
  { area: "Professional", items: ["Head of Treasury at MiCA-regulated crypto fintech", "Product Owner for Satoshi Bridge Fund", "Built banking relationships in the hardest industry to bank"] },
  { area: "Athletic", items: ["Elite competitive ultimate frisbee — 4 countries", "5 years as team captain", "WUCC competitor", "Known for elite hands and catching ability"] },
  { area: "Personal", items: ["Multiple deployed web projects (AI Guide, frisbee site)", "Self-taught developer shipping real products", "Bilingual professional (Czech/English)"] },
];

const MY_FAILURES = [
  { lesson: "Over-optimization trap", detail: "Tendency to over-optimize strategy while delaying smaller operational wins. Perfect is the enemy of shipped.", reflection: "Bias toward action. The best strategy executed today beats the perfect strategy executed never." },
  { lesson: "Processing speed gap", detail: "Identified gap in game processing speed compared to US club-level play. Exposed a ceiling in pattern recognition under pressure.", reflection: "Deliberate practice on weaknesses, not just strengths. Film review. Reps under fatigue." },
  { lesson: "Add your own...", detail: "This section is for radical self-honesty. Every failure is data.", reflection: "Framework: What happened → What I learned → What changed → How I'd handle it next time" },
];

// --- COMPONENTS ---
function VideoCard({ video }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div style={{
      background: "var(--card-bg)",
      borderRadius: 12,
      overflow: "hidden",
      border: "1px solid var(--border)",
      transition: "transform 0.2s, box-shadow 0.2s",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px var(--shadow)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
    >
      <div style={{ position: "relative", paddingTop: "56.25%", background: "#000" }}>
        {!loaded ? (
          <div
            onClick={() => setLoaded(true)}
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}
          >
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
              <span style={{ fontSize: 24, marginLeft: 3 }}>▶</span>
            </div>
          </div>
        ) : (
          <iframe
            src={video.url + "?autoplay=1"}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={video.title}
          />
        )}
      </div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{video.title}</div>
        <div style={{ fontSize: 12, opacity: 0.5, fontStyle: "italic" }}>{video.note}</div>
      </div>
    </div>
  );
}

function PhilosophyCard({ card }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        background: "var(--card-bg)", borderRadius: 12, padding: "20px 24px", cursor: "pointer",
        border: "1px solid var(--border)", transition: "all 0.3s",
        borderLeft: "3px solid var(--accent)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18 }}>{card.title}</div>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, opacity: 0.4, marginTop: 2 }}>{card.school}</div>
        </div>
        <span style={{ opacity: 0.3, transform: open ? "rotate(180deg)" : "", transition: "transform 0.3s" }}>▼</span>
      </div>
      <div style={{ marginTop: 12, fontSize: 14, opacity: 0.7, fontStyle: "italic", lineHeight: 1.6 }}>{card.core}</div>
      {open && (
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
          {card.ideas.map((idea, i) => (
            <div key={i} style={{ fontSize: 13, opacity: 0.6, padding: "4px 0", paddingLeft: 12, borderLeft: "2px solid var(--accent-dim)" }}>{idea}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function NoteBox({ sectionKey }) {
  const storageFullKey = STORAGE_KEY + "-" + sectionKey;
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const loadNote = async () => {
        try {
          const result = await window.storage.get(storageFullKey);
          if (result && result.value) setNote(result.value);
        } catch { /* key doesn't exist yet */ }
      };
      loadNote();
    } catch {}
  }, [storageFullKey]);

  const save = async () => {
    try {
      await window.storage.set(storageFullKey, note);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch {}
  };

  return (
    <div style={{ marginTop: 24, padding: 16, background: "var(--card-bg)", borderRadius: 10, border: "1px dashed var(--border)" }}>
      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, opacity: 0.4, marginBottom: 8 }}>Personal Notes</div>
      <textarea
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="Write your thoughts..."
        style={{
          width: "100%", minHeight: 80, background: "transparent", border: "none", color: "var(--text)",
          fontFamily: "var(--font-body)", fontSize: 13, resize: "vertical", outline: "none", lineHeight: 1.6
        }}
      />
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
        <button onClick={save} style={{
          background: "var(--accent)", color: "#000", border: "none", padding: "6px 16px",
          borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)"
        }}>
          {saved ? "✓ Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}

// --- MAIN APP ---
const SECTIONS_PUBLIC = [
  { id: "motivation", label: "Motivation", icon: "⚡" },
  { id: "philosophy", label: "Philosophy", icon: "◎" },
  { id: "training", label: "Training", icon: "△" },
  { id: "longevity", label: "Longevity", icon: "∞" },
  { id: "self-improvement", label: "Self-Improvement", icon: "↑" },
  { id: "fire", label: "FIRE", icon: "◈" },
];

const SECTIONS_PRIVATE = [
  { id: "my-life", label: "My Life", icon: "✦" },
  { id: "my-career", label: "My Career", icon: "▧" },
  { id: "my-achievements", label: "Achievements", icon: "★" },
  { id: "my-failures", label: "Failures", icon: "✕" },
];

export default function App() {
  const [secretMode, setSecretMode] = useState(false);
  const [activeSection, setActiveSection] = useState("motivation");
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);

  const handleLogoClick = useCallback(() => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    if (clickCountRef.current >= 5) {
      setSecretMode(prev => !prev);
      clickCountRef.current = 0;
      return;
    }
    clickTimerRef.current = setTimeout(() => { clickCountRef.current = 0; }, 1200);
  }, []);

  const allSections = secretMode ? [...SECTIONS_PUBLIC, ...SECTIONS_PRIVATE] : SECTIONS_PUBLIC;

  const lightTheme = {
    "--bg": "#f5f2eb", "--bg-secondary": "#ebe7de", "--card-bg": "#ffffff",
    "--text": "#1a1917", "--text-secondary": "#5c5a54", "--border": "rgba(0,0,0,0.08)",
    "--accent": "#c8a951", "--accent-dim": "rgba(200,169,81,0.3)", "--shadow": "rgba(0,0,0,0.06)",
    "--private-accent": "#d4764e", "--sidebar-bg": "#eae6dd",
  };
  const darkTheme = {
    "--bg": "#0c0c0f", "--bg-secondary": "#141418", "--card-bg": "#1a1a1f",
    "--text": "#e8e6e1", "--text-secondary": "#8a877f", "--border": "rgba(255,255,255,0.06)",
    "--accent": "#c8a951", "--accent-dim": "rgba(200,169,81,0.2)", "--shadow": "rgba(0,0,0,0.3)",
    "--private-accent": "#d4764e", "--sidebar-bg": "#111114",
  };

  const theme = darkMode ? darkTheme : lightTheme;
  const isPrivateSection = SECTIONS_PRIVATE.some(s => s.id === activeSection);

  const cssVars = {
    ...theme,
    "--font-heading": "'Playfair Display', Georgia, serif",
    "--font-body": "'DM Sans', 'Helvetica Neue', sans-serif",
  };

  const renderSection = () => {
    switch (activeSection) {
      case "motivation":
        return (
          <div>
            <SectionHeader title="Motivation" subtitle="Fuel for the fire. Watch when you need to be reminded why you started." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {MOTIVATIONAL_VIDEOS.map(v => <VideoCard key={v.id} video={v} />)}
            </div>
            <NoteBox sectionKey="motivation" />
          </div>
        );
      case "philosophy":
        return (
          <div>
            <SectionHeader title="Philosophy" subtitle="Timeless frameworks for navigating chaos. Tap any card to expand." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 14 }}>
              {PHILOSOPHY_CARDS.map((c, i) => <PhilosophyCard key={i} card={c} />)}
            </div>
            <NoteBox sectionKey="philosophy" />
          </div>
        );
      case "training":
        return (
          <div>
            <SectionHeader title="Training" subtitle="Systematic physical preparation. HRV-guided, evidence-based, sport-specific." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {TRAINING_SECTIONS.map((s, i) => (
                <div key={i} style={{ background: "var(--card-bg)", borderRadius: 12, padding: 20, border: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: 20, marginBottom: 4 }}>
                    <span style={{ color: "var(--accent)", marginRight: 8 }}>{s.icon}</span>{s.title}
                  </div>
                  {s.items.map((item, j) => (
                    <div key={j} style={{ fontSize: 13, opacity: 0.65, padding: "6px 0", borderBottom: j < s.items.length - 1 ? "1px solid var(--border)" : "none" }}>{item}</div>
                  ))}
                </div>
              ))}
            </div>
            <NoteBox sectionKey="training" />
          </div>
        );
      case "longevity":
        return (
          <div>
            <SectionHeader title="Longevity" subtitle="Healthspan > Lifespan. Evidence-based protocols for the long game." />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {LONGEVITY_ITEMS.map((item, i) => (
                <div key={i} style={{ background: "var(--card-bg)", borderRadius: 12, padding: "18px 22px", border: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontSize: 13, opacity: 0.6, lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              ))}
            </div>
            <NoteBox sectionKey="longevity" />
          </div>
        );
      case "self-improvement":
        return (
          <div>
            <SectionHeader title="Self-Improvement" subtitle="Systems over goals. Identity over outcomes. Compound daily." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {SELF_IMPROVEMENT.map((s, i) => (
                <div key={i} style={{ background: "var(--card-bg)", borderRadius: 12, padding: 20, border: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, marginBottom: 12, color: "var(--accent)" }}>{s.title}</div>
                  {s.principles.map((p, j) => (
                    <div key={j} style={{ fontSize: 13, opacity: 0.65, padding: "5px 0 5px 14px", borderLeft: "2px solid var(--accent-dim)", marginBottom: 6 }}>{p}</div>
                  ))}
                </div>
              ))}
            </div>
            <NoteBox sectionKey="self-improvement" />
          </div>
        );
      case "fire":
        return (
          <div>
            <SectionHeader title="Financial Freedom" subtitle="FIRE fundamentals. Math doesn't lie. Build the machine, then let it run." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {FIRE_SECTIONS.map((s, i) => (
                <div key={i} style={{ background: "var(--card-bg)", borderRadius: 12, padding: 20, border: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{s.title}</div>
                  <div style={{ fontSize: 13, opacity: 0.6, lineHeight: 1.7 }}>{s.content}</div>
                </div>
              ))}
            </div>
            <NoteBox sectionKey="fire" />
          </div>
        );
      case "my-life":
        return (
          <div>
            <SectionHeader title="My Life" subtitle="Who I am. What I stand for. Where I'm going." private />
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {MY_LIFE_TIMELINE.map((item, i) => (
                <div key={i} style={{ background: "var(--card-bg)", borderRadius: 12, padding: 20, border: "1px solid var(--border)", borderLeft: "3px solid var(--private-accent)" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "var(--private-accent)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 2 }}>{item.year}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.75 }}>{item.text}</div>
                </div>
              ))}
            </div>
            <NoteBox sectionKey="my-life" />
          </div>
        );
      case "my-career":
        return (
          <div>
            <SectionHeader title="My Career" subtitle="The path. Not linear — but intentional." private />
            <div style={{ position: "relative", paddingLeft: 28 }}>
              <div style={{ position: "absolute", left: 8, top: 0, bottom: 0, width: 2, background: "var(--private-accent)", opacity: 0.3 }} />
              {MY_CAREER.map((item, i) => (
                <div key={i} style={{ position: "relative", marginBottom: 20 }}>
                  <div style={{ position: "absolute", left: -24, top: 6, width: 10, height: 10, borderRadius: "50%", background: "var(--private-accent)" }} />
                  <div style={{ background: "var(--card-bg)", borderRadius: 10, padding: "14px 18px", border: "1px solid var(--border)" }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "var(--private-accent)" }}>{item.phase}</div>
                    <div style={{ fontSize: 13, opacity: 0.65, marginTop: 4, lineHeight: 1.6 }}>{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            <NoteBox sectionKey="my-career" />
          </div>
        );
      case "my-achievements":
        return (
          <div>
            <SectionHeader title="My Achievements" subtitle="Proof that it works. Evidence of effort compounding." private />
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {MY_ACHIEVEMENTS.map((group, i) => (
                <div key={i} style={{ background: "var(--card-bg)", borderRadius: 12, padding: 20, border: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "var(--private-accent)", marginBottom: 12 }}>{group.area}</div>
                  {group.items.map((item, j) => (
                    <div key={j} style={{ fontSize: 13, opacity: 0.65, padding: "6px 0 6px 14px", borderLeft: "2px solid var(--private-accent)", marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: "var(--private-accent)" }}>★</span> {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <NoteBox sectionKey="my-achievements" />
          </div>
        );
      case "my-failures":
        return (
          <div>
            <SectionHeader title="My Failures" subtitle="The most important section. Radical self-honesty. Every failure is data." private />
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {MY_FAILURES.map((f, i) => (
                <div key={i} style={{ background: "var(--card-bg)", borderRadius: 12, padding: 20, border: "1px solid var(--border)", borderLeft: "3px solid var(--private-accent)" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16 }}>{f.lesson}</div>
                  <div style={{ fontSize: 13, opacity: 0.6, marginTop: 8, lineHeight: 1.7 }}>{f.detail}</div>
                  <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(212,118,78,0.08)", borderRadius: 8, fontSize: 13, fontStyle: "italic", opacity: 0.7, lineHeight: 1.6 }}>
                    <span style={{ color: "var(--private-accent)", fontWeight: 700, fontStyle: "normal" }}>Reflection:</span> {f.reflection}
                  </div>
                </div>
              ))}
            </div>
            <NoteBox sectionKey="my-failures" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{
      ...cssVars,
      fontFamily: "var(--font-body)",
      background: "var(--bg)",
      color: "var(--text)",
      minHeight: "100vh",
      display: "flex",
      position: "relative",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          display: "none", position: "fixed", top: 12, left: 12, zIndex: 1000, background: "var(--card-bg)",
          border: "1px solid var(--border)", borderRadius: 8, padding: "8px 12px", color: "var(--text)",
          cursor: "pointer", fontSize: 18,
        }}
        className="mobile-menu-btn"
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        style={{
          width: 240, minHeight: "100vh", background: "var(--sidebar-bg)", borderRight: "1px solid var(--border)",
          padding: "24px 16px", display: "flex", flexDirection: "column", position: "sticky", top: 0,
          height: "100vh", overflowY: "auto", flexShrink: 0,
          transition: "transform 0.3s",
        }}
        className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}
      >
        {/* Logo — secret trigger */}
        <div
          onClick={handleLogoClick}
          style={{
            fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 22, letterSpacing: -0.5,
            cursor: "default", userSelect: "none", marginBottom: 6, padding: "0 4px",
            color: secretMode ? "var(--private-accent)" : "var(--text)",
            transition: "color 0.5s",
          }}
        >
          DN
        </div>
        <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 3, opacity: 0.3, marginBottom: 28, padding: "0 4px" }}>
          {secretMode ? "Private Mode" : "Personal Hub"}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            width: "100%", padding: "8px 12px", background: "var(--card-bg)", border: "1px solid var(--border)",
            borderRadius: 8, color: "var(--text)", fontSize: 12, fontFamily: "var(--font-body)",
            outline: "none", marginBottom: 20, boxSizing: "border-box",
          }}
        />

        {/* Nav */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 3, opacity: 0.3, marginBottom: 10, padding: "0 4px" }}>Sections</div>
          {SECTIONS_PUBLIC.map(s => (
            <div
              key={s.id}
              onClick={() => { setActiveSection(s.id); setSidebarOpen(false); }}
              style={{
                padding: "9px 12px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 500,
                marginBottom: 2, display: "flex", alignItems: "center", gap: 10,
                background: activeSection === s.id ? "var(--card-bg)" : "transparent",
                opacity: activeSection === s.id ? 1 : 0.5,
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: 14, width: 20, textAlign: "center" }}>{s.icon}</span>
              {s.label}
            </div>
          ))}

          {secretMode && (
            <>
              <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 3, opacity: 0.3, marginTop: 20, marginBottom: 10, padding: "0 4px", color: "var(--private-accent)" }}>
                Private
              </div>
              {SECTIONS_PRIVATE.map(s => (
                <div
                  key={s.id}
                  onClick={() => { setActiveSection(s.id); setSidebarOpen(false); }}
                  style={{
                    padding: "9px 12px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 500,
                    marginBottom: 2, display: "flex", alignItems: "center", gap: 10,
                    background: activeSection === s.id ? "rgba(212,118,78,0.1)" : "transparent",
                    opacity: activeSection === s.id ? 1 : 0.5,
                    color: activeSection === s.id ? "var(--private-accent)" : "var(--text)",
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{ fontSize: 14, width: 20, textAlign: "center" }}>{s.icon}</span>
                  {s.label}
                </div>
              ))}
            </>
          )}
        </div>

        {/* Dark mode toggle */}
        <div
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "10px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12, opacity: 0.4,
            display: "flex", alignItems: "center", gap: 8, marginTop: 12,
          }}
        >
          {darkMode ? "☀ Light Mode" : "● Dark Mode"}
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "40px 48px", maxWidth: 960, margin: "0 auto" }} className="main-content">
        {renderSection()}
      </div>

      {/* Secret mode indicator — subtle pulse */}
      {secretMode && (
        <div style={{
          position: "fixed", bottom: 16, right: 16, width: 8, height: 8, borderRadius: "50%",
          background: "var(--private-accent)", opacity: 0.6,
          animation: "pulse 2s ease-in-out infinite",
        }} />
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
          .sidebar { position: fixed !important; z-index: 999; transform: translateX(-100%); }
          .sidebar-open { transform: translateX(0) !important; }
          .main-content { padding: 24px 16px !important; }
        }
      `}</style>
    </div>
  );
}

function SectionHeader({ title, subtitle, private: isPrivate }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h1 style={{
        fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 36, margin: 0, letterSpacing: -1,
        color: isPrivate ? "var(--private-accent)" : "var(--text)",
      }}>
        {title}
      </h1>
      <p style={{ fontSize: 14, opacity: 0.45, marginTop: 6, lineHeight: 1.5 }}>{subtitle}</p>
    </div>
  );
}
