import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// STYLES HELPER
// ============================================================
const F = { serif: 'Cormorant Garamond, Georgia, serif', sans: 'DM Sans, Helvetica Neue, sans-serif' };
const C = { gold: '#c8a951', orange: '#d4764e', bg: '#08080b', card: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.06)', text: '#e8e6e1' };

// ============================================================
// DATA — VIDEOS
// ============================================================
const VIDEOS = [
  { id:"v1", title:"David Goggins — Who's Gonna Carry The Boats", url:"https://www.youtube.com/embed/u_ktRTWMX3M", tag:"mindset" },
  { id:"v2", title:"Jocko Willink — Good", url:"https://www.youtube.com/embed/IdTMDpizis8", tag:"mindset" },
  { id:"v3", title:"Steve Jobs — Stanford Commencement", url:"https://www.youtube.com/embed/UF8uR6Z6KLc", tag:"vision" },
  { id:"v4", title:"Denzel Washington — Fall Forward", url:"https://www.youtube.com/embed/tbnzAVRZ9Xc", tag:"mindset" },
  { id:"v5", title:"Kobe Bryant — Mamba Mentality", url:"https://www.youtube.com/embed/VSceuiPBpxY", tag:"discipline" },
  { id:"v6", title:"Naval Ravikant — How To Get Rich", url:"https://www.youtube.com/embed/1-TZqOsVCNM", tag:"wealth" },
  { id:"v7", title:"Andrew Huberman — Focus & Motivation", url:"https://www.youtube.com/embed/vA50EK70whE", tag:"science" },
  { id:"v8", title:"Alex Hormozi — $100M Mindset", url:"https://www.youtube.com/embed/h2yJbMu_4mA", tag:"wealth" },
  { id:"v9", title:"Jordan Peterson — Pursue What Is Meaningful", url:"https://www.youtube.com/embed/NX2ep5fCJZ8", tag:"meaning" },
  { id:"v10", title:"Matthew McConaughey — This Is Why You're Not Happy", url:"https://www.youtube.com/embed/wD2cVhC-63I", tag:"mindset" },
  { id:"v11", title:"Arnold Schwarzenegger — 6 Rules of Success", url:"https://www.youtube.com/embed/EyhOmBPtGNM", tag:"discipline" },
  { id:"v12", title:"Ray Dalio — Principles for Success", url:"https://www.youtube.com/embed/B9XGUpQZY38", tag:"wealth" },
  { id:"v13", title:"Elon Musk — Work Ethics & Motivation", url:"https://www.youtube.com/embed/zIwLWfaAg-8", tag:"vision" },
  { id:"v14", title:"Marcus Aurelius — Meditations (Audiobook)", url:"https://www.youtube.com/embed/d5E2AQKuCyU", tag:"philosophy" },
  { id:"v15", title:"Huberman — Optimal Morning Routine", url:"https://www.youtube.com/embed/gR_f-iwUGY5", tag:"science" },
  { id:"v16", title:"Goggins — Can't Hurt Me Mindset", url:"https://www.youtube.com/embed/78I9dTB9vqM", tag:"discipline" },
  { id:"v17", title:"Tim Ferriss — Smash Fear & Learn Anything", url:"https://www.youtube.com/embed/5J6jAC6XxAI", tag:"mindset" },
  { id:"v18", title:"Peter Attia — Exercise as Medicine", url:"https://www.youtube.com/embed/jN0pRAqiUJU", tag:"longevity" },
  { id:"v19", title:"Sam Altman — How To Be Successful", url:"https://www.youtube.com/embed/CJkFnVf5Qk8", tag:"vision" },
  { id:"v20", title:"Joe Rogan — Best Motivational Speech", url:"https://www.youtube.com/embed/YTuElM6T50w", tag:"mindset" },
  { id:"v21", title:"Admiral McRaven — Make Your Bed Speech", url:"https://www.youtube.com/embed/3sK3wJAxGfs", tag:"discipline" },
  { id:"v22", title:"Lex Fridman — Meaning of Life", url:"https://www.youtube.com/embed/Osh0-J3T2nY", tag:"meaning" },
  { id:"v23", title:"Bryan Johnson — Don't Die Blueprint", url:"https://www.youtube.com/embed/1rJbOgJhPCQ", tag:"longevity" },
  { id:"v24", title:"Simon Sinek — Start With Why", url:"https://www.youtube.com/embed/u4ZoJKF_VuA", tag:"vision" },
  { id:"v25", title:"Seneca — On The Shortness Of Life", url:"https://www.youtube.com/embed/ABRN0E_mI0U", tag:"philosophy" },
];
const VIDEO_TAGS = ["all","mindset","discipline","vision","wealth","science","meaning","philosophy","longevity"];

