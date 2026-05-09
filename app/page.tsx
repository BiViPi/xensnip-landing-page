import { HeroScrollytelling } from "./components/HeroScrollytelling";

export default function Home() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 font-sans selection:bg-emerald-500/30">
      <main>
        {/* The Scrollytelling Hero locks the viewport and plays the story */}
        <HeroScrollytelling />
        
        {/* Standard scrolling content resumes here */}
        <div id="value-props" className="relative z-10 bg-slate-950 min-h-screen flex items-center justify-center border-t border-slate-800">
          <p className="text-slate-400 text-xl font-medium tracking-wide">
            [The rest of the landing page content goes here]
          </p>
        </div>
      </main>
    </div>
  );
}
