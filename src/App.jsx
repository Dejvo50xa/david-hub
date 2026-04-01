import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// DATA
// ============================================================

const VIDEOS = [
  { id: "v1", title: "David Goggins — Who's Gonna Carry The Boats", url: "https://www.youtube.com/embed/u_ktRTWMX3M", tag: "mindset" },
  { id: "v2", title: "Jocko Willink — Good", url: "https://www.youtube.com/embed/IdTMDpizis8", tag: "mindset" },
  { id: "v3", title: "Steve Jobs — Stanford Commencement", url: "https://www.youtube.com/embed/UF8uR6Z6KLc", tag: "vision" },
  { id: "v4", title: "Denzel Washington — Fall Forward", url: "https://www.youtube.com/embed/tbnzAVRZ9Xc", tag: "mindset" },
  { id: "v5", title: "Kobe Bryant — Mamba Mentality", url: "https://www.youtube.com/embed/VSceuiPBpxY", tag: "discipline" },
  { id: "v6", title: "Naval Ravikant — How To Get Rich", url: "https://www.youtube.com/embed/1-TZqOsVCNM", tag: "wealth" },
  { id: "v7", title: "Andrew Huberman — Focus & Motivation", url: "https://www.youtube.com/embed/vA50EK70whE", tag: "science" },
  { id: "v8", title: "Alex Hormozi — $100M Mindset", url: "https://www.youtube.com/embed/h2yJbMu_4mA", tag: "wealth" },
  { id: "v9", title: "Jordan Peterson — Pursue What Is Meaningful", url: "https://www.youtube.com/embed/NX2ep5fCJZ8", tag: "meaning" },
  { id: "v10", title: "Matthew McConaughey — This Is Why You're Not Happy", url: "https://www.youtube.com/embed/wD2cVhC-63I", tag: "mindset" },
  { id: "v11", title: "Arnold Schwarzenegger — 6 Rules of Success", url: "https://www.youtube.com/embed/EyhOmBPtGNM", tag: "discipline" },
  { id: "v12", title: "Ray Dalio — Principles for Success", url: "https://www.youtube.com/embed/B9XGUpQZY38", tag: "wealth" },
  { id: "v13", title: "Elon Musk — Work Ethics & Motivation", url: "https://www.youtube.com/embed/zIwLWfaAg-8", tag: "vision" },
  { id: "v14", title: "Marcus Aurelius — Meditations (Audiobook)", url: "https://www.youtube.com/embed/d5E2AQKuCyU", tag: "philosophy" },
  { id: "v15", title: "Huberman — Optimal Morning Routine", url: "https://www.youtube.com/embed/gR_f-iwUGY5", tag: "science" },
  { id: "v16", title: "Goggins — Can't Hurt Me Mindset", url: "https://www.youtube.com/embed/78I9dTB9vqM", tag: "discipline" },
  { id: "v17", title: "Tim Ferriss — Smash Fear & Learn Anything", url: "https://www.youtube.com/embed/5J6jAC6XxAI", tag: "mindset" },
  { id: "v18", title: "Peter Attia — Exercise as Medicine", url: "https://www.youtube.com/embed/jN0pRAqiUJU", tag: "longevity" },
  { id: "v19", title: "Sam Altman — How To Be Successful", url: "https://www.youtube.com/embed/CJkFnVf5Qk8", tag: "vision" },
  { id: "v20", title: "Joe Rogan — Best Motivational Speech", url: "https://www.youtube.com/embed/YTuElM6T50w", tag: "mindset" },
  { id: "v21", title: "Admiral McRaven — Make Your Bed Speech", url: "https://www.youtube.com/embed/3sK3wJAxGfs", tag: "discipline" },
  { id: "v22", title: "Lex Fridman — Meaning of Life", url: "https://www.youtube.com/embed/Osh0-J3T2nY", tag: "meaning" },
  { id: "v23", title: "Bryan Johnson — Don't Die Blueprint", url: "https://www.youtube.com/embed/1rJbOgJhPCQ", tag: "longevity" },
  { id: "v24", title: "Simon Sinek — Start With Why", url: "https://www.youtube.com/embed/u4ZoJKF_VuA", tag: "vision" },
  { id: "v25", title: "Seneca — On The Shortness Of Life", url: "https://www.youtube.com/embed/ABRN0E_mI0U", tag: "philosophy" },
];

const VIDEO_TAGS = ["all", "mindset", "discipline", "vision", "wealth", "science", "meaning", "philosophy", "longevity"];