// ============================================================
// DATA — MINDSET (themed categories, 5+ quotes each)
// ============================================================
const MINDSET_CATEGORIES = [
  { theme: "Stoic Resilience", color: "#c8a951", quotes: [
    { quote: "The impediment to action advances action. What stands in the way becomes the way.", author: "Marcus Aurelius" },
    { quote: "We suffer more often in imagination than in reality.", author: "Seneca" },
    { quote: "It is not what happens to you, but how you react to it that matters.", author: "Epictetus" },
    { quote: "You could leave life right now. Let that determine what you do and say and think.", author: "Marcus Aurelius" },
    { quote: "No man is free who is not master of himself.", author: "Epictetus" },
    { quote: "Difficulty shows what men are.", author: "Epictetus" },
  ]},
  { theme: "Discipline & Grit", color: "#e86f68", quotes: [
    { quote: "Discipline equals freedom.", author: "Jocko Willink" },
    { quote: "We are what we repeatedly do. Excellence is not an act, but a habit.", author: "Aristotle" },
    { quote: "The only easy day was yesterday.", author: "Navy SEALs" },
    { quote: "Hard choices, easy life. Easy choices, hard life.", author: "Jerzy Gregorek" },
    { quote: "You don't rise to the level of your goals. You fall to the level of your systems.", author: "James Clear" },
  ]},
  { theme: "Purpose & Meaning", color: "#b8a9e8", quotes: [
    { quote: "He who has a why to live for can bear almost any how.", author: "Friedrich Nietzsche" },
    { quote: "Life is never made unbearable by circumstances, but only by lack of meaning and purpose.", author: "Viktor Frankl" },
    { quote: "The two most important days in your life are the day you are born and the day you find out why.", author: "Mark Twain" },
    { quote: "Purpose is the place where your deep gladness meets the world's deep need.", author: "Frederick Buechner" },
    { quote: "The meaning of life is to find your gift. The purpose of life is to give it away.", author: "Pablo Picasso" },
  ]},
  { theme: "Wealth & Freedom", color: "#7ec8a0", quotes: [
    { quote: "The goal isn't more money. The goal is living life on your terms.", author: "Chris Brogan" },
    { quote: "Wealth consists not in having great possessions, but in having few wants.", author: "Epictetus" },
    { quote: "Formal education will make you a living; self-education will make you a fortune.", author: "Jim Rohn" },
    { quote: "The best investment you can make is in yourself.", author: "Warren Buffett" },
    { quote: "Rich is having money. Wealthy is having time.", author: "Margaret Bonnano" },
  ]},
  { theme: "Fear & Courage", color: "#d4764e", quotes: [
    { quote: "What we fear doing most is usually what we most need to do.", author: "Tim Ferriss" },
    { quote: "Courage is not the absence of fear, but the triumph over it.", author: "Nelson Mandela" },
    { quote: "Everything you want is on the other side of fear.", author: "Jack Canfield" },
    { quote: "A ship in harbor is safe, but that is not what ships are built for.", author: "John A. Shedd" },
    { quote: "Life shrinks or expands in proportion to one's courage.", author: "Anais Nin" },
  ]},
  { theme: "Vision & Ambition", color: "#a0c4ff", quotes: [
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { quote: "Stay hungry, stay foolish.", author: "Steve Jobs" },
    { quote: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { quote: "If you want to go fast, go alone. If you want to go far, go together.", author: "African Proverb" },
    { quote: "Think big. Start small. Act now.", author: "Robin Sharma" },
  ]},
  { theme: "Self-Mastery", color: "#e8c86a", quotes: [
    { quote: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle" },
    { quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
    { quote: "Until you make the unconscious conscious, it will direct your life and you will call it fate.", author: "Carl Jung" },
    { quote: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
    { quote: "Mastery is not a function of genius or talent. It is a function of time and intense focus.", author: "Robert Greene" },
  ]},
  { theme: "Mortality & Urgency", color: "#68c8d4", quotes: [
    { quote: "It is not that we have a short time to live, but that we waste a great deal of it.", author: "Seneca" },
    { quote: "Let us prepare our minds as if we'd come to the very end of life.", author: "Seneca" },
    { quote: "Remembering that you are going to die is the best way to avoid the trap of thinking you have something to lose.", author: "Steve Jobs" },
    { quote: "Time is the most valuable thing a man can spend.", author: "Theophrastus" },
    { quote: "The trouble is, you think you have time.", author: "Jack Kornfield" },
  ]},
  { theme: "Growth & Learning", color: "#c4a0ff", quotes: [
    { quote: "In any given moment we have two options: to step forward into growth or back into safety.", author: "Abraham Maslow" },
    { quote: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.", author: "Brian Herbert" },
    { quote: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
    { quote: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
    { quote: "I am still learning.", author: "Michelangelo, age 87" },
  ]},
  { theme: "Competition & Excellence", color: "#ff8a80", quotes: [
    { quote: "I'm not in competition with anybody but myself. My goal is to beat my last performance.", author: "Celine Dion" },
    { quote: "Excellence is never an accident. It is always the result of high intention and intelligent direction.", author: "Aristotle" },
    { quote: "Second place is just the first loser.", author: "Dale Earnhardt" },
    { quote: "The fight is won or lost far away from witnesses, behind the lines, in the gym, out there on the road.", author: "Muhammad Ali" },
    { quote: "Champions keep playing until they get it right.", author: "Billie Jean King" },
  ]},
];

// ============================================================
// DATA — PHILOSOPHY
// ============================================================
const PHILOSOPHY = [
  { title:"Marcus Aurelius", school:"Stoicism", core:"You have power over your mind — not outside events.", ideas:["Memento mori — death as urgency","The obstacle is the way","Morning premeditatio","Journal as philosophical practice"], color:"#c8a951" },
  { title:"Seneca", school:"Stoicism", core:"We suffer more in imagination than in reality.", ideas:["Premeditatio malorum","Time is the only true wealth","Voluntary discomfort","Letters as thinking tools"], color:"#a0c4ff" },
  { title:"Epictetus", school:"Stoicism", core:"It's not what happens — it's how you react.", ideas:["Dichotomy of control","We are disturbed by judgments","Freedom through discipline","Character over circumstance"], color:"#7ec8a0" },
  { title:"Viktor Frankl", school:"Existentialism", core:"Those who have a 'why' can bear any 'how'.", ideas:["Meaning found in suffering","Logotherapy framework","The last human freedom","Tragic optimism"], color:"#d4764e" },
  { title:"Nassim Taleb", school:"Antifragility", core:"Some things benefit from shocks and disorder.", ideas:["Antifragile > Resilient > Fragile","Barbell strategy","Skin in the game","Via negativa — subtract to grow"], color:"#e86f68" },
  { title:"Naval Ravikant", school:"Modern Wisdom", core:"A calm mind, a fit body, a house full of love.", ideas:["Happiness as a trainable skill","Specific knowledge via curiosity","Read what you love","Desire is suffering's contract"], color:"#b8a9e8" },
  { title:"Miyamoto Musashi", school:"Bushido", core:"There is nothing outside of yourself that can enable you to get better.", ideas:["The Way is in training","Do nothing which is of no use","Know the Ways of all professions","Perceive that which cannot be seen"], color:"#e8c86a" },
  { title:"Alan Watts", school:"Zen", core:"The meaning of life is just to be alive. It is so obvious.", ideas:["This is it — the present moment","You are the universe experiencing itself","Stop measuring, start living","The backwards law of desire"], color:"#68c8d4" },
];

// ============================================================
// DATA — TRAINING
// ============================================================
const TRAINING = [
  { title:"Strength", icon:"◆", desc:"Foundation of everything", items:["Compound lifts 3x/week — squat, deadlift, press, row","Progressive overload: +2.5% weekly","RPE-based autoregulation","Deload every 4th week","Single-leg work for sport transfer"] },
  { title:"Conditioning", icon:"◇", desc:"Engine capacity", items:["Zone 2: 150-180 min/week (nasal breathing)","VO2 max: 4x4 min at 90-95% HR max","Sport-specific cutting drills","HRV-guided intensity (Oura readiness)"] },
  { title:"Mobility", icon:"○", desc:"Move without restriction", items:["Daily 10-min movement prep","90/90 hip work, thoracic rotation","Cold exposure: 1-3 min (Huberman)","Sleep: 7.5-8.5h, consistent wake time"] },
  { title:"Ultimate", icon:"●", desc:"Sport-specific mastery", items:["Explosive first step — 10yd acceleration","5-10-5 shuttle, L-drill for COD","Disc skills under fatigue","Film review: processing speed development"] },
];

// ============================================================
// DATA — LONGEVITY (expanded with deep-dive content)
// ============================================================
const LONGEVITY_DATA = [
  { title:"Medicine 3.0", icon:"◎", desc:"Proactive not reactive healthcare", details:[
    { heading:"The Four Horsemen", text:"Cardiovascular disease, cancer, neurodegeneration, metabolic dysfunction. These four cause 80% of deaths in people over 50. Medicine 3.0 shifts from treating disease to preventing it decades before onset." },
    { heading:"Exercise as Medicine", text:"Exercise is the most potent longevity intervention we have — more powerful than any drug. It reduces risk of all four horsemen simultaneously. Strength training preserves muscle mass and bone density. Cardio improves cardiovascular and metabolic health." },
    { heading:"Marginal Decade", text:"Peter Attia's framing: the goal is not just lifespan, but healthspan — being physically and cognitively capable in your last decade. Can you carry groceries, climb stairs, get off the floor at 80?" },
    { heading:"Key Metrics", text:"ApoB, fasting insulin, HbA1c, blood pressure, DEXA body composition, VO2 max, grip strength. Track trends across years, not snapshots." },
  ]},
  { title:"Sleep Architecture", icon:"◐", desc:"Non-negotiable foundation of health", details:[
    { heading:"Why Sleep Matters", text:"Sleep is the single most effective thing you can do for brain and body health. One night of poor sleep reduces immune function by 70%. Chronic sleep debt is linked to Alzheimer's, cardiovascular disease, obesity, and depression." },
    { heading:"Sleep Hygiene Protocol", text:"Cool room (18-19C), complete darkness, consistent schedule (even weekends). No screens 60 min before bed. No caffeine after 2pm. No alcohol — even one drink disrupts deep sleep and REM architecture." },
    { heading:"Supplement Stack", text:"Magnesium threonate (crosses blood-brain barrier), apigenin (mild sedative), theanine (relaxation without drowsiness). These support sleep onset and deep sleep percentage." },
    { heading:"Tracking", text:"Use Oura Ring or Whoop to track deep sleep %, REM %, HRV trends, resting HR, sleep latency. Aim for 1.5-2h deep sleep, 1.5-2h REM per night. HRV should trend upward over months." },
  ]},
  { title:"Zone 2 Cardio", icon:"◑", desc:"Mitochondrial efficiency engine", details:[
    { heading:"What Is Zone 2?", text:"Exercise at an intensity where you can maintain a conversation but it's slightly uncomfortable. Heart rate typically 60-70% of max. You should be able to breathe through your nose." },
    { heading:"Why It Matters", text:"Zone 2 improves mitochondrial density and efficiency, fat oxidation, lactate clearance, and metabolic flexibility. It's the foundation that makes all other training possible." },
    { heading:"Protocol", text:"150-180 minutes per week, split into 3-4 sessions. Walking, cycling, rowing, or easy jogging. The key is consistency over intensity. This is the boring work that compounds over decades." },
    { heading:"Testing", text:"Lactate testing is the gold standard. Without it, use the talk test or MAF (180 minus age) formula. Heart rate drift test: if HR rises >5% during a steady-state 60-min session, you started too fast." },
  ]},
  { title:"Blood Markers", icon:"◒", desc:"Internal dashboard for longevity", details:[
    { heading:"Cardiovascular", text:"ApoB is the single most predictive CVD marker — measures the number of atherogenic particles. Target: <60 mg/dL for aggressive prevention. Lp(a) is genetically determined — know your number. hsCRP for inflammation." },
    { heading:"Metabolic", text:"Fasting insulin (most sensitive early marker of metabolic dysfunction, target <5), HbA1c (<5.3%), fasting glucose (<90), HOMA-IR (<1.0). Catch insulin resistance 10-20 years before diabetes." },
    { heading:"Other Key Markers", text:"Homocysteine (<10), ferritin (monitor iron overload), vitamin D (40-60 ng/mL), omega-3 index (>8%), thyroid panel (TSH, free T3/T4), testosterone (men: track decline)." },
    { heading:"Testing Cadence", text:"Full panel annually minimum. Quarterly if optimizing. Track trends in a spreadsheet. Context matters — single readings mean little, trends tell the story." },
  ]},
  { title:"Nutrition", icon:"◓", desc:"Fuel for performance and longevity", details:[
    { heading:"Protein Priority", text:"1.6-2.2g/kg bodyweight daily, split across 3-4 meals (30-50g per meal for optimal MPS). DIAAS > PDCAAS for quality measurement. Animal sources have higher bioavailability but plant combinations work." },
    { heading:"Protein Quality Science", text:"Lysine is the limiting amino acid in grains. Methionine/cysteine are limiting in legumes. Complementary combinations solve this: rice + beans, bread + hummus. Leucine threshold (~2.5g) triggers muscle protein synthesis." },
    { heading:"Whole Foods Base", text:"80/20 rule: 80% whole, minimally processed foods. Minimize ultra-processed food (linked to inflammation, metabolic dysfunction, overeating). Eat vegetables, fruits, quality proteins, healthy fats." },
    { heading:"Meal Timing", text:"Time-restricted eating has modest benefits but protein distribution matters more. Don't skip post-workout protein. Eating majority of carbs around training optimizes performance and recovery." },
  ]},
  { title:"Cognitive Longevity", icon:"◔", desc:"Protecting the brain for decades", details:[
    { heading:"BDNF & Neuroplasticity", text:"Brain-Derived Neurotrophic Factor — exercise is the most potent stimulator. Aerobic exercise increases BDNF 200-300%. Novel challenges, learning new skills, and social interaction also drive neuroplasticity." },
    { heading:"Risk Factors", text:"Chronic stress = neurotoxic cortisol destroying hippocampal neurons. Poor sleep = failed amyloid beta clearance (Alzheimer's risk). Metabolic dysfunction = vascular damage to brain. Social isolation = accelerated cognitive decline." },
    { heading:"Protective Factors", text:"Exercise (most important), quality sleep, omega-3 fatty acids (EPA/DHA — 2-3g/day), social connection, continuous learning, stress management (meditation, nature exposure)." },
    { heading:"Practical Protocol", text:"Learn something new weekly. Maintain deep friendships. Exercise 5x/week. Meditate 10-20 min daily. Get 7.5-8.5h sleep. Monitor metabolic health. Consider sauna (4x/week linked to reduced dementia risk)." },
  ]},
  { title:"Strength & Muscle", icon:"◕", desc:"The organ of longevity", details:[
    { heading:"Why Muscle Matters", text:"Muscle is the largest organ in the body and the primary site of glucose disposal. More muscle = better metabolic health, insulin sensitivity, bone density, fall prevention, and functional independence in old age." },
    { heading:"Minimum Effective Dose", text:"3 sessions/week, compound movements (squat, deadlift, press, row, carry). Progressive overload is non-negotiable. Even 2 sessions/week produces significant longevity benefits." },
    { heading:"Sarcopenia Prevention", text:"After 30, you lose 3-8% of muscle mass per decade without resistance training. After 60, this accelerates. The time to build your muscle reserve is NOW. You're essentially banking for your 70s and 80s." },
    { heading:"VO2 Max", text:"VO2 max is the single strongest predictor of all-cause mortality. Moving from the bottom 25th percentile to the 50th reduces mortality risk more than quitting smoking. Elite fitness (top 2.5%) = 5x reduction in mortality vs bottom 25%." },
  ]},
];

// ============================================================
// DATA — SELF IMPROVEMENT
// ============================================================
const SELF_IMPROVEMENT = [
  { title:"Atomic Habits", items:["1% daily = 37x yearly","Environment design > willpower","Habit stacking","Identity-based change: become, don't just do"], color:"#c8a951" },
  { title:"Deep Work", items:["Depth is rare and valuable","90-min deep work blocks","Ritualize the start","Embrace boredom to build attention"], color:"#a0c4ff" },
  { title:"Mental Models", items:["Inversion: what to avoid","Second-order thinking: then what?","Circle of competence","Map != territory"], color:"#7ec8a0" },
  { title:"Decision Making", items:["Reversible vs irreversible","10/10/10 rule","Pre-mortem analysis","Satisfice or maximize by type"], color:"#d4764e" },
  { title:"Energy Management", items:["Manage energy not time","Ultradian rhythms: 90-min cycles","Strategic recovery is productive","Audit energy drains weekly"], color:"#b8a9e8" },
  { title:"Learning", items:["Feynman technique: teach to learn","Spaced repetition","Interleaving > blocked practice","Sleep consolidates memory"], color:"#e86f68" },
];

// ============================================================
// DATA — FIRE
// ============================================================
const FIRE_CONCEPTS = [
  { title:"Core Math", content:"25x annual expenses = FI number. 4% safe withdrawal rate (Trinity Study). Every $1 saved = $25 less needed. Savings rate matters more than returns.", icon:"◈" },
  { title:"Investment Principles", content:"Low-cost index funds as foundation. DCA removes emotion. Asset allocation by age and risk. Rebalance annually. Ignore noise.", icon:"◇" },
  { title:"Crypto-Native Wealth", content:"Bitcoin as asymmetric bet. DCA strategy. Cold storage (Trezor). Understand cycles. Position size: only what survives -80%.", icon:"◆" },
  { title:"Passive Income", content:"Dividends, rental, digital products, consulting retainers. Stack streams. Each should run without daily input eventually.", icon:"○" },
  { title:"Tax Optimization", content:"Legal tax efficiency compounds. Understand your jurisdiction. Retirement accounts, capital gains timing, loss harvesting. Every % saved compounds.", icon:"●" },
];

// ============================================================
// DATA — BOOKS
// ============================================================
const BOOK_SHELF = [
  { title:"Meditations", author:"Marcus Aurelius", category:"Philosophy" },
  { title:"Man's Search for Meaning", author:"Viktor Frankl", category:"Philosophy" },
  { title:"Antifragile", author:"Nassim Taleb", category:"Systems" },
  { title:"Atomic Habits", author:"James Clear", category:"Performance" },
  { title:"Deep Work", author:"Cal Newport", category:"Performance" },
  { title:"Outlive", author:"Peter Attia", category:"Longevity" },
  { title:"Legacy", author:"James Kerr", category:"Leadership" },
  { title:"Mind Gym", author:"Gary Mack", category:"Sport" },
  { title:"The Almanack of Naval", author:"Eric Jorgenson", category:"Wealth" },
  { title:"Can't Hurt Me", author:"David Goggins", category:"Mindset" },
  { title:"The Bitcoin Standard", author:"Saifedean Ammous", category:"Crypto" },
  { title:"Thinking, Fast and Slow", author:"Daniel Kahneman", category:"Psychology" },
];

// ============================================================
// DATA — PRIVATE
// ============================================================
const MY_LIFE = [
  { label:"Core Values", text:"Service to others. Mastery. Autonomy. Legacy. Meaningful Challenge." },
  { label:"Identity", text:"Czech professional navigating global finance and crypto frontier. Elite athlete applying competitive frameworks across domains. Lifelong student of systems — monetary, physical, philosophical." },
  { label:"North Star", text:"Build things that outlast me. Compete at the highest level in everything I touch. Help others see what's possible when you refuse default settings." },
  { label:"Philosophy", text:"Competition as truth-seeking. Mastery as an infinite game. Crypto as epistemological challenge to institutional assumptions." },
];
const MY_CAREER = [
  { phase:"Foundation", detail:"Master's in Business Economics — rigorous analytical training", year:"Academic" },
  { phase:"Crypto Entry", detail:"Drawn by the community's willingness to challenge foundational assumptions about money and trust", year:"Transition" },
  { phase:"Invity Finance", detail:"Head of Treasury & Liquidity. Product Owner, Satoshi Bridge Fund. MiCA-regulated fintech backed by SatoshiLabs/Trezor", year:"Current" },
  { phase:"Expertise Stack", detail:"Crypto treasury ops. Banking relationships for crypto. Financial architecture. MiCA regulation", year:"Domain" },
  { phase:"Horizon", detail:"Crypto treasury consulting. MiCA practitioner newsletter. Building the bridge between TradFi and crypto", year:"Next" },
];
const MY_ACHIEVEMENTS = [
  { area:"Professional", items:["Head of Treasury at MiCA-regulated crypto fintech","Product Owner — Satoshi Bridge Fund","Built banking relationships in the hardest industry to bank","Deep MiCA regulatory expertise during critical adoption window"] },
  { area:"Athletic", items:["16+ years elite competitive ultimate frisbee","4 countries, 5 seasons as club captain","WUCC competitor. World Beach Championship bronze","Windmill Windup silver. Multiple Czech national titles","Rhino Slam! (2024 US national champions)"] },
  { area:"Building", items:["AI Guide (promptujai.cz) — bilingual educational tool","Personal frisbee career website","Self-taught developer shipping real products","Bilingual professional (Czech/English)"] },
];
const MY_FAILURES = [
  { lesson:"Over-Optimization Trap", detail:"Tendency to over-optimize strategy while delaying smaller operational wins. Perfect becomes the enemy of shipped.", reflection:"Bias toward action. Best strategy executed today beats perfect strategy executed never." },
  { lesson:"Processing Speed Gap", detail:"Identified gap in game processing speed vs US club-level play. Decision-making degrades when tempo increases.", reflection:"Deliberate practice on weaknesses. Film review. Reps under fatigue. Train the weakness, don't just polish the strength." },
  { lesson:"Monetization Delay", detail:"Rare expertise intersection identified (regulated finance + crypto + philosophical depth) but not yet acted on. High-potential consulting/content path sitting dormant.", reflection:"Ship the first version. Newsletter #1 doesn't need to be perfect. Start the flywheel." },
];

// ============================================================
// UTILITY COMPONENTS
// ============================================================

function SectionHeader({ title, subtitle, isPrivate }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 5, opacity: 0.25, marginBottom: 8, fontWeight: 500 }}>
        {isPrivate ? "Private" : "Section"}
      </div>
      <h1 style={{ fontFamily: F.serif, fontWeight: 300, fontSize: 42, margin: 0, letterSpacing: -1, color: isPrivate ? C.orange : C.text, lineHeight: 1.1 }}>{title}</h1>
      {subtitle && <p style={{ fontSize: 14, opacity: 0.35, marginTop: 10, lineHeight: 1.6, maxWidth: 600, fontWeight: 300 }}>{subtitle}</p>}
      <div style={{ width: 40, height: 1, background: isPrivate ? C.orange : C.gold, opacity: 0.4, marginTop: 16 }} />
    </div>
  );
}

function NoteBox({ sectionKey }) {
  const k = "dn-hub-" + sectionKey;
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  useEffect(() => { (async()=>{ try { const r = await window.storage.get(k); if(r?.value) setNote(r.value); } catch{} })(); }, [k]);
  const save = async()=>{ try { await window.storage.set(k, note); setSaved(true); setTimeout(()=>setSaved(false),1500); } catch{} };
  return (
    <div style={{ marginTop: 32, padding: 20, background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px dashed rgba(255,255,255,0.06)' }}>
      <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 3, opacity: 0.25, marginBottom: 10 }}>Personal Notes</div>
      <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Write your thoughts..."
        style={{ width: '100%', minHeight: 80, background: 'transparent', border: 'none', color: C.text, fontFamily: F.sans, fontSize: 13, resize: 'vertical', outline: 'none', lineHeight: 1.7, opacity: 0.7 }} />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
        <button onClick={save} style={{ background: saved ? 'rgba(126,200,160,0.2)' : 'rgba(200,169,81,0.15)', color: saved ? '#7ec8a0' : C.gold, border: '1px solid '+(saved?'rgba(126,200,160,0.3)':'rgba(200,169,81,0.25)'), padding: '7px 20px', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase', transition: 'all 0.3s' }}>
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}

function CardHover({ children, style, ...props }) {
  return (
    <div style={{ background: C.card, borderRadius: 16, border: '1px solid '+C.border, transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)', ...style }} {...props}
      onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow='0 16px 48px rgba(0,0,0,0.35)'; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow=''; }}
    >{children}</div>
  );
}

// ============================================================
// VIDEO CARD
// ============================================================
function VideoCard({ video, index }) {
  const [loaded, setLoaded] = useState(false);
  const tc = { mindset:"#c8a951", discipline:"#e86f68", vision:"#a0c4ff", wealth:"#7ec8a0", science:"#68c8d4", meaning:"#b8a9e8", philosophy:"#e8c86a", longevity:"#d4764e" };
  return (
    <div style={{ background: C.card, borderRadius: 16, overflow: 'hidden', border: '1px solid '+C.border, transition: 'all 0.35s', animation: `fadeUp 0.5s ease ${index*0.04}s both` }}
      onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 20px 60px rgba(0,0,0,0.4)'; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}>
      <div style={{ position: 'relative', paddingTop: '56.25%', background: '#0a0a0a' }}>
        {!loaded ? (
          <div onClick={()=>setLoaded(true)} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'linear-gradient(135deg, rgba(20,20,30,0.9), rgba(10,10,20,0.95))' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(200,169,81,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(200,169,81,0.25)' }}>
              <span style={{ fontSize: 18, marginLeft: 2, color: C.gold }}>&#9654;</span>
            </div>
          </div>
        ) : (
          <iframe src={video.url+"?autoplay=1"} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} allow="autoplay; encrypted-media" allowFullScreen title={video.title} />
        )}
      </div>
      <div style={{ padding: '14px 16px 16px' }}>
        <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 2, padding: '2px 8px', borderRadius: 4, background: (tc[video.tag]||'#888')+'18', color: tc[video.tag]||'#888', fontWeight: 600 }}>{video.tag}</span>
        <div style={{ fontFamily: F.serif, fontWeight: 600, fontSize: 14, lineHeight: 1.4, opacity: 0.85, marginTop: 8 }}>{video.title}</div>
      </div>
    </div>
  );
}

// ============================================================
// FIRE CALCULATOR
// ============================================================
function FIRECalculator() {
  const [age, setAge] = useState(30);
  const [income, setIncome] = useState(80000);
  const [expenses, setExpenses] = useState(40000);
  const [saved, setSaved] = useState(50000);
  const [returnRate, setReturnRate] = useState(7);

  const sr = income > 0 ? ((income - expenses) / income * 100) : 0;
  const fiNumber = expenses * 25;
  const annualSavings = income - expenses;

  const projections = [5,10,15,20,25,30,35,40].map(y => {
    const r = returnRate / 100;
    const fv = saved * Math.pow(1 + r, y) + annualSavings * ((Math.pow(1 + r, y) - 1) / r);
    return { year: y, age: age + y, value: fv, fiReached: fv >= fiNumber };
  });

  const fiYear = projections.find(p => p.fiReached);

  const inp = (label, val, set, min, max, step, prefix) => (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.35 }}>{label}</span>
        <span style={{ fontSize: 14, fontFamily: F.serif, color: C.gold }}>{prefix||''}{typeof val==='number'?val.toLocaleString():val}</span>
      </div>
      <input type="range" min={min} max={max} step={step||1} value={val} onChange={e=>set(Number(e.target.value))}
        style={{ width: '100%', accentColor: C.gold, height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 4, outline: 'none', cursor: 'pointer' }} />
    </div>
  );

  const fmt = v => v >= 1000000 ? (v/1000000).toFixed(2)+'M' : v >= 1000 ? (v/1000).toFixed(0)+'K' : v.toFixed(0);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {/* Inputs */}
        <div style={{ background: C.card, borderRadius: 16, padding: 24, border: '1px solid '+C.border }}>
          <div style={{ fontFamily: F.serif, fontSize: 18, marginBottom: 20, fontWeight: 600 }}>Your Numbers</div>
          {inp("Current Age", age, setAge, 18, 65)}
          {inp("Annual Income", income, setIncome, 10000, 500000, 5000, "$")}
          {inp("Annual Expenses", expenses, setExpenses, 10000, 300000, 5000, "$")}
          {inp("Currently Saved", saved, setSaved, 0, 2000000, 10000, "$")}
          {inp("Expected Return %", returnRate, setReturnRate, 1, 15, 0.5)}
        </div>

        {/* Summary */}
        <div style={{ background: C.card, borderRadius: 16, padding: 24, border: '1px solid '+C.border }}>
          <div style={{ fontFamily: F.serif, fontSize: 18, marginBottom: 20, fontWeight: 600 }}>FIRE Dashboard</div>
          {[
            { label: "FI Number (25x expenses)", value: "$"+fiNumber.toLocaleString(), color: C.gold },
            { label: "Annual Savings", value: "$"+annualSavings.toLocaleString(), color: annualSavings > 0 ? '#7ec8a0' : '#e86f68' },
            { label: "Savings Rate", value: sr.toFixed(1)+"%", color: sr >= 50 ? '#7ec8a0' : sr >= 25 ? C.gold : '#e86f68' },
            { label: "FI Target Age", value: fiYear ? "Age "+fiYear.age : "50+ years", color: fiYear ? '#7ec8a0' : '#e86f68' },
          ].map((m,i) => (
            <div key={i} style={{ padding: '14px 18px', background: 'rgba(255,255,255,0.02)', borderRadius: 10, marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, opacity: 0.4 }}>{m.label}</span>
              <span style={{ fontFamily: F.serif, fontSize: 18, fontWeight: 600, color: m.color }}>{m.value}</span>
            </div>
          ))}
          <div style={{ marginTop: 16, padding: '12px 16px', background: sr >= 50 ? 'rgba(126,200,160,0.06)' : 'rgba(200,169,81,0.06)', borderRadius: 10, fontSize: 12, opacity: 0.5, lineHeight: 1.6 }}>
            {sr >= 50 ? "Excellent savings rate! You're on the fast track to FI." : sr >= 25 ? "Good progress. Increasing savings rate is the biggest lever." : "Focus on reducing expenses or increasing income to accelerate your timeline."}
          </div>
        </div>
      </div>

      {/* Projection Table */}
      <div style={{ marginTop: 24, background: C.card, borderRadius: 16, padding: 24, border: '1px solid '+C.border, overflowX: 'auto' }}>
        <div style={{ fontFamily: F.serif, fontSize: 18, marginBottom: 16, fontWeight: 600 }}>Growth Projection</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 10 }}>
          {projections.map((p,i) => (
            <div key={i} style={{ padding: '16px 14px', background: p.fiReached ? 'rgba(126,200,160,0.06)' : 'rgba(255,255,255,0.02)', borderRadius: 12, textAlign: 'center', border: '1px solid '+(p.fiReached?'rgba(126,200,160,0.15)':C.border), animation: `fadeUp 0.4s ease ${i*0.05}s both` }}>
              <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.3, marginBottom: 6 }}>{p.year} Years</div>
              <div style={{ fontFamily: F.serif, fontSize: 20, fontWeight: 600, color: p.fiReached ? '#7ec8a0' : C.text }}>
                ${fmt(p.value)}
              </div>
              <div style={{ fontSize: 10, opacity: 0.25, marginTop: 4 }}>Age {p.age}</div>
              {p.fiReached && <div style={{ fontSize: 9, color: '#7ec8a0', marginTop: 6, textTransform: 'uppercase', letterSpacing: 1 }}>FI Reached</div>}
            </div>
          ))}
        </div>

        {/* Visual bar chart */}
        <div style={{ marginTop: 24, display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
          {projections.map((p,i) => {
            const maxV = Math.max(...projections.map(x=>x.value));
            const h = maxV > 0 ? (p.value / maxV) * 100 : 0;
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ fontSize: 9, opacity: 0.3 }}>${fmt(p.value)}</div>
                <div style={{ width: '100%', height: h+'%', minHeight: 4, borderRadius: '4px 4px 0 0', background: p.fiReached ? 'rgba(126,200,160,0.4)' : 'rgba(200,169,81,0.25)', transition: 'height 0.5s ease' }} />
                <div style={{ fontSize: 9, opacity: 0.2 }}>{p.year}y</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// INVESTMENT PORTFOLIO CALCULATOR
// ============================================================
function InvestmentCalculator() {
  const [stocks, setStocks] = useState(20000);
  const [crypto, setCrypto] = useState(10000);
  const [bonds, setBonds] = useState(5000);
  const [realEstate, setRealEstate] = useState(0);
  const [debt, setDebt] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(1500);

  const [stockReturn, setStockReturn] = useState(8);
  const [cryptoReturn, setCryptoReturn] = useState(15);
  const [bondReturn, setBondReturn] = useState(4);
  const [reReturn, setReReturn] = useState(6);
  const [debtRate, setDebtRate] = useState(5);

  const periods = [5,10,15,20,30,40];

  const project = (principal, annualReturn, years, monthlyAdd) => {
    const r = annualReturn / 100 / 12;
    if (r === 0) return principal + monthlyAdd * years * 12;
    return principal * Math.pow(1 + r, years * 12) + monthlyAdd * ((Math.pow(1 + r, years * 12) - 1) / r);
  };

  const totalNow = stocks + crypto + bonds + realEstate - debt;

  // Distribute monthly savings proportionally
  const totalInv = stocks + crypto + bonds + realEstate || 1;
  const ms = { s: monthlySavings * (stocks/totalInv), c: monthlySavings * (crypto/totalInv), b: monthlySavings * (bonds/totalInv), r: monthlySavings * (realEstate/totalInv) };

  const data = periods.map(y => {
    const s = project(stocks, stockReturn, y, ms.s);
    const c = project(crypto, cryptoReturn, y, ms.c);
    const b = project(bonds, bondReturn, y, ms.b);
    const r = project(realEstate, reReturn, y, ms.r);
    const d = debt * Math.pow(1 + debtRate/100, y);
    return { year: y, stocks: s, crypto: c, bonds: b, realEstate: r, debt: d, total: s+c+b+r-d };
  });

  const fmt = v => {
    if (v >= 1000000) return '$'+(v/1000000).toFixed(2)+'M';
    if (v >= 1000) return '$'+(v/1000).toFixed(0)+'K';
    return '$'+v.toFixed(0);
  };

  const inp2 = (label, val, set, max, step, suffix) => (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.35 }}>{label}</span>
        <span style={{ fontSize: 13, fontFamily: F.serif, color: C.gold }}>{suffix==='%'?val+suffix:'$'+val.toLocaleString()}</span>
      </div>
      <input type="range" min={0} max={max} step={step||1} value={val} onChange={e=>set(Number(e.target.value))}
        style={{ width: '100%', accentColor: C.gold, height: 3 }} />
    </div>
  );

  const colors = { stocks: '#7ec8a0', crypto: '#e8c86a', bonds: '#a0c4ff', realEstate: '#b8a9e8', debt: '#e86f68' };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
        {/* Holdings */}
        <div style={{ background: C.card, borderRadius: 16, padding: 22, border: '1px solid '+C.border }}>
          <div style={{ fontFamily: F.serif, fontSize: 16, marginBottom: 16, fontWeight: 600 }}>Current Holdings</div>
          {inp2("Stocks / ETFs", stocks, setStocks, 500000, 5000)}
          {inp2("Crypto", crypto, setCrypto, 500000, 1000)}
          {inp2("Bonds", bonds, setBonds, 200000, 1000)}
          {inp2("Real Estate Equity", realEstate, setRealEstate, 1000000, 10000)}
          {inp2("Total Debt", debt, setDebt, 500000, 5000)}
          {inp2("Monthly Savings", monthlySavings, setMonthlySavings, 10000, 100)}
        </div>

        {/* Return rates */}
        <div style={{ background: C.card, borderRadius: 16, padding: 22, border: '1px solid '+C.border }}>
          <div style={{ fontFamily: F.serif, fontSize: 16, marginBottom: 16, fontWeight: 600 }}>Expected Returns</div>
          {inp2("Stock Return", stockReturn, setStockReturn, 20, 0.5, "%")}
          {inp2("Crypto Return", cryptoReturn, setCryptoReturn, 30, 0.5, "%")}
          {inp2("Bond Return", bondReturn, setBondReturn, 10, 0.5, "%")}
          {inp2("Real Estate Return", reReturn, setReReturn, 15, 0.5, "%")}
          {inp2("Debt Interest Rate", debtRate, setDebtRate, 25, 0.5, "%")}

          <div style={{ marginTop: 16, padding: '14px 16px', background: 'rgba(200,169,81,0.06)', borderRadius: 10 }}>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.3, marginBottom: 6 }}>Net Worth Today</div>
            <div style={{ fontFamily: F.serif, fontSize: 24, fontWeight: 600, color: totalNow >= 0 ? '#7ec8a0' : '#e86f68' }}>
              {fmt(totalNow)}
            </div>
          </div>

          {/* Allocation donut-style */}
          <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[{l:'Stocks',v:stocks,c:colors.stocks},{l:'Crypto',v:crypto,c:colors.crypto},{l:'Bonds',v:bonds,c:colors.bonds},{l:'RE',v:realEstate,c:colors.realEstate}].filter(x=>x.v>0).map((x,i)=>(
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: x.c }} />
                <span style={{ fontSize: 10, opacity: 0.4 }}>{x.l} {totalInv>0?(x.v/totalInv*100).toFixed(0)+'%':''}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projection table */}
      <div style={{ marginTop: 20, background: C.card, borderRadius: 16, padding: 24, border: '1px solid '+C.border, overflowX: 'auto' }}>
        <div style={{ fontFamily: F.serif, fontSize: 16, marginBottom: 16, fontWeight: 600 }}>Portfolio Projection</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['Years','Stocks','Crypto','Bonds','Real Estate','Debt','Net Total'].map((h,i)=>(
                <th key={i} style={{ padding: '8px 6px', textAlign: i===0?'left':'right', fontSize: 9, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.3, fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((r,i)=>(
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', animation: `fadeUp 0.3s ease ${i*0.05}s both` }}>
                <td style={{ padding: '10px 6px', fontFamily: F.serif, fontWeight: 600, opacity: 0.7 }}>{r.year}y</td>
                <td style={{ padding: '10px 6px', textAlign: 'right', color: colors.stocks }}>{fmt(r.stocks)}</td>
                <td style={{ padding: '10px 6px', textAlign: 'right', color: colors.crypto }}>{fmt(r.crypto)}</td>
                <td style={{ padding: '10px 6px', textAlign: 'right', color: colors.bonds }}>{fmt(r.bonds)}</td>
                <td style={{ padding: '10px 6px', textAlign: 'right', color: colors.realEstate }}>{fmt(r.realEstate)}</td>
                <td style={{ padding: '10px 6px', textAlign: 'right', color: colors.debt }}>{r.debt>0?'-'+fmt(r.debt):'$0'}</td>
                <td style={{ padding: '10px 6px', textAlign: 'right', fontFamily: F.serif, fontWeight: 700, fontSize: 14, color: r.total>=0?'#7ec8a0':'#e86f68' }}>{fmt(r.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Bar chart */}
        <div style={{ marginTop: 20, display: 'flex', alignItems: 'flex-end', gap: 12, height: 100 }}>
          {data.map((r,i)=>{
            const mx = Math.max(...data.map(x=>x.total));
            const h = mx > 0 ? Math.max((r.total/mx)*100, 4) : 4;
            return (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 9, opacity: 0.3, marginBottom: 4 }}>{fmt(r.total)}</div>
                <div style={{ height: h+'%', minHeight: 6, borderRadius: '4px 4px 0 0', background: 'linear-gradient(to top, rgba(200,169,81,0.2), rgba(126,200,160,0.35))' }} />
                <div style={{ fontSize: 9, opacity: 0.2, marginTop: 4 }}>{r.year}y</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// LONGEVITY DEEP DIVE CARD
// ============================================================
function LongevityCard({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ animation: `fadeUp 0.5s ease ${index*0.06}s both` }}>
      <div onClick={()=>setOpen(!open)} style={{
        background: C.card, borderRadius: 16, padding: '22px 26px', border: '1px solid '+C.border, cursor: 'pointer',
        display: 'flex', gap: 20, alignItems: 'flex-start', transition: 'all 0.3s',
      }}
        onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(200,169,81,0.15)'; }}
        onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; }}
      >
        <span style={{ fontSize: 22, opacity: 0.2, marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: F.serif, fontWeight: 600, fontSize: 18 }}>{item.title}</div>
            <span style={{ fontSize: 10, opacity: 0.15, transform: open?'rotate(180deg)':'', transition: 'transform 0.3s' }}>&#9660;</span>
          </div>
          <div style={{ fontSize: 13, opacity: 0.5, lineHeight: 1.7, marginTop: 4 }}>{item.desc}</div>
        </div>
      </div>

      {open && (
        <div style={{ padding: '0 0 0 62px', marginTop: 2 }}>
          {item.details.map((d,i)=>(
            <div key={i} style={{ background: 'rgba(200,169,81,0.03)', borderRadius: 12, padding: '16px 20px', marginBottom: 6, borderLeft: '2px solid rgba(200,169,81,0.15)', animation: `fadeUp 0.3s ease ${i*0.05}s both` }}>
              <div style={{ fontFamily: F.serif, fontSize: 14, fontWeight: 600, color: C.gold, marginBottom: 6 }}>{d.heading}</div>
              <div style={{ fontSize: 12, opacity: 0.5, lineHeight: 1.7 }}>{d.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// PHILOSOPHY CARD
// ============================================================
function PhiloCard({ card, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={()=>setOpen(!open)} style={{
      background: C.card, borderRadius: 16, padding: '22px 24px', cursor: 'pointer',
      border: '1px solid '+C.border, transition: 'all 0.35s', borderLeft: `3px solid ${card.color}44`,
      animation: `fadeUp 0.5s ease ${index*0.06}s both`,
    }}
      onMouseEnter={e=>e.currentTarget.style.borderColor=card.color+'33'}
      onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.borderLeftColor=card.color+'44'; }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: F.serif, fontWeight: 600, fontSize: 20, color: card.color }}>{card.title}</div>
          <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 3, opacity: 0.2, marginTop: 3 }}>{card.school}</div>
        </div>
        <span style={{ opacity: 0.15, fontSize: 10, transform: open?'rotate(180deg)':'', transition: 'transform 0.3s' }}>&#9660;</span>
      </div>
      <div style={{ marginTop: 14, fontFamily: F.serif, fontSize: 15, opacity: 0.55, fontStyle: 'italic', lineHeight: 1.6 }}>{card.core}</div>
      {open && (
        <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          {card.ideas.map((idea,i)=>(
            <div key={i} style={{ fontSize: 13, opacity: 0.45, padding: '5px 0 5px 14px', borderLeft: `1px solid ${card.color}25`, marginBottom: 4 }}>{idea}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// NAV
// ============================================================
const NAV_PUBLIC = [
  { id:"motivation", label:"Motivation", icon:"\u26A1" },
  { id:"mindset", label:"Mindset", icon:"\u25CE" },
  { id:"philosophy", label:"Philosophy", icon:"\u25C8" },
  { id:"training", label:"Training", icon:"\u25B3" },
  { id:"longevity", label:"Longevity", icon:"\u221E" },
  { id:"books", label:"Bookshelf", icon:"\u25A4" },
  { id:"improvement", label:"Self-Improvement", icon:"\u2191" },
  { id:"fire", label:"FIRE", icon:"\u25C7" },
  { id:"fire-calc", label:"FIRE Calculator", icon:"\u25C8" },
  { id:"portfolio", label:"Portfolio", icon:"\u25A6" },
];
const NAV_PRIVATE = [
  { id:"my-life", label:"My Life", icon:"\u2726" },
  { id:"my-career", label:"Career", icon:"\u25A7" },
  { id:"my-achievements", label:"Achievements", icon:"\u2605" },
  { id:"my-failures", label:"Failures", icon:"\u2715" },
];

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [secret, setSecret] = useState(false);
  const [active, setActive] = useState("motivation");
  const [videoFilter, setVideoFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mindsetCat, setMindsetCat] = useState(0);
  const clickRef = useRef(0);
  const timerRef = useRef(null);

  const handleLogo = useCallback(() => {
    clickRef.current++;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (clickRef.current >= 5) { setSecret(p=>!p); clickRef.current = 0; return; }
    timerRef.current = setTimeout(() => { clickRef.current = 0; }, 1200);
  }, []);

  const isPrivate = NAV_PRIVATE.some(s=>s.id===active);
  const filteredVideos = videoFilter === "all" ? VIDEOS : VIDEOS.filter(v => v.tag === videoFilter);

  const renderSection = () => {
    switch(active) {

    case "motivation": return (
      <div>
        <SectionHeader title="Motivation" subtitle="25 videos that reset your perspective. Click play when you need to remember why you started." />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {VIDEO_TAGS.map(t=>(
            <button key={t} onClick={()=>setVideoFilter(t)} style={{
              padding: '6px 14px', borderRadius: 20, fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s', border: '1px solid',
              background: videoFilter===t ? 'rgba(200,169,81,0.15)' : 'transparent',
              color: videoFilter===t ? C.gold : 'rgba(232,230,225,0.35)',
              borderColor: videoFilter===t ? 'rgba(200,169,81,0.3)' : 'rgba(255,255,255,0.06)',
            }}>{t}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {filteredVideos.map((v,i)=><VideoCard key={v.id} video={v} index={i} />)}
        </div>
        <NoteBox sectionKey="motivation" />
      </div>
    );

    case "mindset": return (
      <div>
        <SectionHeader title="Mindset" subtitle="10 themed collections. 50+ quotes that rewire how you think." />
        {/* Category tabs */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 28 }}>
          {MINDSET_CATEGORIES.map((cat,i)=>(
            <button key={i} onClick={()=>setMindsetCat(i)} style={{
              padding: '6px 14px', borderRadius: 20, fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s',
              border: '1px solid', background: mindsetCat===i ? cat.color+'20' : 'transparent',
              color: mindsetCat===i ? cat.color : 'rgba(232,230,225,0.3)',
              borderColor: mindsetCat===i ? cat.color+'40' : 'rgba(255,255,255,0.06)',
            }}>{cat.theme}</button>
          ))}
        </div>
        {/* Quotes for selected category */}
        <div style={{ columns: '340px 2', gap: 16 }}>
          {MINDSET_CATEGORIES[mindsetCat].quotes.map((m,i)=>(
            <div key={i} style={{ breakInside: 'avoid', marginBottom: 16, padding: '24px 28px', background: C.card, borderRadius: 16, border: '1px solid '+C.border, position: 'relative', borderLeft: `3px solid ${MINDSET_CATEGORIES[mindsetCat].color}33`, animation: `fadeUp 0.4s ease ${i*0.06}s both` }}>
              <div style={{ position: 'absolute', top: 12, left: 18, fontSize: 44, opacity: 0.05, fontFamily: F.serif, fontWeight: 700 }}>{"\u201C"}</div>
              <div style={{ fontFamily: F.serif, fontSize: 17, lineHeight: 1.7, fontStyle: 'italic', opacity: 0.75, position: 'relative', zIndex: 1 }}>{m.quote}</div>
              <div style={{ marginTop: 14, fontSize: 11, textTransform: 'uppercase', letterSpacing: 3, opacity: 0.3 }}>{"\u2014"} {m.author}</div>
            </div>
          ))}
        </div>
        <NoteBox sectionKey="mindset" />
      </div>
    );

    case "philosophy": return (
      <div>
        <SectionHeader title="Philosophy" subtitle="Timeless frameworks for navigating chaos. Expand any card." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {PHILOSOPHY.map((c,i)=><PhiloCard key={i} card={c} index={i} />)}
        </div>
        <NoteBox sectionKey="philosophy" />
      </div>
    );

    case "training": return (
      <div>
        <SectionHeader title="Training" subtitle="Systematic physical preparation. HRV-guided, evidence-based, sport-specific." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {TRAINING.map((s,i)=>(
            <div key={i} style={{ background: C.card, borderRadius: 16, padding: 24, border: '1px solid '+C.border, animation: `fadeUp 0.5s ease ${i*0.08}s both` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span style={{ color: C.gold, fontSize: 18 }}>{s.icon}</span>
                <span style={{ fontFamily: F.serif, fontWeight: 600, fontSize: 20 }}>{s.title}</span>
              </div>
              <div style={{ fontSize: 11, opacity: 0.3, marginBottom: 14, textTransform: 'uppercase', letterSpacing: 2 }}>{s.desc}</div>
              {s.items.map((item,j)=>(
                <div key={j} style={{ fontSize: 13, opacity: 0.55, padding: '7px 0 7px 14px', borderLeft: '1px solid rgba(200,169,81,0.15)', marginBottom: 4, lineHeight: 1.5 }}>{item}</div>
              ))}
            </div>
          ))}
        </div>
        <NoteBox sectionKey="training" />
      </div>
    );

    case "longevity": return (
      <div>
        <SectionHeader title="Longevity" subtitle="Healthspan > Lifespan. Click any topic to explore the research." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {LONGEVITY_DATA.map((item,i)=><LongevityCard key={i} item={item} index={i} />)}
        </div>
        <NoteBox sectionKey="longevity" />
      </div>
    );

    case "books": return (
      <div>
        <SectionHeader title="Bookshelf" subtitle="Books that changed how I think. Curated, not collected." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
          {BOOK_SHELF.map((b,i)=>(
            <CardHover key={i} style={{ padding: '20px 18px', animation: `fadeUp 0.4s ease ${i*0.04}s both` }}>
              <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.25, marginBottom: 10, color: C.gold }}>{b.category}</div>
              <div style={{ fontFamily: F.serif, fontWeight: 600, fontSize: 16, lineHeight: 1.3, marginBottom: 6 }}>{b.title}</div>
              <div style={{ fontSize: 12, opacity: 0.35 }}>{b.author}</div>
            </CardHover>
          ))}
        </div>
        <NoteBox sectionKey="books" />
      </div>
    );

    case "improvement": return (
      <div>
        <SectionHeader title="Self-Improvement" subtitle="Systems over goals. Identity over outcomes. Compound daily." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {SELF_IMPROVEMENT.map((s,i)=>(
            <div key={i} style={{ background: C.card, borderRadius: 16, padding: 24, border: '1px solid '+C.border, borderTop: `2px solid ${s.color}22`, animation: `fadeUp 0.5s ease ${i*0.06}s both` }}>
              <div style={{ fontFamily: F.serif, fontWeight: 600, fontSize: 20, marginBottom: 14, color: s.color }}>{s.title}</div>
              {s.items.map((p,j)=>(
                <div key={j} style={{ fontSize: 13, opacity: 0.5, padding: '6px 0 6px 14px', borderLeft: `1px solid ${s.color}33`, marginBottom: 6, lineHeight: 1.5 }}>{p}</div>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {FIRE_CONCEPTS.map((s,i)=>(
            <div key={i} style={{ background: C.card, borderRadius: 16, padding: 24, border: '1px solid '+C.border, animation: `fadeUp 0.5s ease ${i*0.06}s both` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ color: C.gold, fontSize: 16 }}>{s.icon}</span>
                <span style={{ fontFamily: F.serif, fontWeight: 600, fontSize: 18 }}>{s.title}</span>
              </div>
              <div style={{ fontSize: 13, opacity: 0.5, lineHeight: 1.7 }}>{s.content}</div>
            </div>
          ))}
        </div>
        <NoteBox sectionKey="fire" />
      </div>
    );

    case "fire-calc": return (
      <div>
        <SectionHeader title="FIRE Calculator" subtitle="Model your path to financial independence. Adjust the sliders to see projections across 5-40 years." />
        <FIRECalculator />
        <NoteBox sectionKey="fire-calc" />
      </div>
    );

    case "portfolio": return (
      <div>
        <SectionHeader title="Portfolio Projector" subtitle="Stocks, crypto, bonds, real estate, debt. See how your allocation grows across decades." />
        <InvestmentCalculator />
        <NoteBox sectionKey="portfolio" />
      </div>
    );

    // PRIVATE
    case "my-life": return (
      <div>
        <SectionHeader title="My Life" subtitle="Who I am. What I stand for. Where I'm going." isPrivate />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {MY_LIFE.map((item,i)=>(
            <div key={i} style={{ background: 'rgba(212,118,78,0.04)', borderRadius: 16, padding: '22px 26px', border: '1px solid rgba(212,118,78,0.1)', borderLeft: '3px solid rgba(212,118,78,0.4)', animation: `fadeUp 0.5s ease ${i*0.08}s both` }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 3, color: C.orange, marginBottom: 8, fontWeight: 600 }}>{item.label}</div>
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
        <div style={{ position: 'relative', paddingLeft: 32 }}>
          <div style={{ position: 'absolute', left: 9, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, rgba(212,118,78,0.4), rgba(212,118,78,0.05))' }} />
          {MY_CAREER.map((item,i)=>(
            <div key={i} style={{ position: 'relative', marginBottom: 20, animation: `fadeUp 0.5s ease ${i*0.1}s both` }}>
              <div style={{ position: 'absolute', left: -28, top: 8, width: 10, height: 10, borderRadius: '50%', background: C.orange, boxShadow: '0 0 12px rgba(212,118,78,0.3)' }} />
              <div style={{ background: 'rgba(212,118,78,0.04)', borderRadius: 14, padding: '16px 22px', border: '1px solid rgba(212,118,78,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontFamily: F.serif, fontWeight: 600, fontSize: 16, color: C.orange }}>{item.phase}</span>
                  <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.25 }}>{item.year}</span>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {MY_ACHIEVEMENTS.map((g,i)=>(
            <div key={i} style={{ background: 'rgba(212,118,78,0.04)', borderRadius: 16, padding: 24, border: '1px solid rgba(212,118,78,0.08)', animation: `fadeUp 0.5s ease ${i*0.08}s both` }}>
              <div style={{ fontFamily: F.serif, fontWeight: 600, fontSize: 18, color: C.orange, marginBottom: 14 }}>{g.area}</div>
              {g.items.map((item,j)=>(
                <div key={j} style={{ fontSize: 13, opacity: 0.6, padding: '6px 0 6px 16px', borderLeft: '1px solid rgba(212,118,78,0.15)', marginBottom: 4, lineHeight: 1.5 }}>
                  <span style={{ color: C.orange, marginRight: 8, fontSize: 10 }}>{"\u2605"}</span>{item}
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {MY_FAILURES.map((f,i)=>(
            <div key={i} style={{ background: 'rgba(212,118,78,0.04)', borderRadius: 16, padding: 24, border: '1px solid rgba(212,118,78,0.08)', animation: `fadeUp 0.5s ease ${i*0.08}s both` }}>
              <div style={{ fontFamily: F.serif, fontWeight: 600, fontSize: 18, marginBottom: 8 }}>{f.lesson}</div>
              <div style={{ fontSize: 13, opacity: 0.5, lineHeight: 1.7, marginBottom: 14 }}>{f.detail}</div>
              <div style={{ padding: '14px 18px', background: 'rgba(212,118,78,0.06)', borderRadius: 10, fontSize: 13, lineHeight: 1.6, opacity: 0.65 }}>
                <span style={{ color: C.orange, fontWeight: 700, fontSize: 10, textTransform: 'uppercase', letterSpacing: 2 }}>Reflection</span>
                <div style={{ marginTop: 6, fontStyle: 'italic' }}>{f.reflection}</div>
              </div>
            </div>
          ))}
        </div>
        <NoteBox sectionKey="my-failures" />
      </div>
    );

    default: return null;
    }
  };

  return (
    <div style={{ fontFamily: F.sans, background: C.bg, color: C.text, minHeight: '100vh', display: 'flex', position: 'relative' }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <button onClick={()=>setSidebarOpen(!sidebarOpen)} className="mob-btn" style={{ display: 'none', position: 'fixed', top: 14, left: 14, zIndex: 1001, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '10px 14px', color: C.text, cursor: 'pointer', fontSize: 16, backdropFilter: 'blur(12px)' }}>{"\u2630"}</button>

      {sidebarOpen && <div onClick={()=>setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 998, backdropFilter: 'blur(4px)' }} />}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen?'open':''}`} style={{
        width: 220, minHeight: '100vh', background: 'rgba(12,12,16,0.95)', borderRight: '1px solid rgba(255,255,255,0.04)',
        padding: '28px 14px', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0,
        height: '100vh', overflowY: 'auto', flexShrink: 0, backdropFilter: 'blur(20px)', zIndex: 999,
      }}>
        <div onClick={handleLogo} style={{ fontFamily: F.serif, fontWeight: 300, fontSize: 28, cursor: 'default', userSelect: 'none', padding: '0 10px', marginBottom: 2, letterSpacing: 4, color: secret ? C.orange : C.gold, transition: 'color 0.6s ease' }}>DN</div>
        <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 4, opacity: 0.2, padding: '0 10px', marginBottom: 32 }}>
          {secret ? 'Private Mode' : 'Personal Hub'}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: 4, opacity: 0.15, padding: '0 10px', marginBottom: 10 }}>Explore</div>
          {NAV_PUBLIC.map(s=>(
            <div key={s.id} onClick={()=>{ setActive(s.id); setSidebarOpen(false); }} style={{
              padding: '8px 12px', borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: 400,
              marginBottom: 1, display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.25s',
              background: active===s.id ? 'rgba(200,169,81,0.08)' : 'transparent',
              color: active===s.id ? C.gold : 'rgba(232,230,225,0.35)',
            }}
              onMouseEnter={e=>{ if(active!==s.id) e.currentTarget.style.color='rgba(232,230,225,0.6)'; }}
              onMouseLeave={e=>{ if(active!==s.id) e.currentTarget.style.color='rgba(232,230,225,0.35)'; }}>
              <span style={{ fontSize: 12, width: 18, textAlign: 'center', opacity: 0.6 }}>{s.icon}</span>{s.label}
            </div>
          ))}

          {secret && (
            <>
              <div style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: 4, opacity: 0.15, padding: '0 10px', marginTop: 24, marginBottom: 10, color: C.orange }}>Private</div>
              {NAV_PRIVATE.map(s=>(
                <div key={s.id} onClick={()=>{ setActive(s.id); setSidebarOpen(false); }} style={{
                  padding: '8px 12px', borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: 400,
                  marginBottom: 1, display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.25s',
                  background: active===s.id ? 'rgba(212,118,78,0.1)' : 'transparent',
                  color: active===s.id ? C.orange : 'rgba(232,230,225,0.3)',
                }}>
                  <span style={{ fontSize: 12, width: 18, textAlign: 'center', opacity: 0.6 }}>{s.icon}</span>{s.label}
                </div>
              ))}
            </>
          )}
        </div>
        <div style={{ padding: '12px 10px', fontSize: 9, opacity: 0.12, letterSpacing: 2, textTransform: 'uppercase' }}>{"\u00A9"} DN {new Date().getFullYear()}</div>
      </div>

      {/* Main */}
      <div className="main-area" style={{ flex: 1, padding: '48px 56px', maxWidth: 1020, margin: '0 auto' }}>
        {renderSection()}
      </div>

      {secret && <div style={{ position: 'fixed', bottom: 20, right: 20, width: 6, height: 6, borderRadius: '50%', background: C.orange, animation: 'pulse 2.5s ease-in-out infinite' }} />}

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:0.2; transform:scale(1); } 50% { opacity:0.7; transform:scale(1.4); } }
        @media (max-width:768px) {
          .mob-btn { display:block !important; }
          .sidebar { position:fixed !important; transform:translateX(-100%); transition:transform 0.3s ease; }
          .sidebar.open { transform:translateX(0) !important; }
          .main-area { padding:24px 18px !important; }
        }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.06); border-radius:4px; }
        ::selection { background:rgba(200,169,81,0.25); }
        input[type=range] { -webkit-appearance:none; appearance:none; background:rgba(255,255,255,0.06); border-radius:4px; outline:none; cursor:pointer; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:14px; height:14px; border-radius:50%; background:#c8a951; cursor:pointer; border:2px solid #08080b; }
      `}</style>
    </div>
  );
}
