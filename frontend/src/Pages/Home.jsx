import Hero from '../components/Hero';
import Features from '../components/Features';
import Card from '../components/Card';

export default function Home() {
  return (
    <>
      <Hero />

      <section className="py-16 px-6 md:px-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-300 mb-3 font-semibold">
              Built for food brands and product teams
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              Product description building blocks
            </h2>
            <p className="mt-4 text-slate-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Transform ingredient facts and packaging cues into sensorial, retail-ready copy designed for modern food brands.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card
              title="Brand-Aligned Messaging"
              description="Create descriptions that sound like your brand while staying clear, structured, and deliciously persuasive."
            />
            <Card
              title="Nutritional Clarity"
              description="Deliver easily digestible ingredient and allergen messaging that supports compliance and buyer trust."
            />
            <Card
              title="Retail Ready"
              description="Generate product copy optimized for online catalogs, e-commerce listings, and B2B spec sheets."
            />
          </div>
        </div>
      </section>

      <Features />
    </>
  );
}
