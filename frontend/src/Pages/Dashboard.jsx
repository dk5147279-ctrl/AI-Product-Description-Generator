import { useState, useEffect } from 'react';
import '../App.css';

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
    html = html.replace(/^\* (.*$)/gim, '<li style="margin-left:1.2rem;list-style-type:disc;margin-bottom:0.4rem;color:var(--text-primary);">$1</li>');
    html = html.replace(/^- (.*$)/gim, '<li style="margin-left:1.2rem;list-style-type:disc;margin-bottom:0.4rem;color:var(--text-primary);">$1</li>');
    
    // Paragraph paragraphs
    html = html.split('\n\n').map(p => {
      const trimmed = p.trim();
      if (trimmed.startsWith('<li') || trimmed.startsWith('<h')) {
        return trimmed;
      }
      return `<p style="margin-bottom:1rem;line-height:1.6;color:var(--text-primary);">${trimmed}</p>`;
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
    <div style={{ 
      display: 'flex', 
      minHeight: '85vh', 
      background: 'var(--bg-main)', 
      fontFamily: 'var(--sans)',
      boxSizing: 'border-box'
    }}>
      {showToast && <div className="toast-notice">{toastMessage}</div>}

      {/* Control Sidebar (Form Panel) */}
      <div style={{ 
        flex: '0 0 420px', 
        borderRight: '1px solid rgba(255, 255, 255, 0.05)', 
        background: 'rgba(15, 17, 28, 0.6)',
        backdropFilter: 'blur(10px)',
        padding: '2.5rem 2rem',
        boxSizing: 'border-box',
        overflowY: 'auto',
        maxHeight: '85vh'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: '700' }}>Generator Panel</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '2rem' }}>
          Define the parameters for your food processing or consumer product.
        </p>

        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Product Name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="form-label">Product Name</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="e.g., Premium Almond Matcha Cookie" 
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          {/* Food Category */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="form-label">Food Category</label>
            <select 
              className="form-select"
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="form-label">Tone of Voice</label>
            <select 
              className="form-select"
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="form-label">Target Audience</label>
            <select 
              className="form-select"
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="form-label">Key Ingredients / Sourcing</label>
            <textarea 
              className="form-textarea"
              rows="3"
              placeholder="e.g., Organic Japanese Matcha, Gluten-free almond flour, Cold-pressed coconut oil" 
              value={keyIngredients}
              onChange={(e) => setKeyIngredients(e.target.value)}
            />
          </div>

          {/* Keywords */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="form-label">Keywords (Comma separated)</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="e.g., stone ground, low sugar, vegan cookie" 
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>

          {/* Dietary Claims & Certifications */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <label className="form-label">Dietary Claims & Certifications</label>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '0.8rem', 
              background: 'rgba(255,255,255,0.01)',
              padding: '0.8rem',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.03)'
            }}>
              {Object.keys(dietaryClaims).map((claim) => (
                <label key={claim} className="checkbox-container">
                  <input 
                    type="checkbox" 
                    checked={dietaryClaims[claim]} 
                    onChange={() => handleCheckboxChange(claim)}
                  />
                  <span className="checkbox-custom"></span>
                  <span style={{ fontSize: '0.82rem' }}>{claim}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="btn-primary"
            style={{ 
              width: '100%', 
              padding: '0.9rem', 
              borderRadius: '8px', 
              fontSize: '1rem', 
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            {isLoading ? (
              <>
                <span className="spinner" style={{ width: '16px', height: '16px', borderTopColor: '#fff', borderWidth: '2px' }}></span>
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
      <div style={{ 
        flex: 1, 
        padding: '2.5rem 3rem', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2.5rem',
        overflowY: 'auto',
        maxHeight: '85vh',
        boxSizing: 'border-box'
      }}>
        {/* API warning alerts */}
        {warning && (
          <div style={{
            background: 'rgba(234, 179, 8, 0.1)',
            border: '1px solid rgba(234, 179, 8, 0.3)',
            borderRadius: '8px',
            padding: '1rem 1.5rem',
            color: '#fef08a',
            fontSize: '0.88rem',
            lineHeight: '1.5',
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem'
          }}>
            <span style={{ fontSize: '1.25rem' }}>⚠️</span>
            <span>{warning}</span>
          </div>
        )}

        {/* Dynamic Display area */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '350px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '1rem' 
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Sensory Copy Preview</h3>
            {generatedText && !isLoading && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={handleCopy}
                  className="glass-card"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  📋 Copy Text
                </button>
                <button 
                  onClick={handleDownload}
                  className="glass-card"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  💾 Download .MD
                </button>
              </div>
            )}
          </div>

          {/* Output text panel */}
          <div className="glass-card" style={{ 
            flex: '1', 
            padding: '2.5rem', 
            backgroundColor: 'rgba(18, 19, 32, 0.4)',
            borderColor: 'rgba(255, 255, 255, 0.04)',
            overflowY: 'auto',
            borderRadius: '12px',
            position: 'relative'
          }}>
            {isLoading ? (
              <div className="pulsing-loader" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.2rem',
                backgroundColor: 'rgba(10, 11, 16, 0.7)',
                borderRadius: '12px',
                zIndex: 10
              }}>
                <span className="spinner"></span>
                <p style={{ fontWeight: '500', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  GourmetScribe is writing sensorial food descriptions...
                </p>
              </div>
            ) : null}

            {generatedText ? (
              <div 
                style={{ textAlign: 'left', fontSize: '1rem', lineHeight: '1.7' }}
                dangerouslySetInnerHTML={{ __html: formatMarkdown(generatedText) }}
              />
            ) : (
              <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                textAlign: 'center',
                padding: '2rem 0'
              }}>
                <span style={{ fontSize: '3rem', marginBottom: '1rem' }}>✍️</span>
                <p style={{ maxWidth: '400px', margin: 0, fontStyle: 'italic', fontSize: '0.95rem' }}>
                  Fill in your product specifications on the left panel and click generate. Your premium AI product copy will render here in real-time.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* History Section */}
        {history.length > 0 && (
          <div style={{ 
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '2rem',
            textAlign: 'left'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.2rem' }}>Recent Generations</h3>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.2rem'
            }}>
              {history.map((item) => (
                <div 
                  key={item._id} 
                  onClick={() => loadPastGeneration(item)}
                  className="glass-card"
                  style={{
                    padding: '1.2rem 1.5rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderColor: 'rgba(255, 255, 255, 0.04)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      background: 'rgba(255,255,255,0.05)', 
                      padding: '0.2rem 0.5rem', 
                      borderRadius: '4px',
                      color: 'var(--text-secondary)'
                    }}>
                      {item.category}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {new Date(item.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#fff', margin: 0 }}>
                    {item.productName}
                  </h4>
                  <p style={{ 
                    color: 'var(--text-muted)', 
                    fontSize: '0.82rem',
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.generatedText.replace(/[#*`-]/g, '').substring(0, 80)}...
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