const PHILOSOPHY = [
  { title: "Marcus Aurelius", school: "Stoicism", core: "You have power over your mind — not outside events.", ideas: ["Memento mori — death as urgency", "The obstacle is the way", "Morning premeditatio", "Journal as philosophical practice"], color: "#c8a951" },
  { title: "Seneca", school: "Stoicism", core: "We suffer more in imagination than in reality.", ideas: ["Premeditatio malorum", "Time is the only true wealth", "Voluntary discomfort", "Letters as thinking tools"], color: "#a0c4ff" },
  { title: "Epictetus", school: "Stoicism", core: "It's not what happens — it's how you react.", ideas: ["Dichotomy of control", "We are disturbed by judgments", "Freedom through discipline", "Character over circumstance"], color: "#7ec8a0" },
  { title: "Viktor Frankl", school: "Existentialism", core: "Those who have a 'why' can bear any 'how'.", ideas: ["Meaning found in suffering", "Logotherapy framework", "The last human freedom", "Tragic optimism"], color: "#d4764e" },
  { title: "Nassim Taleb", school: "Antifragility", core: "Some things benefit from shocks and disorder.", ideas: ["Antifragile > Resilient > Fragile", "Barbell strategy", "Skin in the game", "Via negativa — subtract to grow"], color: "#e86f68" },
  { title: "Naval Ravikant", school: "Modern Wisdom", core: "A calm mind, a fit body, a house full of love.", ideas: ["Happiness as a trainable skill", "Specific knowledge via curiosity", "Read what you love", "Desire is suffering's contract"], color: "#b8a9e8" },
  { title: "Miyamoto Musashi", school: "Bushido", core: "There is nothing outside of yourself that can enable you to get better.", ideas: ["The Way is in training", "Do nothing which is of no use", "Know the Ways of all professions", "Perceive that which cannot be seen"], color: "#e8c86a" },
  { title: "Alan Watts", school: "Zen", core: "The meaning of life is just to be alive. It is so obvious.", ideas: ["This is it — the present moment", "You are the universe experiencing itself", "Stop measuring, start living", "The backwards law of desire"], color: "#68c8d4" },
];

const TRAINING = [
  { title: "Strength", icon: "◆", desc: "Foundation of everything", items: ["Compound lifts 3x/week — squat, deadlift, press, row", "Progressive overload: +2.5% weekly", "RPE-based autoregulation", "Deload every 4th week", "Single-leg work for sport transfer"] },
  { title: "Conditioning", icon: "◇", desc: "Engine capacity", items: ["Zone 2: 150-180 min/week (nasal breathing)", "VO₂ max: 4×4 min at 90-95% HR max", "Sport-specific cutting drills", "HRV-guided intensity (Oura readiness)"] },
  { title: "Mobility", icon: "○", desc: "Move without restriction", items: ["Daily 10-min movement prep", "90/90 hip work, thoracic rotation", "Cold exposure: 1-3 min (Huberman)", "Sleep: 7.5-8.5h, consistent wake time"] },
  { title: "Ultimate", icon: "●", desc: "Sport-specific mastery", items: ["Explosive first step — 10yd acceleration", "5-10-5 shuttle, L-drill for COD", "Disc skills under fatigue", "Film review: processing speed development"] },
];

const LONGEVITY = [
  { title: "Medicine 3.0", desc: "Proactive not reactive. Four horsemen: cardiovascular disease, cancer, neurodegeneration, metabolic dysfunction. Exercise is the most potent longevity intervention.", icon: "◎" },
  { title: "Sleep Architecture", desc: "Non-negotiable foundation. Cool (18°C), dark, consistent schedule. Even one drink disrupts deep sleep. Track with Oura. Magnesium threonate + apigenin protocol.", icon: "◐" },
  { title: "Zone 2 Cardio", desc: "Mitochondrial efficiency. 150-180 min/week at conversational pace. Fat oxidation, metabolic flexibility. The boring work that compounds over decades.", icon: "◑" },
  { title: "Blood Markers", desc: "ApoB (most predictive CVD marker), HbA1c, fasting insulin, Lp(a), hsCRP, homocysteine. Track trends across annual panels, not snapshots.", icon: "◒" },
  { title: "Nutrition", desc: "Protein: 1.6-2.2g/kg. Whole foods. DIAAS > PDCAAS for protein quality. Complementary plant proteins (lysine + methionine). Minimize ultra-processed food.", icon: "◓" },
  { title: "Cognitive Longevity", desc: "BDNF through exercise and learning. Novel challenges daily. Social connection. Omega-3 (EPA/DHA). Chronic stress = neurotoxic cortisol.", icon: "◔" },
];

