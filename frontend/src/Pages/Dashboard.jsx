import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('Snacks & Confectionery');
  const [tone, setTone] = useState('Professional & Sensory');
  const [targetAudience, setTargetAudience] = useState('Retail Consumers');
  const [keywords, setKeywords] = useState('');
  const [keyIngredients, setKeyIngredients] = useState('');
  
  const [dietaryClaims, setDietaryClaims] = useState({
    Organic: false,
    Vegan: false,
    'Gluten-Free': false,
    'Keto-Friendly': false,
    'Non-GMO': false,
    Halal: false,
    Kosher: false,
    'Nut-Free': false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [warning, setWarning] = useState('');
  const [history, setHistory] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Fetch generation history from Express backend
  const fetchHistory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/history');
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchHistory();
  }, []);

  const handleCheckboxChange = (claim) => {
    setDietaryClaims(prev => ({
      ...prev,
      [claim]: !prev[claim]
    }));
  };

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setWarning('');

    const selectedClaims = Object.keys(dietaryClaims).filter(claim => dietaryClaims[claim]);

    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productName,
          category,
          tone,
          keywords,
          dietaryClaims: selectedClaims,
          keyIngredients,
          targetAudience
        })
      });

      if (response.ok) {
        const result = await response.json();
        setGeneratedText(result.generatedText);
        if (result.warning) {
          setWarning(result.warning);
        }
        triggerToast('✨ Description generated successfully!');
        fetchHistory(); // refresh history list
      } else {
        const errorData = await response.json();
        setGeneratedText(`❌ Error generating copy: ${errorData.error || 'Server error'}`);
      }
    } catch (error) {
      console.error('Generate Error:', error);
      setGeneratedText(`❌ Failed to connect to backend on port 5000. Please ensure the backend server is running.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText);
    triggerToast('📋 Copied to clipboard!');
  };

  const handleDownload = () => {
    if (!generatedText) return;
    const element = document.createElement("a");
    const file = new Blob([generatedText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${productName.toLowerCase().replace(/\s+/g, '-')}-description.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    triggerToast('💾 File download started!');
  };

  // Convert custom Markdown format into beautiful styled HTML
  const formatMarkdown = (text) => {
    if (!text) return '';
    let html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 style="font-family:Outfit,sans-serif;color:#fff;margin-top:1.5rem;margin-bottom:0.5rem;font-size:1.25rem;font-weight:700;">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 style="font-family:Outfit,sans-serif;color:#fff;margin-top:1.8rem;margin-bottom:0.6rem;font-size:1.45rem;font-weight:700;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:0.4rem;">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 style="font-family:Outfit,sans-serif;color:#fff;margin-top:2rem;margin-bottom:0.8rem;font-size:1.8rem;font-weight:800;">$1</h1>');
    
    // Bold & Italics
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#fff;font-weight:600;">$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Unordered lists
    html = html.replace(/^\* (.*$)/gim, '<li style="margin-left:1.2rem;list-style-type:disc;margin-bottom:0.4rem;color:#f3f4f6;">$1</li>');
    html = html.replace(/^- (.*$)/gim, '<li style="margin-left:1.2rem;list-style-type:disc;margin-bottom:0.4rem;color:#f3f4f6;">$1</li>');
    
    // Paragraph paragraphs
    html = html.split('\n\n').map(p => {
      const trimmed = p.trim();
      if (trimmed.startsWith('<li') || trimmed.startsWith('<h')) {
        return trimmed;
      }
      return `<p style="margin-bottom:1rem;line-height:1.6;color:#f3f4f6;">${trimmed}</p>`;
    }).join('\n');
    
    // Custom newline spacing
    html = html.replace(/\n/g, '<br>');
    
    return html;
  };

  const loadPastGeneration = (pastItem) => {
    setProductName(pastItem.productName || '');
    setCategory(pastItem.category || 'Snacks & Confectionery');
    setTone(pastItem.tone || 'Professional & Sensory');
    setTargetAudience(pastItem.targetAudience || 'Retail Consumers');
    setKeywords(pastItem.keywords || '');
    setKeyIngredients(pastItem.keyIngredients || '');
    
    // Reset claims
    const claimKeys = Object.keys(dietaryClaims);
    const updatedClaims = {};
    claimKeys.forEach(key => {
      updatedClaims[key] = pastItem.dietaryClaims ? pastItem.dietaryClaims.includes(key) : false;
    });
    setDietaryClaims(updatedClaims);
    setGeneratedText(pastItem.generatedText);
    setWarning('');
    triggerToast('📂 Loaded past generation!');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[85vh] bg-slate-950 text-white">
      {/* Toast Notice */}
      {showToast && (
        <div className="fixed bottom-8 right-8 z-50 px-6 py-3 rounded-lg bg-slate-900 border border-cyan-500 text-white font-medium shadow-xl shadow-cyan-500/10 animate-fade-in-up">
          {toastMessage}
        </div>
      )}

      {/* Control Sidebar (Form Panel) */}
      <div className="w-full md:w-[420px] shrink-0 border-b md:border-b-0 md:border-r border-white/5 bg-slate-900/40 backdrop-blur-md p-8 md:max-h-[85vh] overflow-y-auto">
        <h2 className="text-xl font-bold font-heading mb-1 text-white">Generator Panel</h2>
        <p className="text-xs text-gray-400 mb-8">
          Define the parameters for your food processing or consumer product.
        </p>

        <form onSubmit={handleGenerate} className="flex flex-col gap-5 text-left">
          {/* Product Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Product Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-2.5 rounded-lg bg-white/2 border border-white/5 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/15 transition-all duration-200"
              placeholder="e.g., Premium Almond Matcha Cookie" 
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          {/* Food Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Food Category</label>
            <select 
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/5 text-white focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/15 transition-all duration-200"
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Snacks & Confectionery</option>
              <option>Beverages</option>
              <option>Baked Goods</option>
              <option>Sauces, Condiments & Spreads</option>
              <option>Prepared Meals & Sides</option>
              <option>Dairy & Alternatives</option>
              <option>Plant-based/Alternative Proteins</option>
              <option>Seasonings & Ingredients</option>
            </select>
          </div>

          {/* Tone of Voice */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tone of Voice</label>
            <select 
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/5 text-white focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/15 transition-all duration-200"
              value={tone} 
              onChange={(e) => setTone(e.target.value)}
            >
              <option>Professional & Sensory</option>
              <option>Bold & Persuasive</option>
              <option>Playful & Casual</option>
              <option>Luxury & Artisanal</option>
            </select>
          </div>

          {/* Target Audience */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Target Audience</label>
            <select 
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/5 text-white focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/15 transition-all duration-200"
              value={targetAudience} 
              onChange={(e) => setTargetAudience(e.target.value)}
            >
              <option>Retail Consumers</option>
              <option>Wholesale & Foodservice Buyers</option>
              <option>Health-Conscious Shoppers</option>
              <option>Chefs & Culinary Professionals</option>
            </select>
          </div>

          {/* Key Ingredients */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Key Ingredients / Sourcing</label>
            <textarea 
              className="w-full px-4 py-2.5 rounded-lg bg-white/2 border border-white/5 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/15 transition-all duration-200 resize-none"
              rows="3"
              placeholder="e.g., Organic Japanese Matcha, Gluten-free almond flour..." 
              value={keyIngredients}
              onChange={(e) => setKeyIngredients(e.target.value)}
            />
          </div>

          {/* Keywords */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Keywords (Comma separated)</label>
            <input 
              type="text" 
              className="w-full px-4 py-2.5 rounded-lg bg-white/2 border border-white/5 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/15 transition-all duration-200"
              placeholder="e.g., stone ground, low sugar, vegan cookie" 
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>

          {/* Dietary Claims */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Dietary Claims & Certifications</label>
            <div className="grid grid-cols-2 gap-2 bg-white/1 border border-white/5 p-3 rounded-lg">
              {Object.keys(dietaryClaims).map((claim) => (
                <label key={claim} className="flex items-center gap-2 cursor-pointer group text-xs text-gray-400 hover:text-white transition-colors select-none">
                  <input 
                    type="checkbox" 
                    className="accent-violet-500 rounded border-white/10" 
                    checked={dietaryClaims[claim]} 
                    onChange={() => handleCheckboxChange(claim)}
                  />
                  <span>{claim}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-3.5 rounded-lg font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-600/20 disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Generating Copy...</span>
              </>
            ) : (
              <>
                <span>Generate sensory copy 🤖</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Main Preview and History Panel */}
      <div className="flex-1 p-8 md:p-12 flex flex-col gap-8 md:max-h-[85vh] overflow-y-auto">
        
        {/* Warning alerts */}
        {warning && (
          <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm leading-relaxed">
            <span className="text-lg">⚠️</span>
            <span>{warning}</span>
          </div>
        )}

        {/* Dynamic Display area */}
        <div className="flex flex-col flex-1 min-h-[350px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold font-heading text-white">Sensory Copy Preview</h3>
            {generatedText && !isLoading && (
              <div className="flex gap-2">
                <button 
                  onClick={handleCopy}
                  className="text-xs font-semibold px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-white flex items-center gap-2 transition-all cursor-pointer"
                >
                  📋 Copy Text
                </button>
                <button 
                  onClick={handleDownload}
                  className="text-xs font-semibold px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-white flex items-center gap-2 transition-all cursor-pointer"
                >
                  💾 Download .MD
                </button>
              </div>
            )}
          </div>

          {/* Output text panel */}
          <div className="flex-1 p-8 rounded-xl border border-white/5 bg-slate-900/40 relative overflow-y-auto min-h-[300px]">
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-slate-950/80 rounded-xl backdrop-blur-sm animate-pulse">
                <svg className="animate-spin h-10 w-10 text-violet-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="font-semibold text-gray-400 text-sm">
                  GourmetScribe is writing sensorial food descriptions...
                </p>
              </div>
            )}

            {generatedText ? (
              <div 
                className="text-left text-sm text-gray-200 leading-relaxed font-sans"
                dangerouslySetInnerHTML={{ __html: formatMarkdown(generatedText) }}
              />
            ) : (
              <div className="h-full min-h-[220px] flex flex-col items-center justify-center text-gray-500 text-center py-8">
                <span className="text-4xl mb-4">✍️</span>
                <p className="max-w-md text-sm italic leading-relaxed">
                  Fill in your product specifications on the left panel and click generate. Your premium AI product copy will render here in real-time.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* History Section */}
        {history.length > 0 && (
          <div className="border-t border-white/5 pt-8 text-left">
            <h3 className="text-base font-bold font-heading mb-4 text-white">Recent Generations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {history.map((item) => (
                <div 
                  key={item._id} 
                  onClick={() => loadPastGeneration(item)}
                  className="p-5 rounded-xl bg-white/2 border border-white/5 hover:border-violet-500/20 hover:bg-violet-500/2 hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col gap-3"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-gray-400 font-semibold">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-gray-600">
                      {new Date(item.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white truncate margin-0">
                    {item.productName}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {item.generatedText.replace(/[#*`-]/g, '')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}