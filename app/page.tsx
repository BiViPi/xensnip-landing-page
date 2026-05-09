import { HeroScrollytelling } from "./components/HeroScrollytelling";

export default function Home() {
  return (
    <div className="bg-[#101117] min-h-screen text-[#ededf3] font-sans selection:bg-[#5266eb]/30">
      <main>
        {/* The Scrollytelling Hero locks the viewport and plays the story */}
        <HeroScrollytelling />
        
        {/* Standard scrolling content resumes here */}
        <div id="value-props" className="relative z-10 bg-[#101117] min-h-screen flex items-center justify-center border-t border-[#393947]">
          <p className="text-[#c3c3cc] text-xl font-medium">
            [The rest of the landing page content goes here]
          </p>
        </div>
      </main>
    </div>
  );
}
