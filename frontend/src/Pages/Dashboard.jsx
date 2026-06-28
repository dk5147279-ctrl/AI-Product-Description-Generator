import { useState, useEffect } from 'react';
import { Input, Button, Loader } from '../components/ui';

export default function Dashboard() {
  // Input states
  const [productName, setProductName] = useState('Gourmet Harvest Granola');
  const [keywords, setKeywords] = useState('artisan, gluten-free, sustainable');
  const [tone, setTone] = useState('bold');
  const [output, setOutput] = useState('Enter a product name, keywords, and tone, then click Generate Copy 🤖 to preview your first draft.');

  // Live state hooks
  const [descriptions, setDescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Initial fetch of descriptions history
  useEffect(() => {
    const fetchDescriptions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:5000/api/descriptions');
        if (!res.ok) {
          throw new Error(`Error ${res.status}: Failed to fetch descriptions`);
        }
        const data = await res.json();
        setDescriptions(data);
      } catch (err) {
        console.error('Error fetching descriptions:', err);
        setError('Failed to connect to backend server. Make sure it is running on port 5000.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDescriptions();
  }, []);

  const generateCopy = () => {
    const trimmedProduct = productName.trim() || 'Artisan Food Product';
    const trimmedKeywords = keywords.trim() || 'premium, crafted, flavorful';
    const formattedTone = tone === 'bold' ? 'bold' : tone === 'warm' ? 'warm' : 'refined';

    return `Introducing ${trimmedProduct}: a sensorial experience crafted for modern taste makers. With ${trimmedKeywords}, every bite delivers a ${formattedTone} culinary story that celebrates texture, aroma, and unforgettable flavor. Perfect for product labels, category pages, and premium retail listings, this copy captures the craftsmanship behind your brand and invites shoppers to savor the difference.`;
  };

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const generatedContent = generateCopy();

    const payload = {
      title: productName,
      promptInput: keywords,
      tags: keywords.split(',').map(tag => tag.trim()).filter(Boolean),
      selectedTone: tone,
      generatedContent
    };

    try {
      const res = await fetch('http://localhost:5000/api/descriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: Failed to save description`);
      }

      const newItem = await res.json();
      setDescriptions(prev => [newItem, ...prev]);
      setOutput(newItem.generatedContent);
    } catch (err) {
      console.error('Error saving description:', err);
      setError('Failed to send and generate live data to Express backend.');
    } finally {
      setIsLoading(false);
    }
  };

  // Search handler
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/descriptions/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) {
        throw new Error(`Error ${res.status}: Failed to search descriptions`);
      }
      const data = await res.json();
      setDescriptions(data);
    } catch (err) {
      console.error('Error searching:', err);
      setError('Search request failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete handler
  const handleDelete = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/descriptions/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        throw new Error(`Error ${res.status}: Failed to delete description`);
      }
      setDescriptions(prev => prev.filter(d => d.id !== id));
    } catch (err) {
      console.error('Error deleting description:', err);
      setError('Failed to delete item from Express backend.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-14 px-6 md:px-12 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Error Notification */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-650 dark:text-rose-400 text-sm flex justify-between items-center animate-fade-in shadow-sm">
            <span className="font-semibold">⚠️ {error}</span>
            <button onClick={() => setError(null)} className="hover:text-rose-500 text-lg font-bold px-2 focus:outline-none">×</button>
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center justify-center gap-3 p-3 bg-violet-600/10 dark:bg-cyan-500/10 border border-violet-600/20 dark:border-cyan-500/20 rounded-2xl animate-pulse">
            <Loader size="sm" />
            <span className="text-xs font-semibold text-violet-750 dark:text-cyan-400">Communicating with Live Express API...</span>
          </div>
        )}

        {/* Dashboard Panels Grid */}
        <div className="grid gap-8 xl:grid-cols-[1.1fr_1fr] items-start">
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
                disabled={isLoading}
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
                className="w-full h-full min-h-[260px] resize-none rounded-3xl border border-slate-250 dark:border-white/10 bg-white dark:bg-slate-900/90 p-6 text-sm leading-7 text-slate-750 dark:text-gray-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none animate-fade-in"
              />
            </div>
          </section>
        </div>

        {/* Live Descriptions History Log Section */}
        <section className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 p-10 shadow-xl dark:shadow-2xl dark:shadow-black/40">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Saved History</h2>
              <p className="mt-1 text-slate-600 dark:text-gray-400 text-xs">
                Browse, search, load, or delete historical descriptions directly from the express backend.
              </p>
            </div>
            <div className="w-full md:w-80">
              <Input
                type="text"
                placeholder="Search by title or keyword..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {descriptions.length === 0 ? (
            <div className="text-center py-16 text-slate-500 dark:text-slate-450 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-3xl">
              <p className="text-sm">No saved copy history found. Create one above to get started!</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {descriptions.map((desc) => (
                <div
                  key={desc.id}
                  className="flex flex-col justify-between p-6 rounded-3xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/40 hover:shadow-lg dark:hover:bg-slate-900/60 transition-all duration-300 animate-fade-in"
                >
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                        ID: {desc.id}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase ${
                        desc.selectedTone === 'bold'
                          ? 'bg-rose-500/10 text-rose-500'
                          : desc.selectedTone === 'warm'
                          ? 'bg-amber-500/10 text-amber-500'
                          : 'bg-emerald-500/10 text-emerald-500'
                      }`}>
                        {desc.selectedTone}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-white text-base mb-2 line-clamp-1">
                      {desc.title}
                    </h3>
                    {desc.tags && desc.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {desc.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-lg bg-slate-250/60 dark:bg-white/5 text-[10px] text-slate-600 dark:text-gray-400">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-slate-600 dark:text-gray-400 line-clamp-3 mb-6 leading-relaxed">
                      {desc.generatedContent}
                    </p>
                  </div>
                  <div className="flex gap-3 pt-3 border-t border-slate-200/60 dark:border-white/5">
                    <Button
                      text="Load Preview 👁️"
                      variant="secondary"
                      className="flex-1 py-2 text-xs rounded-xl"
                      onClick={() => setOutput(desc.generatedContent)}
                    />
                    <Button
                      text="Delete 🗑️"
                      variant="secondary"
                      className="py-2 text-xs rounded-xl hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-500 text-rose-500/80"
                      onClick={() => handleDelete(desc.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
