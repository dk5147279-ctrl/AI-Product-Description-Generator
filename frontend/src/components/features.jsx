
function Features() {
  const cardData = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Generate mouth-watering descriptions, serving ideas, and logistic copy in under 5 seconds."
    },
    {
      icon: "🥗",
      title: "Tailored for Food Processing",
      description: "Outputs structured info for dietary claims, allergens, packaging, and commercial wholesale specs."
    },
    {
      icon: "📈",
      title: "SEO & Retail Optimized",
      description: "Automatically injects search keywords to boost rankings on Google, Amazon, and retail platforms."
    }
  ];

  return (
    <div style={{
      padding: '6rem 2rem',
      position: 'relative',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      background: 'rgba(10, 11, 16, 0.5)'
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '4rem',
        fontSize: '2.4rem',
        fontWeight: '800',
        letterSpacing: '-0.03em'
      }}>
        Why Use <span style={{ color: 'var(--primary)' }}>GourmetScribe?</span>
      </h2>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        flexWrap: 'wrap',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {cardData.map((card, index) => (
          <div 
            key={index} 
            className="glass-card"
            style={{
              flex: '1',
              minWidth: '280px',
              maxWidth: '350px',
              padding: '2.5rem 2rem',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}>
              {card.icon}
            </div>
            
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '700',
              fontFamily: 'Outfit, sans-serif'
            }}>{card.title}</h3>
            
            <p style={{ 
              color: 'var(--text-secondary)', 
              lineHeight: '1.6', 
              fontSize: '0.95rem',
              margin: 0 
            }}>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