const SELF_IMPROVEMENT = [
  { title: "Atomic Habits", items: ["1% daily = 37× yearly", "Environment design > willpower", "Habit stacking", "Identity-based change: become, don't just do"], color: "#c8a951" },
  { title: "Deep Work", items: ["Depth is rare and valuable", "90-min deep work blocks", "Ritualize the start", "Embrace boredom to build attention"], color: "#a0c4ff" },
  { title: "Mental Models", items: ["Inversion: what to avoid", "Second-order thinking: then what?", "Circle of competence", "Map ≠ territory"], color: "#7ec8a0" },
  { title: "Decision Making", items: ["Reversible vs irreversible", "10/10/10 rule", "Pre-mortem analysis", "Satisfice or maximize by type"], color: "#d4764e" },
  { title: "Energy Management", items: ["Manage energy not time", "Ultradian rhythms: 90-min cycles", "Strategic recovery is productive", "Audit energy drains weekly"], color: "#b8a9e8" },
  { title: "Learning", items: ["Feynman technique: teach to learn", "Spaced repetition", "Interleaving > blocked practice", "Sleep consolidates memory"], color: "#e86f68" },
];

const FIRE = [
  { title: "Core Math", content: "25× annual expenses = FI number. 4% safe withdrawal rate. Every $1 saved = $25 less needed. Savings rate matters more than returns.", icon: "◈" },
  { title: "Investment Principles", content: "Low-cost index funds as foundation. DCA removes emotion. Asset allocation by age and risk. Rebalance annually. Ignore noise.", icon: "◇" },
  { title: "Crypto-Native Wealth", content: "Bitcoin as asymmetric bet. DCA strategy. Cold storage (Trezor). Understand cycles. Position size: only what survives -80%.", icon: "◆" },
  { title: "Passive Income", content: "Dividends, rental, digital products, consulting retainers. Stack streams. Each should run without daily input eventually.", icon: "○" },
  { title: "Tax Optimization", content: "Legal tax efficiency compounds. Understand your jurisdiction. Retirement accounts, capital gains timing, loss harvesting. Every % saved compounds.", icon: "●" },
];

const MINDSET = [
  { quote: "The impediment to action advances action. What stands in the way becomes the way.", author: "Marcus Aurelius" },
  { quote: "He who has a why to live for can bear almost any how.", author: "Friedrich Nietzsche" },
  { quote: "We are what we repeatedly do. Excellence is not an act, but a habit.", author: "Aristotle" },
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "Discipline equals freedom.", author: "Jocko Willink" },
  { quote: "You can't connect the dots looking forward. You can only connect them looking backwards.", author: "Steve Jobs" },
  { quote: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { quote: "What we fear doing most is usually what we most need to do.", author: "Tim Ferriss" },
];

const BOOK_SHELF = [
  { title: "Meditations", author: "Marcus Aurelius", category: "Philosophy" },
  { title: "Man's Search for Meaning", author: "Viktor Frankl", category: "Philosophy" },
  { title: "Antifragile", author: "Nassim Taleb", category: "Systems" },
  { title: "Atomic Habits", author: "James Clear", category: "Performance" },
  { title: "Deep Work", author: "Cal Newport", category: "Performance" },
  { title: "Outlive", author: "Peter Attia", category: "Longevity" },
  { title: "Legacy", author: "James Kerr", category: "Leadership" },
  { title: "Mind Gym", author: "Gary Mack", category: "Sport" },
  { title: "The Almanack of Naval", author: "Eric Jorgenson", category: "Wealth" },
  { title: "Can't Hurt Me", author: "David Goggins", category: "Mindset" },
  { title: "The Bitcoin Standard", author: "Saifedean Ammous", category: "Crypto" },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", category: "Psychology" },
];

// PRIVATE DATA
const MY_LIFE = [
  { label: "Core Values", text: "Service to others · Mastery · Autonomy · Legacy · Meaningful Challenge" },
  { label: "Identity", text: "Czech professional navigating global finance and crypto frontier. Elite athlete applying competitive frameworks across domains. Lifelong student of systems — monetary, physical, philosophical." },
  { label: "North Star", text: "Build things that outlast me. Compete at the highest level in everything I touch. Help others see what's possible when you refuse default settings." },
  { label: "Philosophy", text: "Competition as truth-seeking. Mastery as an infinite game. Crypto as epistemological challenge to institutional assumptions." },
];

