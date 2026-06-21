import Hero from '../components/Hero';
import Card from '../components/Card';

export default function Home() {
  return (
    <>
      <Hero />

      <section className="py-16 px-6 md:px-16 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300 mb-3">
              Built for food brands and product teams
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Product description building blocks
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto leading-relaxed">
              This home page demonstrates shared components in a responsive layout with Hero, Card, Navbar, and Footer.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card
              title="Reusable feature card"
              description="This card is one of the reusable UI pieces shown in a responsive grid."
            />
            <Card
              title="Responsive layout"
              description="The content wraps correctly for mobile screens without causing horizontal scroll."
            />
            <Card
              title="Simple component structure"
              description="All shared components remain in /components and are imported where used."
            />
          </div>
        </div>
      </section>
    </>
  );
}
