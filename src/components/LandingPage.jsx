import { useRef } from 'react';

export default function LandingPage({ onStart, onAuth, onAdmin }) {
  const showcaseRef = useRef(null);
  const templatesRef = useRef(null);

  const scrollToShowcase = () => {
    showcaseRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTemplates = () => {
    templatesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="landing-container animate-fade">
      <nav className="glass-panel" style={{ position: 'relative', padding: '1.2rem 2.5rem', borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ flex: 1, fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.5px', cursor: 'pointer' }}>
          <span style={{ color: 'var(--accent-secondary)' }}>AI</span>Folio<span style={{ color: 'var(--accent-primary)' }}>.</span>
        </div>
        
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <span onClick={scrollToTemplates} style={{ cursor: 'pointer', color: '#ccc', fontWeight: 600, transition: 'all 0.2s ease', letterSpacing: '0.5px', fontSize: '1rem' }} onMouseEnter={e => {e.currentTarget.style.color = '#fff'; e.currentTarget.style.textShadow = '0 0 10px rgba(255,255,255,0.3)'}} onMouseLeave={e => {e.currentTarget.style.color = '#ccc'; e.currentTarget.style.textShadow = 'none'}}>Templates</span>
          <span onClick={scrollToShowcase} style={{ cursor: 'pointer', color: '#ccc', fontWeight: 600, transition: 'all 0.2s ease', letterSpacing: '0.5px', fontSize: '1rem' }} onMouseEnter={e => {e.currentTarget.style.color = '#fff'; e.currentTarget.style.textShadow = '0 0 10px rgba(255,255,255,0.3)'}} onMouseLeave={e => {e.currentTarget.style.color = '#ccc'; e.currentTarget.style.textShadow = 'none'}}>Showcase</span>
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={onAuth} style={{ padding: '8px 24px', fontWeight: 600 }}>Sign In</button>
        </div>
      </nav>

      <section style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 2rem' }}>
        <div className="glass-panel animate-fade-delay-1" style={{ maxWidth: '900px', margin: '0 auto', border: '1px solid rgba(255,255,255,0.05)', background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)', padding: '4rem 2rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
          <h1 className="gradient-text" style={{ fontSize: '4.5rem', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-1.5px' }}>
            Craft a Professional Portfolio Engine with AI
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3.5rem', maxWidth: '700px', margin: '0 auto 3.5rem auto', lineHeight: '1.6' }}>
            Elevate your digital presence. Let our intelligent AI engine analyze your professional background and generate a stunning, bespoke portfolio website instantly.
          </p>
          
          <div className="animate-fade-delay-2" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={onStart} style={{ padding: '16px 48px', fontSize: '1.2rem' }}>
              Start AI Generation ✨
            </button>
            <button className="btn-secondary" onClick={scrollToTemplates} style={{ padding: '16px 48px', fontSize: '1.2rem', background: 'rgba(255,255,255,0.05)' }}>
              Browse Templates
            </button>
            <button className="btn-secondary" onClick={scrollToShowcase} style={{ padding: '16px 48px', fontSize: '1.2rem' }}>
              View Showcase
            </button>
          </div>
        </div>
        
        <div className="animate-fade-delay-2" style={{ marginTop: '4rem', color: 'var(--text-secondary)', opacity: 0.6, fontSize: '0.9rem' }}>
          <p>Trusted by professionals from Top Tech Companies</p>
          <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', justifyContent: 'center' }}>
            <span style={{ fontWeight: 600, letterSpacing: '1px' }}>GOOGLE</span>
            <span style={{ fontWeight: 600, letterSpacing: '1px' }}>META</span>
            <span style={{ fontWeight: 600, letterSpacing: '1px' }}>AMAZON</span>
            <span style={{ fontWeight: 600, letterSpacing: '1px' }}>MICROSOFT</span>
          </div>
        </div>
      </section>

      {/* Templates Gallery Section */}
      <section ref={templatesRef} style={{ padding: '6rem 2rem 4rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem', letterSpacing: '-1px', fontWeight: 800 }}>Start with a Foundation</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Or let the AI generate one from scratch.</p>
          </div>
          <button className="btn-secondary" style={{ padding: '10px 24px', borderRadius: '30px', height: 'fit-content' }}>View All Templates</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem 2rem' }}>
          {[
            { title: 'Black White Grayscale Portfolio', author: 'AIFolio Engine', config: { aesthetic: 'Minimalist Monospace', layout: 'Bento Grid', colorPalette: 'Deep Space (Dark)' }, ui: { bg: '#111', text: '#fff', b1: '#333', b2: '#222' } },
            { title: 'Design Portfolio and Resume', author: 'Creative Labs', config: { aesthetic: 'Dark & Modern', layout: 'Classic Hero & Sections', colorPalette: 'Deep Space (Dark)' }, ui: { bg: '#0A1929', text: '#66B2FF', b1: '#001E3C', b2: '#0D2339' } },
            { title: 'Black and Orange Bold Creative', author: 'Studio X', config: { aesthetic: 'Vibrant Neo-Brutalism', layout: 'Fullscreen Interactive', colorPalette: 'Deep Space (Dark)' }, ui: { bg: '#1c1c1c', text: '#ff5500', b1: '#333', b2: '#ff5500' } },
            { title: 'Black and White Simple Portfolio', author: 'Minimalist Inc', config: { aesthetic: 'Minimalist Monospace', layout: 'Classic Hero & Sections', colorPalette: 'Muted Earth' }, ui: { bg: '#E5E5E5', text: '#000', b1: '#D4D4D4', b2: '#fff' } },
            { title: 'Beige and Brown Minimalist', author: 'Juliana Silva', config: { aesthetic: 'Dark & Modern', layout: 'Bento Grid', colorPalette: 'Muted Earth' }, ui: { bg: '#f5ebe0', text: '#4a3f35', b1: '#e3d5ca', b2: '#d6ccc2' } },
            { title: 'White and Orange Simple Portfolio', author: 'Olivia Wilson', config: { aesthetic: 'Vibrant Neo-Brutalism', layout: 'Classic Hero & Sections', colorPalette: 'Muted Earth' }, ui: { bg: '#ffffff', text: '#ff7b00', b1: '#f8f9fa', b2: '#ffea00' } },
            { title: 'Black Aesthetic Education', author: 'EduTech', config: { aesthetic: 'Dark & Modern', layout: 'Fullscreen Interactive', colorPalette: 'Deep Space (Dark)' }, ui: { bg: '#0a0a0a', text: '#e0e0e0', b1: '#1a1a1a', b2: '#222' } },
            { title: 'Beige Modern with Abstract', author: 'Olivia Wilson', config: { aesthetic: 'Dark & Modern', layout: 'Classic Hero & Sections', colorPalette: 'Muted Earth' }, ui: { bg: '#eae0d5', text: '#212529', b1: '#c6ac8f', b2: '#5e503f' } },
            { title: 'Brown and White Minimalist', author: 'Studio X', config: { aesthetic: 'Minimalist Monospace', layout: 'Bento Grid', colorPalette: 'Muted Earth' }, ui: { bg: '#4a3f35', text: '#f5ebe0', b1: '#5e503f', b2: '#c6ac8f' } },
            { title: 'Brown Red Scrapbook Portfolio', author: 'Creative Labs', config: { aesthetic: 'Vibrant Neo-Brutalism', layout: 'Bento Grid', colorPalette: 'Muted Earth' }, ui: { bg: '#fdf0d5', text: '#c1121f', b1: '#fbc3bc', b2: '#780000' } },
            { title: 'Black and Pink Modern Portfolio', author: 'Juliana Silva', config: { aesthetic: 'Dark & Modern', layout: 'Fullscreen Interactive', colorPalette: 'Cyberpunk Neon' }, ui: { bg: '#0b090a', text: '#ff0a54', b1: '#161214', b2: '#ff477e' } },
            { title: 'Black and White Minimalist Photo', author: 'Olivia Wilson', config: { aesthetic: 'Minimalist Monospace', layout: 'Fullscreen Interactive', colorPalette: 'Deep Space (Dark)' }, ui: { bg: '#111', text: '#fff', b1: '#222', b2: '#333' } },
          ].map((tpl, i) => (
            <div key={i} className="template-card animate-fade" style={{ animationDelay: `${i * 0.05}s`, cursor: 'pointer' }}>
              <div style={{ 
                aspectRatio: '16/10', 
                background: tpl.ui.bg, 
                borderRadius: '12px', 
                padding: '1.5rem', 
                position: 'relative', 
                overflow: 'hidden', 
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.transform = 'translateY(-5px)'; 
                e.currentTarget.style.boxShadow = `0 15px 30px ${tpl.ui.text}20`;
                e.currentTarget.querySelector('.hover-overlay').style.opacity = '1';
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.transform = 'translateY(0)'; 
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.querySelector('.hover-overlay').style.opacity = '0';
              }}>
                {/* Mock UI blocks inside the thumbnail */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ width: '40px', height: '40px', background: tpl.ui.b1, borderRadius: '50%' }}></div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'center' }}>
                    <div style={{ width: '60%', height: '8px', background: tpl.ui.text, opacity: 0.8, borderRadius: '4px' }}></div>
                    <div style={{ width: '40%', height: '6px', background: tpl.ui.text, opacity: 0.5, borderRadius: '4px' }}></div>
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', color: tpl.ui.text, letterSpacing: '-1px', fontWeight: 800, fontFamily: tpl.title.includes('Monospace') ? 'monospace' : 'inherit' }}>PORTFOLIO</h3>
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                   <div style={{ width: '30%', height: '6px', background: tpl.ui.b2, borderRadius: '4px' }}></div>
                   <div style={{ width: '20%', height: '6px', background: tpl.ui.b1, borderRadius: '4px' }}></div>
                </div>
                
                {/* Hover overlay that appears smoothly */}
                <div className="hover-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s ease-in-out' }}>
                   <button className="btn-primary" onClick={(e) => { e.stopPropagation(); onStart(tpl.config); }} style={{ padding: '10px 24px', fontSize: '0.9rem', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>Use Template</button>
                </div>
              </div>
              <div style={{ marginTop: '1rem', padding: '0 0.5rem' }}>
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: '#eee', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tpl.title}</h4>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#888' }}>{tpl.author}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase Section */}
      <section ref={showcaseRef} style={{ padding: '6rem 2rem 8rem 2rem', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem', letterSpacing: '-1.5px', fontWeight: 800 }}>Generated by <span className="gradient-text">AIFolio</span></h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '4.5rem' }}>Explore stunning portfolios engineered in seconds by our AI.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          
          {/* Showcase Card 1 */}
          <div className="glass-panel animate-fade" style={{ padding: 0, overflow: 'hidden', textAlign: 'left', transition: 'all 0.3s ease', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }} onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 255, 245, 0.1)'}} onMouseLeave={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'}}>
            <div style={{ height: '220px', background: '#090014', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '1px solid var(--glass-border)', position: 'relative' }}>
               <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255, 0, 128, 0.2)', color: '#ff0080', fontSize: '0.75rem', padding: '6px 10px', borderRadius: '6px', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px' }}>Cyberpunk Neon</div>
               <h3 style={{ fontSize: '2.5rem', color: '#00fff5', margin: 0, letterSpacing: '-1px' }}>Alex J.</h3>
               <p style={{ color: '#888', marginTop: '0.5rem', fontSize: '1.1rem' }}>Fullstack Engineer</p>
            </div>
            <div style={{ padding: '1.5rem 2rem 2rem' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '1.2rem' }}>
                 <span style={{ fontSize: '0.85rem', padding: '6px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', color: '#ccc' }}>React</span>
                 <span style={{ fontSize: '0.85rem', padding: '6px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', color: '#ccc' }}>Node.js</span>
                 <span style={{ fontSize: '0.85rem', padding: '6px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', color: '#ccc' }}>ThreeJS</span>
              </div>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>A high-contrast, high-impact bento box layout built for an elite creative developer.</p>
            </div>
          </div>

          {/* Showcase Card 2 */}
          <div className="glass-panel animate-fade-delay-1" style={{ padding: 0, overflow: 'hidden', textAlign: 'left', transition: 'all 0.3s ease', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }} onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(212, 163, 115, 0.1)'}} onMouseLeave={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'}}>
            <div style={{ height: '220px', background: '#1A1814', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '1px solid var(--glass-border)', position: 'relative' }}>
               <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(212, 163, 115, 0.2)', color: '#d4a373', fontSize: '0.75rem', padding: '6px 10px', borderRadius: '6px', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px' }}>Muted Earth</div>
               <h3 style={{ fontSize: '2.5rem', color: '#d4a373', margin: 0, letterSpacing: '-1px' }}>Sarah M.</h3>
               <p style={{ color: '#888', marginTop: '0.5rem', fontSize: '1.1rem' }}>UX/UI Designer</p>
            </div>
            <div style={{ padding: '1.5rem 2rem 2rem' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '1.2rem' }}>
                 <span style={{ fontSize: '0.85rem', padding: '6px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', color: '#ccc' }}>Figma</span>
                 <span style={{ fontSize: '0.85rem', padding: '6px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', color: '#ccc' }}>Research</span>
              </div>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>An elegant, breathable classic layout focusing on rich typography and case studies.</p>
            </div>
          </div>

          {/* Showcase Card 3 */}
          <div className="glass-panel animate-fade-delay-2" style={{ padding: 0, overflow: 'hidden', textAlign: 'left', transition: 'all 0.3s ease', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }} onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(139, 92, 246, 0.15)'}} onMouseLeave={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'}}>
            <div style={{ height: '220px', background: '#0a0a0a', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '1px solid var(--glass-border)', position: 'relative' }}>
               <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(139, 92, 246, 0.2)', color: 'var(--accent-secondary)', fontSize: '0.75rem', padding: '6px 10px', borderRadius: '6px', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px' }}>Deep Space</div>
               <h3 style={{ fontSize: '2.5rem', color: '#fff', margin: 0, letterSpacing: '-1px' }}>Jordan K.</h3>
               <p style={{ color: '#888', marginTop: '0.5rem', fontSize: '1.1rem' }}>Product Manager</p>
            </div>
            <div style={{ padding: '1.5rem 2rem 2rem' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '1.2rem' }}>
                 <span style={{ fontSize: '0.85rem', padding: '6px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', color: '#ccc' }}>Strategy</span>
                 <span style={{ fontSize: '0.85rem', padding: '6px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', color: '#ccc' }}>Agile</span>
              </div>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>A stealth-mode dark aesthetic designed for presenting metrics and vision with impact.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '2.5rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
         <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>Terms of Service</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>Privacy Policy</span>
         </div>
         <p 
            style={{ marginTop: '1.5rem', color: '#555', fontSize: '0.8rem', cursor: 'default', userSelect: 'none' }}
            onDoubleClick={onAdmin}
            title="Double click to access hidden portal"
         >
            © 2026 AIFolio Engine. All rights reserved.
         </p>
      </footer>
    </div>
  );
}
