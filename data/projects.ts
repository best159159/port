export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  gradient: string;
  gradientClasses: string;
  screenshot: string;
  screenshotMobile?: string;
  features: string[];
  problem: string;
  solution: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Sentinel AI",
    description: "AI-powered community safety platform — real-time disaster mapping, incident reporting, and proximity alerts.",
    longDescription:
      "Sentinel AI is a smart community safety platform using GPT-5 mini for real-time incident analysis, live map updates, and proximity-based emergency alerts. Built to prove a solo builder can ship production-grade software — no team, no budget, just focused execution.",
    tags: ["Next.js", "Python", "OpenAI", "Maps API"],
    liveUrl: "https://sentinel-ai-orcin.vercel.app",
    githubUrl: "https://github.com/best159159/Sentinel-Ai",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #312e81 100%)",
    gradientClasses: "from-violet-900 via-purple-800 to-indigo-900",
    screenshot: "/screenshots/sentinel1.png",
    screenshotMobile: "/screenshots/sentinelmobile.png",
    features: [
      "Real-time threat detection via GPT-5 mini contextual analysis",
      "Live map with incident markers updated in real-time",
      "Proximity-based emergency alert system (<1min)",
      "Community incident reporting with AI triage",
      "Multi-tenant dashboard for administrators",
      "Mobile-first responsive design",
    ],
    problem:
      "Communities lack accessible, real-time tools to monitor and respond to local safety incidents. Existing solutions are expensive, complex, and not built for everyday people.",
    solution:
      "Sentinel AI makes community safety accessible — combining AI analysis with live mapping so anyone can report, track, and respond to incidents in under a minute.",
  },
  {
    id: 2,
    title: "GreenLens AI",
    description: "Environmental analysis platform using AI to recommend sustainable land use across all 77 provinces of Thailand.",
    longDescription:
      "GreenLens AI is a Decision Support System (DSS) that uses AI to analyze land characteristics and recommend eco-friendly plant species based on environmental impact. Covers 30+ plant species and all 77 Thai provinces — built to solve a real agricultural problem with real data.",
    tags: ["React", "Python", "AI/ML", "Geospatial"],
    liveUrl: "https://greenlens-pi.vercel.app",
    githubUrl: "https://github.com/best159159/greenlens",
    gradient: "linear-gradient(135deg, #064e3b 0%, #0f766e 50%, #164e63 100%)",
    gradientClasses: "from-emerald-900 via-teal-800 to-cyan-900",
    screenshot: "/screenshots/green1.png",
    screenshotMobile: "/screenshots/greenlensmobile.png",
    features: [
      "AI-powered land analysis for 30+ plant species",
      "Coverage across all 77 provinces of Thailand",
      "Decision Support System with environmental scoring",
      "Interactive analysis with instant AI recommendations",
      "Environmental impact assessment per crop choice",
      "Built-in DSS logic for sustainable land planning",
    ],
    problem:
      "Farmers and land planners in Thailand lack intelligent tools to determine which plants are most environmentally suitable for their specific land — leading to poor crop choices and environmental damage.",
    solution:
      "GreenLens AI analyzes land characteristics using AI and recommends the most sustainable plant options — giving farmers a data-driven decision tool that's fast, free, and actually works.",
  },
  {
    id: 3,
    title: "Amantha Hotel",
    description: "Luxury resort website with cinematic design, room showcase, and seamless reservation experience.",
    longDescription:
      "Amantha is a high-end hotel website built with pure HTML, CSS, and JavaScript — no frameworks, no shortcuts. Cinematic fullscreen room imagery, smooth scroll animations, multi-step booking flow, and pixel-perfect responsiveness. Proof that craftsmanship beats complexity.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive"],
    liveUrl: "",
    githubUrl: "https://github.com/best159159",
    gradient: "linear-gradient(135deg, #78350f 0%, #9a3412 50%, #881337 100%)",
    gradientClasses: "from-amber-900 via-orange-800 to-rose-900",
    screenshot: "/screenshots/hotel1.png",
    screenshotMobile: "/screenshots/hotelmobile.png",
    features: [
      "Cinematic fullscreen hero with parallax scroll effect",
      "Room showcase with high-quality photography layout",
      "Multi-step reservation flow",
      "Amenities and gallery sections",
      "Fully responsive across all devices",
      "Pure vanilla JS — zero framework dependencies",
    ],
    problem:
      "Most luxury hotels have websites that feel like 2012. The digital experience fails to match the physical one — so guests book through OTA platforms and the hotel loses margin on every room.",
    solution:
      "Amantha delivers a digital experience as premium as the property. Cinematic design and smooth UX are built to convert browsers into direct bookings — cutting OTA dependency.",
  },
  {
    id: 4,
    title: "Lumina Restaurant",
    description: "Michelin-star fine dining website — immersive design, online menu, and table reservation system.",
    longDescription:
      "Lumina is a full-featured restaurant website crafted for a premium fine dining brand. Appetite-triggering design, animated menu sections, online table reservation, and a gallery that makes you want to book before you finish scrolling. Every design decision drives conversion.",
    tags: ["HTML", "CSS", "JavaScript", "Animations"],
    liveUrl: "https://restuarant-azure.vercel.app",
    githubUrl: "https://github.com/best159159",
    gradient: "linear-gradient(135deg, #7f1d1d 0%, #9f1239 50%, #831843 100%)",
    gradientClasses: "from-red-900 via-rose-800 to-pink-900",
    screenshot: "/screenshots/restuarant1.png",
    screenshotMobile: "/screenshots/restuarantmobile.png",
    features: [
      "Cinematic dark-gold hero with immersive photography",
      "Animated menu sections with category filtering",
      "Online table reservation with confirmation flow",
      "Gallery and about sections with smooth transitions",
      "Chef specials and seasonal highlight sections",
      "Mobile-optimized — flawless on every screen",
    ],
    problem:
      "Restaurants lose 25-30% of revenue to delivery platforms on every order. Their own sites are too basic to compete — so customers default to apps and the restaurant bleeds margin.",
    solution:
      "Lumina creates a dining experience online good enough to own the customer relationship directly. Drive reservations. Cut commissions. Build loyalty that actually sticks.",
  },
];
