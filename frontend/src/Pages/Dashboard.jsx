import { useState } from 'react';
import { Input, Button } from '../components/ui';

export default function Dashboard() {
  const [productName, setProductName] = useState('Gourmet Harvest Granola');
  const [keywords, setKeywords] = useState('artisan, gluten-free, sustainable');
  const [tone, setTone] = useState('bold');
  const [output, setOutput] = useState('Enter a product name, keywords, and tone, then click Generate Copy 🤖 to preview your first draft.');

  const generateCopy = () => {
    const trimmedProduct = productName.trim() || 'Artisan Food Product';
    const trimmedKeywords = keywords.trim() || 'premium, crafted, flavorful';
    const formattedTone = tone === 'bold' ? 'bold' : tone === 'warm' ? 'warm' : 'refined';

    return `Introducing ${trimmedProduct}: a sensorial experience crafted for modern taste makers. With ${trimmedKeywords}, every bite delivers a ${formattedTone} culinary story that celebrates texture, aroma, and unforgettable flavor. Perfect for product labels, category pages, and premium retail listings, this copy captures the craftsmanship behind your brand and invites shoppers to savor the difference.`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOutput(generateCopy());
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-14 px-6 md:px-12 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid gap-8 xl:grid-cols-[1.1fr_1fr] items-start">
        {/* Left Form Panel */}
        <section className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 p-10 shadow-xl dark:shadow-2xl dark:shadow-black/40">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-300 mb-3 font-semibold">AI Copy Lab</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
            <p className="mt-3 text-slate-600 dark:text-gray-400 leading-relaxed text-sm">
              Build premium snack and grocery copy with a single form, then preview your generated output instantly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="productName" className="block text-sm font-semibold text-slate-700 dark:text-gray-200 mb-2">
                Product Name
              </label>
              <Input
                id="productName"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Sunshine Berry Crisp"
              />
            </div>

            <div>
              <label htmlFor="keywords" className="block text-sm font-semibold text-slate-700 dark:text-gray-200 mb-2">
                Keywords
              </label>
              <Input
                id="keywords"
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g. vegan, hand-crafted, small batch"
              />
            </div>

            <div>
              <label htmlFor="tone" className="block text-sm font-semibold text-slate-700 dark:text-gray-200 mb-2">
                Tone of Voice
              </label>
              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-white py-3.5 px-5 text-slate-900 shadow-sm transition-all duration-200 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-slate-950/80 dark:text-white focus:ring-offset-2 dark:focus:ring-offset-slate-900 text-sm"
              >
                <option value="bold">Bold & Energetic</option>
                <option value="warm">Warm & Inviting</option>
                <option value="refined">Refined & Elegant</option>
              </select>
            </div>

            <Button
              type="submit"
              text="Generate Copy 🤖"
              className="w-full py-4 text-base rounded-full shadow-lg shadow-cyan-500/10"
              variant="primary"
            />
          </form>
        </section>

        {/* Right Output Panel */}
        <section className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 p-10 shadow-xl dark:shadow-2xl dark:shadow-black/40">
          <div className="mb-6 flex flex-col gap-2">
            <span className="inline-flex items-center self-start rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-300 ring-1 ring-cyan-400/10 dark:ring-cyan-400/10">
              Generated Output Preview
            </span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Your sensorial product copy</h2>
            <p className="text-slate-650 dark:text-gray-400 leading-relaxed text-sm">
              Review the draft below and fine-tune the product name, keyword set, and tone to match your brand voice.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/80 p-6 min-h-[320px] shadow-inner shadow-black/5 dark:shadow-black/25">
            <textarea
              readOnly
              value={output}
              className="w-full h-full min-h-[260px] resize-none rounded-3xl border border-slate-250 dark:border-white/10 bg-white dark:bg-slate-900/90 p-6 text-sm leading-7 text-slate-750 dark:text-gray-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
