export default function About() {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center py-20 px-6 bg-slate-950 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="max-w-4xl w-full p-8 md:p-12 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-lg shadow-2xl relative z-10">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-6 uppercase tracking-wider">
          ABOUT GOURMETSCRIBE AI
        </span>

        <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight mb-6">
          Sensory Copywriting,{' '}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Automated
          </span>
        </h2>

        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-12">
          GourmetScribe AI is built specifically for food processing companies, wholesale food brands, culinary artisans, and e-commerce food distributors. 
          Standard AI models often generate dry, generic descriptions. GourmetScribe AI understands food attributes—focusing on taste, aroma, dietary compliance, texture, and bulk wholesale logistics to write copy that converts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors">
            <h4 className="text-white font-bold text-base mb-2 font-heading">Sensory Prompts</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Tailored to bring out appetizing texture, smell, and taste descriptions.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors">
            <h4 className="text-white font-bold text-base mb-2 font-heading">Compliance Aware</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Highlights clean labeling, dietary claims (gluten-free, vegan), and certifications.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors">
            <h4 className="text-white font-bold text-base mb-2 font-heading">B2B & B2C Ready</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Select target audience options to sell to either retail consumers or bulk wholesale buyers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}