const MY_CAREER = [
  { phase: "Foundation", detail: "Master's in Business Economics — rigorous analytical training", year: "Academic" },
  { phase: "Crypto Entry", detail: "Drawn by the community's willingness to challenge foundational assumptions about money and trust", year: "Transition" },
  { phase: "Invity Finance", detail: "Head of Treasury & Liquidity · Product Owner, Satoshi Bridge Fund · MiCA-regulated fintech backed by SatoshiLabs/Trezor", year: "Current" },
  { phase: "Expertise Stack", detail: "Crypto treasury ops · Banking relationships for crypto · Financial architecture · MiCA regulation", year: "Domain" },
  { phase: "Horizon", detail: "Crypto treasury consulting · MiCA practitioner newsletter · Building the bridge between TradFi and crypto", year: "Next" },
];

const MY_ACHIEVEMENTS = [
  { area: "Professional", items: ["Head of Treasury at MiCA-regulated crypto fintech", "Product Owner — Satoshi Bridge Fund", "Built banking relationships in the hardest industry to bank", "Deep MiCA regulatory expertise during critical adoption window"] },
  { area: "Athletic", items: ["16+ years elite competitive ultimate frisbee", "4 countries, 5 seasons as club captain", "WUCC competitor · World Beach Championship bronze", "Windmill Windup silver · Multiple Czech national titles", "Rhino Slam! (2024 US national champions)"] },
  { area: "Building", items: ["AI Guide (promptujai.cz) — bilingual educational tool", "Personal frisbee career website", "Self-taught developer shipping real products", "Bilingual professional (Czech/English)"] },
];

const MY_FAILURES = [
  { lesson: "Over-Optimization Trap", detail: "Tendency to over-optimize strategy while delaying smaller operational wins. Perfect becomes the enemy of shipped.", reflection: "Bias toward action. Best strategy executed today beats perfect strategy executed never." },
  { lesson: "Processing Speed Gap", detail: "Identified gap in game processing speed vs US club-level play. Decision-making degrades when tempo increases.", reflection: "Deliberate practice on weaknesses. Film review. Reps under fatigue. Train the weakness, don't just polish the strength." },
  { lesson: "Monetization Delay", detail: "Rare expertise intersection identified (regulated finance + crypto + philosophical depth) but not yet acted on. High-potential consulting/content path sitting dormant.", reflection: "Ship the first version. Newsletter #1 doesn't need to be perfect. Start the flywheel." },
];

// ============================================================
// COMPONENTS
// ============================================================

function VideoCard({ video, index }) {
  const [loaded, setLoaded] = useState(false);
  const tagColors = { mindset: "#c8a951", discipline: "#e86f68", vision: "#a0c4ff", wealth: "#7ec8a0", science: "#68c8d4", meaning: "#b8a9e8", philosophy: "#e8c86a", longevity: "#d4764e" };
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      borderRadius: 16,
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.06)",
      transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      animation: `fadeUp 0.5s ease ${index * 0.04}s both`,
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.4)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.boxShadow = ""; }}
    >
      <div style={{ position: "relative", paddingTop: "56.25%", background: "#0a0a0a" }}>
        {!loaded ? (
          <div onClick={() => setLoaded(true)} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "linear-gradient(135deg, rgba(20,20,30,0.9) 0%, rgba(10,10,20,0.95) 100%)" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(200,169,81,0.15)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(200,169,81,0.25)", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,169,81,0.3)"; e.currentTarget.style.transform = "scale(1.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(200,169,81,0.15)"; e.currentTarget.style.transform = ""; }}
            >
              <span style={{ fontSize: 18, marginLeft: 2, color: "#c8a951" }}>▶</span>
            </div>
          </div>
        ) : (
          <iframe src={video.url + "?autoplay=1"} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }} allow="autoplay; encrypted-media" allowFullScreen title={video.title} />
        )}
      </div>
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 2, padding: "2px 8px", borderRadius: 4, background: (tagColors[video.tag] || "#888") + "18", color: tagColors[video.tag] || "#888", fontWeight: 600 }}>{video.tag}</span>
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: 14, lineHeight: 1.4, opacity: 0.85 }}>{video.title}</div>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle, isPrivate }) {
  return (
    <div style={{ marginBottom: 36, position: "relative" }}>
      <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 5, opacity: 0.25, marginBottom: 8, fontWeight: 500 }}>{isPrivate ? "◈ Private" : "Section"}</div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: 42, margin: 0, letterSpacing: -1, color: isPrivate ? "#d4764e" : "#e8e6e1", lineHeight: 1.1 }}>{title}</h1>
      {subtitle && <p style={{ fontSize: 14, opacity: 0.35, marginTop: 10, lineHeight: 1.6, maxWidth: 600, fontWeight: 300 }}>{subtitle}</p>}
      <div style={{ width: 40, height: 1, background: isPrivate ? "#d4764e" : "#c8a951", opacity: 0.4, marginTop: 16 }} />
    </div>
  );
}

