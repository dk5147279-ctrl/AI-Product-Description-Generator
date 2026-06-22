export default function About() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6 py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-center transition-colors duration-300">
      <div className="max-w-3xl rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 p-10 shadow-xl dark:shadow-2xl dark:shadow-black/30">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">About</h1>
        <p className="text-base md:text-lg text-slate-650 dark:text-gray-300 leading-relaxed">
          This About page placeholder uses the shared Navbar and Footer while keeping the main area simple and responsive.
        </p>
      </div>
    </main>
  );
}
