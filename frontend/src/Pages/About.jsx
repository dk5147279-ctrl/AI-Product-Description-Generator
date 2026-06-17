
export default function About() {
  return (
    <div style={{ 
      padding: '6rem 2rem', 
      textAlign: 'center', 
      background: 'var(--bg-main)', 
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="glow-spot" style={{ top: '20%', left: '10%' }}></div>

      <div className="glass-card" style={{ 
        maxWidth: '800px', 
        padding: '4rem 3rem',
        borderRadius: '16px',
        backgroundColor: 'rgba(18, 19, 32, 0.5)',
        borderColor: 'rgba(255, 255, 255, 0.05)',
        boxSizing: 'border-box'
      }}>
        <span className="badge badge-secondary" style={{ marginBottom: '1.5rem', fontSize: '0.8rem', padding: '0.4rem 1rem' }}>
          ABOUT GOURMETSCRIBE AI
        </span>

        <h2 className="gradient-text" style={{ 
          fontSize: '2.8rem', 
          fontWeight: '800', 
          marginBottom: '1.5rem',
          letterSpacing: '-0.03em'
        }}>
          Sensory Copywriting, Automated
        </h2>

        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '1.15rem',
          lineHeight: '1.7', 
          maxWidth: '650px', 
          margin: '0 auto 2rem auto' 
        }}>
          GourmetScribe AI is built specifically for food processing companies, wholesale food brands, culinary artisans, and e-commerce food distributors. 
          Standard AI models often generate dry, generic descriptions. GourmetScribe AI understands food attributes—focusing on taste, aroma, dietary compliance, texture, and bulk wholesale logistics to write copy that converts.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
          textAlign: 'left'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.01)',
            border: '1px solid rgba(255,255,255,0.04)',
            padding: '1.5rem',
            borderRadius: '10px'
          }}>
            <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: '600' }}>Sensory Prompts</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
              Tailored to bring out appetizing texture, smell, and taste descriptions.
            </p>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.01)',
            border: '1px solid rgba(255,255,255,0.04)',
            padding: '1.5rem',
            borderRadius: '10px'
          }}>
            <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: '600' }}>Compliance Aware</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
              Highlights clean labeling, dietary claims (gluten-free, vegan), and certifications.
            </p>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.01)',
            border: '1px solid rgba(255,255,255,0.04)',
            padding: '1.5rem',
            borderRadius: '10px'
          }}>
            <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: '600' }}>B2B & B2C Ready</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
              Select target audience options to sell to either retail consumers or bulk wholesale buyers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}