function NoteBox({ sectionKey }) {
  const key = "dn-hub-" + sectionKey;
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    (async () => { try { const r = await window.storage.get(key); if (r?.value) setNote(r.value); } catch {} })();
  }, [key]);
  const save = async () => { try { await window.storage.set(key, note); setSaved(true); setTimeout(() => setSaved(false), 1500); } catch {} };
  return (
    <div style={{ marginTop: 32, padding: 20, background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px dashed rgba(255,255,255,0.06)" }}>
      <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 3, opacity: 0.25, marginBottom: 10 }}>Personal Notes</div>
      <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Write your thoughts..."
        style={{ width: "100%", minHeight: 80, background: "transparent", border: "none", color: "#e8e6e1", fontFamily: "'DM Sans', sans-serif", fontSize: 13, resize: "vertical", outline: "none", lineHeight: 1.7, opacity: 0.7 }} />
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
        <button onClick={save} style={{ background: saved ? "rgba(126,200,160,0.2)" : "rgba(200,169,81,0.15)", color: saved ? "#7ec8a0" : "#c8a951", border: "1px solid " + (saved ? "rgba(126,200,160,0.3)" : "rgba(200,169,81,0.25)"), padding: "7px 20px", borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase", transition: "all 0.3s" }}>
          {saved ? "✓ Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}

// ============================================================
// SECTIONS
// ============================================================

const NAV_PUBLIC = [
  { id: "motivation", label: "Motivation", icon: "⚡" },
  { id: "mindset", label: "Mindset", icon: "◎" },
  { id: "philosophy", label: "Philosophy", icon: "◈" },
  { id: "training", label: "Training", icon: "△" },
  { id: "longevity", label: "Longevity", icon: "∞" },
  { id: "books", label: "Bookshelf", icon: "▤" },
  { id: "improvement", label: "Self-Improvement", icon: "↑" },
  { id: "fire", label: "FIRE", icon: "◇" },
];

const NAV_PRIVATE = [
  { id: "my-life", label: "My Life", icon: "✦" },
  { id: "my-career", label: "Career", icon: "▧" },
  { id: "my-achievements", label: "Achievements", icon: "★" },
  { id: "my-failures", label: "Failures", icon: "✕" },
];

export default function App() {
  const [secret, setSecret] = useState(false);
  const [active, setActive] = useState("motivation");
  const [videoFilter, setVideoFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const clickRef = useRef(0);
  const timerRef = useRef(null);

  const handleLogo = useCallback(() => {
    clickRef.current++;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (clickRef.current >= 5) { setSecret(p => !p); clickRef.current = 0; return; }
    timerRef.current = setTimeout(() => { clickRef.current = 0; }, 1200);
  }, []);

  const navItems = secret ? [...NAV_PUBLIC, ...NAV_PRIVATE] : NAV_PUBLIC;
  const isPrivate = NAV_PRIVATE.some(s => s.id === active);
  const filteredVideos = videoFilter === "all" ? VIDEOS : VIDEOS.filter(v => v.tag === videoFilter);

  const content = (() => {
    switch (active) {
      case "motivation": return (
        <div>
          <SectionHeader title="Motivation" subtitle="25 videos that reset your perspective. Click play when you need to remember why you started." />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
            {VIDEO_TAGS.map(t => (
              <button key={t} onClick={() => setVideoFilter(t)} style={{
                padding: "6px 14px", borderRadius: 20, fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s", border: "1px solid",
                background: videoFilter === t ? "rgba(200,169,81,0.15)" : "transparent",
                color: videoFilter === t ? "#c8a951" : "rgba(232,230,225,0.35)",
                borderColor: videoFilter === t ? "rgba(200,169,81,0.3)" : "rgba(255,255,255,0.06)",
              }}>{t}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {filteredVideos.map((v, i) => <VideoCard key={v.id} video={v} index={i} />)}
          </div>
          <NoteBox sectionKey="motivation" />
        </div>
      );

      case "mindset": return (
        <div>
          <SectionHeader title="Mindset" subtitle="Words that rewire how you think. Read one before every important decision." />
          <div style={{ columns: "340px 2", gap: 16 }}>
            {MINDSET.map((m, i) => (
              <div key={i} style={{ breakInside: "avoid", marginBottom: 16, padding: "24px 28px", background: "rgba(255,255,255,0.03)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", position: "relative", animation: `fadeUp 0.5s ease ${i * 0.06}s both` }}>
                <div style={{ position: "absolute", top: 16, left: 20, fontSize: 40, opacity: 0.06, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>"</div>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17, lineHeight: 1.7, fontStyle: "italic", opacity: 0.75, position: "relative", zIndex: 1 }}>{m.quote}</div>
                <div style={{ marginTop: 14, fontSize: 11, textTransform: "uppercase", letterSpacing: 3, opacity: 0.3 }}>— {m.author}</div>
              </div>
            ))}
          </div>
          <NoteBox sectionKey="mindset" />
        </div>
      );

      case "philosophy": return (
        <div>
          <SectionHeader title="Philosophy" subtitle="Timeless frameworks for navigating chaos. Expand any card." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
            {PHILOSOPHY.map((c, i) => <PhiloCard key={i} card={c} index={i} />)}
          </div>
          <NoteBox sectionKey="philosophy" />
        </div>
      );

      case "training": return (
        <div>
          <SectionHeader title="Training" subtitle="Systematic physical preparation. HRV-guided, evidence-based, sport-specific." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {TRAINING.map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)", animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span style={{ color: "#c8a951", fontSize: 18 }}>{s.icon}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 20 }}>{s.title}</span>
                </div>
                <div style={{ fontSize: 11, opacity: 0.3, marginBottom: 14, textTransform: "uppercase", letterSpacing: 2 }}>{s.desc}</div>
                {s.items.map((item, j) => (
                  <div key={j} style={{ fontSize: 13, opacity: 0.55, padding: "7px 0 7px 14px", borderLeft: "1px solid rgba(200,169,81,0.15)", marginBottom: 4, lineHeight: 1.5 }}>{item}</div>
                ))}
              </div>
            ))}
          </div>
          <NoteBox sectionKey="training" />
        </div>
      );

      case "longevity": return (
        <div>
          <SectionHeader title="Longevity" subtitle="Healthspan > Lifespan. Evidence-based protocols for the long game." />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {LONGEVITY.map((item, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: "22px 26px", border: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 20, alignItems: "flex-start", animation: `fadeUp 0.5s ease ${i * 0.06}s both` }}>
                <span style={{ fontSize: 22, opacity: 0.2, marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 18, marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontSize: 13, opacity: 0.5, lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <NoteBox sectionKey="longevity" />
        </div>
      );

      case "books": return (
        <div>
          <SectionHeader title="Bookshelf" subtitle="Books that changed how I think. Curated, not collected." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
            {BOOK_SHELF.map((b, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: "20px 18px", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.3s", animation: `fadeUp 0.4s ease ${i * 0.04}s both` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(200,169,81,0.2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = ""; }}
              >
                <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 2, opacity: 0.25, marginBottom: 10, color: "#c8a951" }}>{b.category}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 16, lineHeight: 1.3, marginBottom: 6 }}>{b.title}</div>
                <div style={{ fontSize: 12, opacity: 0.35 }}>{b.author}</div>
              </div>
            ))}
          </div>
          <NoteBox sectionKey="books" />
        </div>
      );

      case "improvement": return (
        <div>
          <SectionHeader title="Self-Improvement" subtitle="Systems over goals. Identity over outcomes. Compound daily." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
            {SELF_IMPROVEMENT.map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)", borderTop: `2px solid ${s.color}22`, animation: `fadeUp 0.5s ease ${i * 0.06}s both` }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 20, marginBottom: 14, color: s.color }}>{s.title}</div>
                {s.items.map((p, j) => (
                  <div key={j} style={{ fontSize: 13, opacity: 0.5, padding: "6px 0 6px 14px", borderLeft: `1px solid ${s.color}33`, marginBottom: 6, lineHeight: 1.5 }}>{p}</div>
                ))}
              </div>
            ))}
          </div>
          <NoteBox sectionKey="improvement" />
        </div>
      );

      case "fire": return (
        <div>
          <SectionHeader title="Financial Freedom" subtitle="FIRE fundamentals. Build the machine, then let it run." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
            {FIRE.map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)", animation: `fadeUp 0.5s ease ${i * 0.06}s both` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ color: "#c8a951", fontSize: 16 }}>{s.icon}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 18 }}>{s.title}</span>
                </div>
                <div style={{ fontSize: 13, opacity: 0.5, lineHeight: 1.7 }}>{s.content}</div>
              </div>
            ))}
          </div>
          <NoteBox sectionKey="fire" />
        </div>
      );

      // PRIVATE
      case "my-life": return (
        <div>
          <SectionHeader title="My Life" subtitle="Who I am. What I stand for. Where I'm going." isPrivate />
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {MY_LIFE.map((item, i) => (
              <div key={i} style={{ background: "rgba(212,118,78,0.04)", borderRadius: 16, padding: "22px 26px", border: "1px solid rgba(212,118,78,0.1)", borderLeft: "3px solid rgba(212,118,78,0.4)", animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}>
                <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 3, color: "#d4764e", marginBottom: 8, fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.7 }}>{item.text}</div>
              </div>
            ))}
          </div>
          <NoteBox sectionKey="my-life" />
        </div>
      );

      case "my-career": return (
        <div>
          <SectionHeader title="My Career" subtitle="Not linear — but intentional." isPrivate />
          <div style={{ position: "relative", paddingLeft: 32 }}>
            <div style={{ position: "absolute", left: 9, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, rgba(212,118,78,0.4), rgba(212,118,78,0.05))" }} />
            {MY_CAREER.map((item, i) => (
              <div key={i} style={{ position: "relative", marginBottom: 20, animation: `fadeUp 0.5s ease ${i * 0.1}s both` }}>
                <div style={{ position: "absolute", left: -28, top: 8, width: 10, height: 10, borderRadius: "50%", background: "#d4764e", boxShadow: "0 0 12px rgba(212,118,78,0.3)" }} />
                <div style={{ background: "rgba(212,118,78,0.04)", borderRadius: 14, padding: "16px 22px", border: "1px solid rgba(212,118,78,0.08)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 16, color: "#d4764e" }}>{item.phase}</span>
                    <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 2, opacity: 0.25 }}>{item.year}</span>
                  </div>
                  <div style={{ fontSize: 13, opacity: 0.6, lineHeight: 1.6 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
          <NoteBox sectionKey="my-career" />
        </div>
      );

      case "my-achievements": return (
        <div>
          <SectionHeader title="Achievements" subtitle="Evidence of effort compounding." isPrivate />
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {MY_ACHIEVEMENTS.map((g, i) => (
              <div key={i} style={{ background: "rgba(212,118,78,0.04)", borderRadius: 16, padding: 24, border: "1px solid rgba(212,118,78,0.08)", animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 18, color: "#d4764e", marginBottom: 14 }}>{g.area}</div>
                {g.items.map((item, j) => (
                  <div key={j} style={{ fontSize: 13, opacity: 0.6, padding: "6px 0 6px 16px", borderLeft: "1px solid rgba(212,118,78,0.15)", marginBottom: 4, lineHeight: 1.5 }}>
                    <span style={{ color: "#d4764e", marginRight: 8, fontSize: 10 }}>★</span>{item}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <NoteBox sectionKey="my-achievements" />
        </div>
      );

      case "my-failures": return (
        <div>
          <SectionHeader title="Failures" subtitle="The most important section. Radical self-honesty. Every failure is data." isPrivate />
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {MY_FAILURES.map((f, i) => (
              <div key={i} style={{ background: "rgba(212,118,78,0.04)", borderRadius: 16, padding: 24, border: "1px solid rgba(212,118,78,0.08)", animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 18, marginBottom: 8 }}>{f.lesson}</div>
                <div style={{ fontSize: 13, opacity: 0.5, lineHeight: 1.7, marginBottom: 14 }}>{f.detail}</div>
                <div style={{ padding: "14px 18px", background: "rgba(212,118,78,0.06)", borderRadius: 10, fontSize: 13, lineHeight: 1.6, opacity: 0.65 }}>
                  <span style={{ color: "#d4764e", fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: 2 }}>Reflection</span>
                  <div style={{ marginTop: 6, fontStyle: "italic" }}>{f.reflection}</div>
                </div>
              </div>
            ))}
          </div>
          <NoteBox sectionKey="my-failures" />
        </div>
      );

      default: return null;
    }
  })();

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", background: "#08080b", color: "#e8e6e1", minHeight: "100vh", display: "flex", position: "relative" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Mobile toggle */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mob-btn" style={{ display: "none", position: "fixed", top: 14, left: 14, zIndex: 1001, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 14px", color: "#e8e6e1", cursor: "pointer", fontSize: 16, backdropFilter: "blur(12px)" }}>☰</button>

      {/* Overlay */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 998, backdropFilter: "blur(4px)" }} />}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`} style={{
        width: 220, minHeight: "100vh", background: "rgba(12,12,16,0.95)", borderRight: "1px solid rgba(255,255,255,0.04)",
        padding: "28px 14px", display: "flex", flexDirection: "column", position: "sticky", top: 0,
        height: "100vh", overflowY: "auto", flexShrink: 0, backdropFilter: "blur(20px)", zIndex: 999,
      }}>
        {/* Logo */}
        <div onClick={handleLogo} style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 28, cursor: "default",
          userSelect: "none", padding: "0 10px", marginBottom: 2, letterSpacing: 4,
          color: secret ? "#d4764e" : "#c8a951", transition: "color 0.6s ease",
        }}>DN</div>
        <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 4, opacity: 0.2, padding: "0 10px", marginBottom: 32 }}>
          {secret ? "Private Mode" : "Personal Hub"}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 8, textTransform: "uppercase", letterSpacing: 4, opacity: 0.15, padding: "0 10px", marginBottom: 10 }}>Explore</div>
          {NAV_PUBLIC.map(s => (
            <div key={s.id} onClick={() => { setActive(s.id); setSidebarOpen(false); }} style={{
              padding: "8px 12px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 400,
              marginBottom: 1, display: "flex", alignItems: "center", gap: 10, transition: "all 0.25s",
              background: active === s.id ? "rgba(200,169,81,0.08)" : "transparent",
              color: active === s.id ? "#c8a951" : "rgba(232,230,225,0.35)",
            }}
            onMouseEnter={e => { if (active !== s.id) e.currentTarget.style.color = "rgba(232,230,225,0.6)"; }}
            onMouseLeave={e => { if (active !== s.id) e.currentTarget.style.color = "rgba(232,230,225,0.35)"; }}
            >
              <span style={{ fontSize: 12, width: 18, textAlign: "center", opacity: 0.6 }}>{s.icon}</span>{s.label}
            </div>
          ))}

          {secret && (
            <>
              <div style={{ fontSize: 8, textTransform: "uppercase", letterSpacing: 4, opacity: 0.15, padding: "0 10px", marginTop: 24, marginBottom: 10, color: "#d4764e" }}>Private</div>
              {NAV_PRIVATE.map(s => (
                <div key={s.id} onClick={() => { setActive(s.id); setSidebarOpen(false); }} style={{
                  padding: "8px 12px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 400,
                  marginBottom: 1, display: "flex", alignItems: "center", gap: 10, transition: "all 0.25s",
                  background: active === s.id ? "rgba(212,118,78,0.1)" : "transparent",
                  color: active === s.id ? "#d4764e" : "rgba(232,230,225,0.3)",
                }}>
                  <span style={{ fontSize: 12, width: 18, textAlign: "center", opacity: 0.6 }}>{s.icon}</span>{s.label}
                </div>
              ))}
            </>
          )}
        </div>

        <div style={{ padding: "12px 10px", fontSize: 9, opacity: 0.12, letterSpacing: 2, textTransform: "uppercase" }}>© DN {new Date().getFullYear()}</div>
      </div>

      {/* Main */}
      <div className="main-area" style={{ flex: 1, padding: "48px 56px", maxWidth: 980, margin: "0 auto" }}>
        {content}
      </div>

      {/* Secret indicator */}
      {secret && <div style={{ position: "fixed", bottom: 20, right: 20, width: 6, height: 6, borderRadius: "50%", background: "#d4764e", animation: "pulse 2.5s ease-in-out infinite" }} />}

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:0.2; transform:scale(1); } 50% { opacity:0.7; transform:scale(1.4); } }
        @media (max-width: 768px) {
          .mob-btn { display: block !important; }
          .sidebar { position: fixed !important; transform: translateX(-100%); transition: transform 0.3s ease; }
          .sidebar.open { transform: translateX(0) !important; }
          .main-area { padding: 24px 18px !important; }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 4px; }
        ::selection { background: rgba(200,169,81,0.25); }
      `}</style>
    </div>
  );
}

function PhiloCard({ card, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{
      background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: "22px 24px", cursor: "pointer",
      border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.35s", borderLeft: `3px solid ${card.color}44`,
      animation: `fadeUp 0.5s ease ${index * 0.06}s both`,
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = `${card.color}33`; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderLeftColor = `${card.color}44`; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 20, color: card.color }}>{card.title}</div>
          <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 3, opacity: 0.2, marginTop: 3 }}>{card.school}</div>
        </div>
        <span style={{ opacity: 0.15, fontSize: 10, transform: open ? "rotate(180deg)" : "", transition: "transform 0.3s" }}>▼</span>
      </div>
      <div style={{ marginTop: 14, fontFamily: "'Cormorant Garamond', serif", fontSize: 15, opacity: 0.55, fontStyle: "italic", lineHeight: 1.6 }}>{card.core}</div>
      {open && (
        <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          {card.ideas.map((idea, i) => (
            <div key={i} style={{ fontSize: 13, opacity: 0.45, padding: "5px 0 5px 14px", borderLeft: `1px solid ${card.color}25`, marginBottom: 4 }}>{idea}</div>
          ))}
        </div>
      )}
    </div>
  );
}
