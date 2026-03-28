import { useState } from 'react';

export default function AICreatorWizard({ onFinish, initialConfig }) {
  const [step, setStep] = useState(initialConfig ? 7 : 1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [deployState, setDeployState] = useState('idle'); // idle, deploying, success
  const [deployStep, setDeployStep] = useState(0);
  const [formData, setFormData] = useState({
    role: initialConfig?.role || '',
    skills: initialConfig?.skills || '',
    aesthetic: initialConfig?.aesthetic || 'Dark & Modern',
    layout: initialConfig?.layout || 'Bento Grid',
    colorPalette: initialConfig?.colorPalette || 'Deep Space (Dark)',
    typography: initialConfig?.typography || 'System Default',
    image: initialConfig?.image || null,
    bio: initialConfig?.bio || '',
    socialGithub: initialConfig?.socialGithub || '',
    socialLinkedin: initialConfig?.socialLinkedin || ''
  });

  const nextStep = () => {
    if (step < 6) setStep(step + 1);
    else handleGenerate();
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate API call and generation
    setTimeout(() => {
      setIsGenerating(false);
      setStep(7); // 7 = Result view
    }, 4500);
  };

  const handleDeploy = () => {
    setDeployState('deploying');
    const steps = [
        { msg: 'Initializing edge functions...', delay: 800 },
        { msg: 'Optimizing high-fidelity assets...', delay: 1200 },
        { msg: 'Generating SSL certification...', delay: 1000 },
        { msg: 'Propagating global DNS records...', delay: 1500 }
    ];
    
    let current = 0;
    const process = () => {
        if (current < steps.length) {
            setDeployStep(current);
            setTimeout(() => {
                current++;
                process();
            }, steps[current].delay);
        } else {
            setDeployState('success');
        }
    };
    process();
  };

  if (deployState === 'deploying') {
    const steps = ['Initializing edge...', 'Optimizing assets...', 'Generating SSL...', 'Propagating DNS...'];
    return (
      <div className="wizard-container animate-fade" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'fixed', top:0, left:0, width:'100%', height:'100%', background:'rgba(0,0,0,0.9)', backdropFilter:'blur(10px)', zIndex: 2000 }}>
        <div className="glass-panel text-center animate-fade" style={{ padding: '4rem', maxWidth: '600px', width: '100%' }}>
            <div className="loader-ring" style={{ width: '80px', height: '80px', border: '4px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'spin 1s infinite', margin: '0 auto 2rem auto' }}></div>
            <h2 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Architecting Cloud...</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontFamily: 'monospace' }}>{steps[deployStep]}</p>
            <div style={{ marginTop: '2rem', background: 'rgba(255,255,255,0.05)', height: '6px', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ width: `${(deployStep / steps.length) * 100}%`, height: '100%', background: 'var(--accent-primary)', transition: 'width 0.5s ease' }}></div>
            </div>
        </div>
      </div>
    );
  }

  if (deployState === 'success') {
    const mockUrl = `https://aifolio.dev/${formData.role.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(1000 + Math.random() * 9000)}`;
    return (
      <div className="wizard-container animate-fade" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'fixed', top:0, left:0, width:'100%', height:'100%', background:'rgba(0,0,0,0.9)', backdropFilter:'blur(10px)', zIndex: 2000 }}>
         {/* Confetti simulation */}
         {[...Array(50)].map((_, i) => (
            <div key={i} className="confetti" style={{ left: `${Math.random()*100}vw`, animationDelay: `${Math.random()*2}s`, backgroundColor: i % 2 === 0 ? 'var(--accent-primary)' : 'var(--accent-secondary)' }}></div>
         ))}
         <div className="glass-panel text-center animate-fade" style={{ padding: '4rem', maxWidth: '700px', width: '100%', position: 'relative', overflow: 'hidden' }}>
            <div className="deploy-success-glow" style={{ width: '100px', height: '100px', background: '#27c93f', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem auto', fontSize: '3rem' }}>✓</div>
            <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>You are Live!</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem' }}>Your professional presence has been engineered and deployed to the global edge network.</p>
            
            <div className="glass-panel" style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '15px', marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <code style={{ color: 'var(--accent-secondary)', fontSize: '1.1rem' }}>{mockUrl}</code>
                <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem' }} onClick={() => { navigator.clipboard.writeText(mockUrl); alert('Copied!'); }}>Copy</button>
            </div>
            
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                <button className="btn-primary" style={{ padding: '16px 40px' }} onClick={() => window.open(mockUrl, '_blank')}>View Live Site ↗</button>
                <button className="btn-secondary" style={{ padding: '16px 40px', background: 'rgba(255,255,255,0.05)' }} onClick={onFinish}>Back to Dashboard</button>
            </div>
        </div>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="wizard-container animate-fade" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div className="glass-panel text-center animate-pulse-glow" style={{ padding: '4rem', maxWidth: '600px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="loader-ring" style={{ width: '80px', height: '80px', border: '4px solid var(--glass-border)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite', margin: '0 auto 2.5rem auto' }}></div>
          <h2 className="gradient-text" style={{ fontSize: '2.2rem', marginBottom: '1.5rem', letterSpacing: '-0.5px' }}>AI is Architecting...</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.6' }}>Analyzing your skills and selecting the optimal aesthetic framework for your digital presence.</p>
        </div>
        <style>{`
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          .animate-pulse-glow { animation: pulseWarning 3s infinite ease-in-out; }
          @keyframes pulseWarning { 0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.2); } 70% { box-shadow: 0 0 0 30px rgba(139, 92, 246, 0); } 100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); } }
        `}</style>
      </div>
    );
  }

  if (step === 7) {
    // Dynamic styling based on palette and layout selection
    const getBgColor = () => {
       if(formData.aesthetic === 'Vibrant Neo-Brutalism') return secondaryAccent;
       if(formData.colorPalette === 'Cyberpunk Neon') return 'linear-gradient(135deg, #090014 0%, #1a0033 100%)';
       if(formData.colorPalette === 'Muted Earth') return 'linear-gradient(135deg, #1A1814 0%, #2a251c 100%)';
       if(formData.colorPalette === 'Ocean Breeze') return 'linear-gradient(135deg, #00101f 0%, #00284d 100%)';
       if(formData.colorPalette === 'Royal Amethyst') return 'linear-gradient(135deg, #140026 0%, #2d004d 100%)';
       if(formData.colorPalette === 'Sunset Glow') return 'linear-gradient(135deg, #2b0b00 0%, #591700 100%)';
       if(formData.colorPalette === 'Forest Canopy') return 'linear-gradient(135deg, #051c11 0%, #0a3320 100%)';
       return 'linear-gradient(135deg, #0a0a0a 0%, #171717 100%)'; // Deep Space
    };
    
    // Fallbacks if user selected default
    const accentColor = 
      formData.colorPalette === 'Cyberpunk Neon' ? '#00fff5' : 
      formData.colorPalette === 'Muted Earth' ? '#d4a373' : 
      formData.colorPalette === 'Ocean Breeze' ? '#00d4ff' : 
      formData.colorPalette === 'Royal Amethyst' ? '#e0aaff' : 
      formData.colorPalette === 'Sunset Glow' ? '#ff7b00' : 
      formData.colorPalette === 'Forest Canopy' ? '#00ff88' : '#fff';
      
    const secondaryAccent = 
      formData.colorPalette === 'Cyberpunk Neon' ? '#ff0080' : 
      formData.colorPalette === 'Muted Earth' ? '#8b7355' : 
      formData.colorPalette === 'Ocean Breeze' ? '#0088cc' : 
      formData.colorPalette === 'Royal Amethyst' ? '#9d4edd' : 
      formData.colorPalette === 'Sunset Glow' ? '#ff0055' : 
      formData.colorPalette === 'Forest Canopy' ? '#00b359' : 'var(--accent-primary)';
    
    const aestheticClass = formData.aesthetic === 'Minimalist Monospace' ? 'aesthetic-minimalist' 
      : formData.aesthetic === 'Vibrant Neo-Brutalism' ? 'aesthetic-brutalism' 
      : formData.aesthetic === 'Glass Edge' ? 'aesthetic-glass' 
      : formData.aesthetic === 'Soft Neumorphism' ? 'aesthetic-neumorphism' 
      : 'aesthetic-modern';

    const getFontFamily = () => {
      if (formData.typography === 'Space Grotesk') return "'Space Grotesk', system-ui, sans-serif";
      if (formData.typography === 'Playfair Display') return "'Playfair Display', serif";
      if (formData.typography === 'Outfit') return "'Outfit', sans-serif";
      if (formData.typography === 'Courier New') return "'Courier New', Courier, monospace";
      if (formData.typography === 'System Default') {
         if (formData.aesthetic === 'Minimalist Monospace') return "'Courier New', Courier, monospace";
         if (formData.aesthetic === 'Vibrant Neo-Brutalism') return "'Space Grotesk', system-ui, sans-serif";
      }
      return 'system-ui, -apple-system, sans-serif';
    };

    return (
      <div className={`wizard-container animate-fade ${aestheticClass}`} style={{ minHeight: '100vh', padding: '2rem', position: 'relative', overflow: 'hidden', fontFamily: getFontFamily() }}>
        {/* Ambient Glowing Orbs */}
        <div className="ambient-orb" style={{ position: 'absolute', top: '10%', left: '20%', width: '400px', height: '400px', background: accentColor, filter: 'blur(150px)', opacity: 0.15, borderRadius: '50%', zIndex: 0, animation: 'floatOrb 10s ease-in-out infinite alternate' }}></div>
        <div className="ambient-orb" style={{ position: 'absolute', bottom: '10%', right: '20%', width: '300px', height: '300px', background: secondaryAccent, filter: 'blur(150px)', opacity: 0.15, borderRadius: '50%', zIndex: 0, animation: 'floatOrb 8s ease-in-out infinite alternate-reverse' }}></div>
        
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Space+Grotesk:wght@400;700&display=swap');
          @keyframes floatOrb { 0% { transform: translateY(0) scale(1); } 100% { transform: translateY(-50px) scale(1.1); } }
          @keyframes slideUpFade { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
          .premium-button { padding: 14px 36px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; font-size: 1rem; position: relative; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; }
          .stagger-1 { animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; opacity: 0; }
          .stagger-2 { animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }
          .stagger-3 { animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; opacity: 0; }
          .stagger-4 { animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards; opacity: 0; }
          .sleek-scroll::-webkit-scrollbar { width: 6px; }
          .sleek-scroll::-webkit-scrollbar-track { background: transparent; }
          .sleek-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

          /* Modern Glassmorphism (Default) */
          .aesthetic-modern .glass-card { background: rgba(255,255,255,0.03); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); border-top: 1px solid rgba(255,255,255,0.15); border-left: 1px solid rgba(255,255,255,0.15); border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.2); transition: transform 0.3s ease, box-shadow 0.3s ease; }
          .aesthetic-modern .glass-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,0,0,0.4), 0 0 20px ${accentColor}20; }
          .aesthetic-modern .premium-button { background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 30px; }
          .aesthetic-modern .premium-button:hover { background: rgba(255,255,255,0.15); border-color: ${accentColor}; box-shadow: 0 0 20px ${accentColor}40; transform: translateY(-2px); }
          .aesthetic-modern .premium-button-primary { background: ${accentColor}; color: #000; border: none; font-weight: 700; }
          .aesthetic-modern .premium-button-primary:hover { background: ${accentColor}; filter: brightness(1.2); box-shadow: 0 0 30px ${accentColor}60; transform: translateY(-2px); }
          .aesthetic-modern .presentation-bg { border-radius: 30px; box-shadow: 0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.05); }
          .aesthetic-modern .h1-title { text-shadow: 0 0 40px ${accentColor}30; }

          /* Minimalist Monospace */
          .aesthetic-minimalist * { letter-spacing: -0.5px; }
          .aesthetic-minimalist .ambient-orb { display: none; }
          .aesthetic-minimalist .glass-card { background: rgba(0,0,0,0.3); backdrop-filter: none; border: 1px solid rgba(255,255,255,0.2); border-radius: 0; box-shadow: none; transition: background 0.2s; }
          .aesthetic-minimalist .glass-card:hover { background: rgba(255,255,255,0.05); transform: none; box-shadow: none; }
          .aesthetic-minimalist .premium-button { background: transparent; border: 1px solid rgba(255,255,255,0.3); color: white; border-radius: 0; text-transform: uppercase; }
          .aesthetic-minimalist .premium-button:hover { background: white; color: black; transform: none; box-shadow: none; }
          .aesthetic-minimalist .premium-button-primary { background: white; color: black; }
          .aesthetic-minimalist .premium-button-primary:hover { opacity: 0.8; }
          .aesthetic-minimalist .presentation-bg { border-radius: 0; border: 1px solid rgba(255,255,255,0.2); }
          .aesthetic-minimalist .h1-title { text-shadow: none; font-weight: normal; }
          .aesthetic-minimalist .h1-title span { background: none; -webkit-text-fill-color: ${accentColor}; color: ${accentColor}; text-shadow: none; }

          /* Vibrant Neo-Brutalism */
          .aesthetic-brutalism .ambient-orb { display: none; }
          .aesthetic-brutalism .glass-card { background: #fff; border: 4px solid #000; border-radius: 0; box-shadow: 12px 12px 0 rgba(0,0,0,1); transition: transform 0.1s, box-shadow 0.1s; color: #000; }
          .aesthetic-brutalism .glass-card:hover { transform: translate(4px, 4px); box-shadow: 8px 8px 0 rgba(0,0,0,1); }
          .aesthetic-brutalism .glass-card h3, .aesthetic-brutalism .glass-card p { color: #000 !important; }
          .aesthetic-brutalism .glass-card span { color: #333 !important; }
          .aesthetic-brutalism .premium-button { background: #fff; border: 3px solid #000; color: #000; border-radius: 0; box-shadow: 6px 6px 0 rgba(0,0,0,1); font-weight: 800; text-transform: uppercase; }
          .aesthetic-brutalism .premium-button:hover { transform: translate(3px, 3px); box-shadow: 3px 3px 0 rgba(0,0,0,1); border-color: #000; }
          .aesthetic-brutalism .premium-button-primary { background: ${accentColor} !important; color: #000 !important; }
          .aesthetic-brutalism .presentation-bg { background: ${secondaryAccent} !important; border: 6px solid #000; box-shadow: none; border-radius: 0; }
          .aesthetic-brutalism .h1-title { text-shadow: 6px 6px 0 #000 !important; color: #fff !important; }
          .aesthetic-brutalism .h1-title span { background: none; -webkit-text-fill-color: ${accentColor}; color: ${accentColor}; text-shadow: 6px 6px 0 #000 !important; }

          /* Glass Edge */
          .aesthetic-glass .glass-card { background: rgba(255,255,255,0.05); backdrop-filter: blur(40px); border: 1px solid rgba(255,255,255,0.4); border-top: 1px solid rgba(255,255,255,0.7); border-radius: 40px; box-shadow: 0 30px 60px rgba(0,0,0,0.1); }
          .aesthetic-glass .premium-button { background: rgba(255,255,255,0.1); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.5); color: #fff; border-radius: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
          .aesthetic-glass .premium-button:hover { background: rgba(255,255,255,0.2); transform: translateY(-3px); }
          .aesthetic-glass .premium-button-primary { background: #fff; color: #000; font-weight: 700; border: none; }
          .aesthetic-glass .presentation-bg { border-radius: 40px; border: 1px solid rgba(255,255,255,0.3); box-shadow: 0 40px 80px rgba(0,0,0,0.4); }

          /* Soft Neumorphism */
          .aesthetic-neumorphism .glass-card { background: transparent; backdrop-filter: none; border: none; border-radius: 30px; box-shadow: 15px 15px 30px rgba(0,0,0,0.4), -15px -15px 30px rgba(255,255,255,0.03); transition: box-shadow 0.3s ease; }
          .aesthetic-neumorphism .glass-card:hover { box-shadow: 20px 20px 40px rgba(0,0,0,0.5), -20px -20px 40px rgba(255,255,255,0.04); }
          .aesthetic-neumorphism .ambient-orb { opacity: 0.05; }
          .aesthetic-neumorphism .premium-button { background: transparent; border: none; box-shadow: 8px 8px 16px rgba(0,0,0,0.4), -8px -8px 16px rgba(255,255,255,0.03); border-radius: 20px; color: #fff; }
          .aesthetic-neumorphism .premium-button:hover { box-shadow: inset 8px 8px 16px rgba(0,0,0,0.4), inset -8px -8px 16px rgba(255,255,255,0.03); transform: translateY(0); }
          .aesthetic-neumorphism .premium-button-primary { color: ${accentColor}; font-weight: bold; }
          .aesthetic-neumorphism .presentation-bg { border-radius: 30px; border: none; box-shadow: inset 15px 15px 30px rgba(0,0,0,0.4), inset -15px -15px 30px rgba(255,255,255,0.03); }
        `}</style>
        
        <nav className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', padding: '1rem 2rem', borderRadius: '15px', position: 'relative', zIndex: 10, border: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 10px #00ff88' }}></div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>Live Editor</h2>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <select 
              value={formData.aesthetic} 
              onChange={e => setFormData({...formData, aesthetic: e.target.value})} 
              style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', outline: 'none', cursor: 'pointer', fontSize: '0.9rem', backdropFilter: 'blur(10px)' }}
            >
              <option>Dark & Modern</option>
              <option>Minimalist Monospace</option>
              <option>Vibrant Neo-Brutalism</option>
              <option>Glass Edge</option>
              <option>Soft Neumorphism</option>
            </select>
            
            <select 
              value={formData.typography} 
              onChange={e => setFormData({...formData, typography: e.target.value})} 
              style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', outline: 'none', cursor: 'pointer', fontSize: '0.9rem', backdropFilter: 'blur(10px)' }}
            >
              <option>System Default</option>
              <option>Space Grotesk</option>
              <option>Playfair Display</option>
              <option>Outfit</option>
              <option>Courier New</option>
            </select>
            
            <select 
              value={formData.layout} 
              onChange={e => setFormData({...formData, layout: e.target.value})} 
              style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', outline: 'none', cursor: 'pointer', fontSize: '0.9rem', backdropFilter: 'blur(10px)' }}
            >
              <option>Bento Grid</option>
              <option>Classic Hero & Sections</option>
              <option>Fullscreen Interactive</option>
            </select>
            
            <select 
              value={formData.colorPalette} 
              onChange={e => setFormData({...formData, colorPalette: e.target.value})} 
              style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', outline: 'none', cursor: 'pointer', fontSize: '0.9rem', backdropFilter: 'blur(10px)' }}
            >
              <option>Deep Space (Dark)</option>
              <option>Cyberpunk Neon</option>
              <option>Muted Earth</option>
              <option>Ocean Breeze</option>
              <option>Royal Amethyst</option>
              <option>Sunset Glow</option>
              <option>Forest Canopy</option>
            </select>
            
            <div style={{ height: '24px', width: '1px', background: 'rgba(255,255,255,0.2)', margin: '0 0.5rem' }}></div>
            
            <button className="premium-button" onClick={() => setStep(1)} style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Edit Content</button>
            <button className="premium-button premium-button-primary" onClick={onFinish} style={{ padding: '8px 24px', fontSize: '0.9rem' }}>Save & Exit</button>
          </div>
        </nav>
        
        {/* Edge-to-Edge Floating Presentation Area */}
        <div className="sleek-scroll presentation-bg" style={{ background: getBgColor(), overflowY: 'auto', height: '75vh', position: 'relative', zIndex: 10, padding: formData.layout === 'Fullscreen Interactive' ? '0' : '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: formData.layout === 'Fullscreen Interactive' ? 'center' : 'flex-start' }}>
          
          <div className="stagger-1" style={{ display: formData.layout === 'Fullscreen Interactive' ? 'none' : 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', background: `linear-gradient(90deg, ${secondaryAccent}20, ${accentColor}20)`, color: accentColor, borderRadius: '50px', marginBottom: '3rem', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase', fontSize: '0.75rem', border: `1px solid ${accentColor}40`, backdropFilter: 'blur(10px)' }}>
            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: accentColor }}></span>
            AI Generated • {formData.aesthetic}
          </div>
               {formData.layout === 'Bento Grid' && (
            <div className="bento-grid-container stagger-2" style={{ marginBottom: '4rem' }}>
              <div className="glass-card bento-item bento-hero" style={{ position: 'relative' }}>
                <div className="ambient-orb" style={{ position: 'absolute', top: '-50px', right: '-50px', width: '250px', height: '250px', background: accentColor, filter: 'blur(100px)', opacity: 0.1, borderRadius: '50%' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', flexWrap: 'wrap', height: '100%' }}>
                   {formData.image && <img src={formData.image} alt="Profile" style={{ width: '120px', height: '120px', borderRadius: formData.aesthetic === 'Minimalist Monospace' ? '0' : '32px', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.08)', boxShadow: '0 15px 35px rgba(0,0,0,0.4)' }} />}
                   <div style={{ flex: 1 }}>
                     <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2.5px', fontWeight: 700 }}>Engineered Profile</span>
                     <h1 className="h1-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', margin: '0.5rem 0', lineHeight: 1.0, fontWeight: 900 }}>
                       I'm a <span>{formData.role || 'Pro'}</span>
                     </h1>
                     <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                        <span style={{ width: '40px', height: '2px', background: accentColor, marginTop: '10px' }}></span>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '400px', lineHeight: 1.5 }}>Architecting digital excellence through {formData.aesthetic.toLowerCase()} patterns.</p>
                     </div>
                   </div>
                </div>
              </div>

              <div className="glass-card bento-item bento-stats">
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)', fontWeight: 'bold', textTransform: 'uppercase' }}>Engagement</span>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.5rem 0' }}>1.2k+</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>Unique views this month across global networks.</p>
              </div>

              <div className="glass-card bento-item bento-skills">
                <h3 style={{ color: '#fff', margin: '0 0 1.5rem 0', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.5px' }}>Core Expertise</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                   {(formData.skills ? formData.skills.split(',').map(s => s.trim()) : ['Design', 'Code', 'Product']).slice(0, 3).map((skill, idx) => (
                      <div key={idx}>
                        <div style={{ display: 'flex', justifySpaceBetween: 'space-between', fontSize: '0.9rem' }}>
                          <span>{skill}</span>
                          <span style={{ color: 'var(--text-secondary)' }}>95%</span>
                        </div>
                        <div className="skill-bar-container">
                          <div className="skill-bar-fill" style={{ transform: `scaleX(0.${Math.floor(Math.random() * 3) + 7})` }}></div>
                        </div>
                      </div>
                   ))}
                </div>
              </div>

              <div className="glass-card bento-item bento-tech">
                <h3 style={{ color: '#fff', margin: '0 0 1.5rem 0', fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: accentColor }}></span> Tech Stack Matrix
                </h3>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                   {(formData.skills ? formData.skills.split(',').map(s => s.trim()) : ['UI/UX', 'Cloud']).map((skill, idx) => (
                      <span key={idx} className="tech-badge">{skill}</span>
                   ))}
                </div>
              </div>

              <div className="glass-card bento-item bento-availability" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                 <div className="availability-dot"></div>
                 <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>AVAILABLE FOR WORK</div>
              </div>

              <div className="glass-card bento-item bento-project" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)' }}>
                 <div className="bento-project-thumb">
                    <div style={{ fontSize: '3rem', opacity: 0.5 }}>🖼️</div>
                 </div>
                 <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem' }}>Featured Project</h3>
                 <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>A high-performance digital engine designed for modern enterprises.</p>
                 <span className="premium-button" style={{ padding: '10px 20px', fontSize: '0.8rem', alignSelf: 'flex-start' }}>Case Study ↗</span>
              </div>

              <div className="glass-card bento-item bento-quote" style={{ justifyContent: 'center', textAlign: 'center' }}>
                 <div className="bento-quote-mark">“</div>
                 <p style={{ fontStyle: 'italic', color: '#fff', lineHeight: 1.6, fontSize: '1.1rem' }}>Engineering digital excellence through modern patterns.</p>
              </div>

              <div className="glass-card bento-item bento-social" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
                 <span style={{ fontSize: '1.5rem', cursor: 'pointer' }}>𝕏</span>
                 <span style={{ fontSize: '1.5rem', cursor: 'pointer' }}>🐙</span>
                 <span style={{ fontSize: '1.5rem', cursor: 'pointer' }}>💼</span>
              </div>

              <div className="glass-card bento-item bento-bio" style={{ position: 'relative' }}>
                <div className="ambient-orb" style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '300px', height: '300px', background: secondaryAccent, filter: 'blur(120px)', opacity: 0.08, borderRadius: '50%' }}></div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                   <h3 style={{ color: '#fff', margin: '0 0 1.2rem 0', fontSize: '1.2rem', fontWeight: 700 }}>Executive Biography</h3>
                   <p style={{ margin: 0, fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-secondary)', maxWidth: '900px' }}>{formData.bio || 'Professional summary expertly crafted by AI based on your technical background and design preferences. Specializing in high-fidelity digital products.'}</p>
                   <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
                     {formData.socialGithub && <span className="premium-button" style={{ borderRadius: '12px', padding: '12px 24px' }}>GitHub Profile ↗</span>}
                     {formData.socialLinkedin && <span className="premium-button" style={{ borderRadius: '12px', padding: '12px 24px' }}>LinkedIn Connect ↗</span>}
                     <span className="premium-button premium-button-primary" style={{ borderRadius: '12px', padding: '12px 24px' }}>Download Resume</span>
                   </div>
                </div>
              </div>
            </div>
          )}

          {formData.layout === 'Classic Hero & Sections' && (
            <div className="stagger-2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '800px', margin: '0 auto', marginBottom: '4rem', position: 'relative' }}>
              <div className="ambient-orb" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: accentColor, filter: 'blur(120px)', opacity: 0.08, borderRadius: '50%', zIndex: 0 }}></div>
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {formData.image && <img src={formData.image} alt="Profile" style={{ width: '160px', height: '160px', borderRadius: formData.aesthetic === 'Minimalist Monospace' || formData.aesthetic === 'Vibrant Neo-Brutalism' ? '0' : '50%', objectFit: 'cover', marginBottom: '2rem', border: `2px solid rgba(255,255,255,0.1)`, padding: '8px', background: 'rgba(255,255,255,0.03)', boxShadow: formData.aesthetic === 'Vibrant Neo-Brutalism' ? '6px 6px 0 #000' : `0 20px 40px rgba(0,0,0,0.4)` }} />}
                <h1 className="h1-title" style={{ fontSize: '5rem', margin: '0 0 1.5rem 0', lineHeight: 1.1 }}>
                   Hi, I'm a <br/><span style={{ background: formData.aesthetic === 'modern' ? `linear-gradient(to right, #fff, ${accentColor})` : 'transparent', WebkitBackgroundClip: formData.aesthetic === 'modern' ? 'text' : 'border-box', WebkitTextFillColor: formData.aesthetic === 'modern' ? 'transparent' : 'inherit' }}>{formData.role || 'Professional'}</span>
                </h1>
                <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 0 2rem 0', lineHeight: '1.6', fontWeight: 300 }}>
                  Specializing in <span style={{ color: formData.aesthetic === 'Vibrant Neo-Brutalism' ? '#fff' : accentColor }}>{formData.skills || 'creating amazing digital experiences'}</span>.
                </p>
                <div className="glass-card" style={{ padding: '2rem', maxWidth: '600px', marginBottom: '3rem' }}>
                  <p style={{ fontSize: '1.1rem', margin: 0, lineHeight: '1.8', fontStyle: formData.aesthetic === 'Minimalist Monospace' ? 'normal' : 'italic' }}>
                     "{formData.bio || 'AI generated bio goes here. Crafting elegant solutions and scalable architectures.'}"
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {formData.socialGithub && <span className="premium-button">Explore GitHub ↗</span>}
                    {formData.socialLinkedin && <span className="premium-button">Connect on LinkedIn ↗</span>}
                    {(!formData.socialGithub && !formData.socialLinkedin) && <span className="premium-button premium-button-primary">View Resume ↗</span>}
                </div>
              </div>
            </div>
          )}

          {formData.layout === 'Fullscreen Interactive' && (
            <div className="stagger-2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', width: '100%', minHeight: '100%', padding: '4rem', position: 'relative', textAlign: 'left' }}>
              <div className="ambient-orb" style={{ position: 'absolute', top: '0', right: '0', width: '60%', height: '100%', background: accentColor, filter: 'blur(120px)', opacity: 0.15, zIndex: 0 }}></div>
              <div style={{ position: 'relative', zIndex: 1, maxWidth: '1000px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                   {formData.image && <img src={formData.image} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: formData.aesthetic === 'Vibrant Neo-Brutalism' || formData.aesthetic === 'Minimalist Monospace' ? '0' : '50%', objectFit: 'cover', border: `2px solid ${accentColor}` }} />}
                   <span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '4px', fontWeight: 600 }}>PORTFOLIO // 2026</span>
                </div>
                <h1 className="h1-title" style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', margin: '0 0 2rem 0', lineHeight: 0.9, letterSpacing: '-3px' }}>
                   {formData.role ? formData.role.toUpperCase() : 'CREATIVE'} <br/>
                   <span style={{ color: 'transparent', WebkitTextStroke: `2px ${formData.aesthetic === 'Vibrant Neo-Brutalism' ? '#fff' : accentColor}`, textShadow: 'none' }}>ENGINEER</span>
                </h1>
                <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 0 4rem 0', lineHeight: '1.6' }}>
                  {formData.bio || 'I build exceptional digital experiences that live at the intersection of design and technology.'}
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span className="premium-button premium-button-primary" style={{ padding: '20px 40px', fontSize: '1.1rem' }}>ENTER EXPERIENCE</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="stagger-4" style={{ display: 'flex', gap: '1.5rem', marginTop: formData.layout === 'Fullscreen Interactive' ? '0' : 'auto', position: formData.layout === 'Fullscreen Interactive' ? 'absolute' : 'relative', bottom: formData.layout === 'Fullscreen Interactive' ? '4rem' : 'auto', right: formData.layout === 'Fullscreen Interactive' ? '4rem' : 'auto', paddingTop: '2rem', zIndex: 20 }}>
             <button className="premium-button" onClick={() => alert('Starting local source download...')}><span style={{ marginRight: '8px' }}>↓</span> Download Source</button>
             <button className="premium-button premium-button-primary" onClick={handleDeploy}><span style={{ marginRight: '8px' }}>▲</span> Deploy</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wizard-container animate-fade" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-panel" style={{ maxWidth: '650px', width: '100%', position: 'relative', overflow: 'hidden' }}>
        
        {/* Progress Bar background decoration */}
        <div style={{ position: 'absolute', top: 0, left: 0, height: '4px', background: 'var(--accent-glow)', width: `${(step/6)*100}%`, transition: 'width 0.4s ease' }}></div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', alignItems: 'center' }}>
          <div>
             <span style={{ color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Configuration</span>
             <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', letterSpacing: '-0.5px' }}>Step {step} of 6</h2>
          </div>
          <button className="btn-secondary" onClick={onFinish} style={{ padding: '10px 20px', fontSize: '0.9rem', border: 'none', background: 'rgba(255,255,255,0.05)' }}>✕ Cancel</button>
        </div>

        <div style={{ minHeight: '200px' }}>
          {step === 1 && (
            <div className="animate-fade">
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>What is your primary profession?</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>This helps the AI structure your layout and copy.</p>
              <input 
                type="text" 
                className="neo-input" 
                placeholder="e.g. Fullstack Developer, Product Designer..." 
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                autoFocus
              />

              <h3 style={{ fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>Profile Image (Optional)</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Upload a picture to personalize your site.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                 <input 
                   type="file" 
                   accept="image/*"
                   className="neo-input" 
                   onChange={(e) => {
                     if (e.target.files && e.target.files[0]) {
                       const imgUrl = URL.createObjectURL(e.target.files[0]);
                       setFormData({...formData, image: imgUrl});
                     }
                   }}
                   style={{ padding: '10px' }}
                 />
                 {formData.image && <img src={formData.image} alt="Preview" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-primary)' }} />}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade">
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>What are your core skills?</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>List your top tools, languages, or frameworks.</p>
              <textarea 
                className="neo-input" 
                placeholder="e.g. React, Node.js, UI/UX, Figma (comma separated)" 
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                style={{ minHeight: '140px', resize: 'none' }}
                autoFocus
              />
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade">
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>Choose your aesthetic</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Select the visual framework for your generated site.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['Minimalist Monospace', 'Dark & Modern', 'Vibrant Neo-Brutalism', 'Glass Edge', 'Soft Neumorphism'].map(style => (
                  <div 
                    key={style}
                    onClick={() => setFormData({...formData, aesthetic: style})}
                    style={{ 
                      padding: '1.2rem 1.5rem', 
                      borderRadius: '16px', 
                      border: `1px solid ${formData.aesthetic === style ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)'}`,
                      background: formData.aesthetic === style ? 'rgba(139, 92, 246, 0.08)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.2rem'
                    }}
                  >
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: `2px solid ${formData.aesthetic === style ? 'var(--accent-primary)' : '#444'}`, background: formData.aesthetic === style ? 'var(--accent-primary)' : 'transparent', transition: 'all 0.2s' }}></div>
                    <span style={{ fontSize: '1.15rem', fontWeight: 500 }}>{style}</span>
                  </div>
                ))}
              </div>
              
              <h3 style={{ fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>Typography</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Select your primary font family.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {['System Default', 'Space Grotesk', 'Playfair Display', 'Outfit', 'Courier New'].map(font => (
                  <div 
                    key={font}
                    onClick={() => setFormData({...formData, typography: font})}
                    style={{ 
                      padding: '1rem 1.5rem', 
                      borderRadius: '12px', 
                      border: `1px solid ${formData.typography === font ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)'}`,
                      background: formData.typography === font ? 'rgba(139, 92, 246, 0.08)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}
                  >
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: `2px solid ${formData.typography === font ? 'var(--accent-primary)' : '#444'}`, background: formData.typography === font ? 'var(--accent-primary)' : 'transparent', transition: 'all 0.2s' }}></div>
                    <span style={{ fontSize: '1.05rem', fontWeight: 500 }}>{font}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade">
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>Preferred Layout Architecture</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>How should the AI structure your information?</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['Bento Grid', 'Classic Hero & Sections', 'Fullscreen Interactive'].map(layout => (
                  <div 
                    key={layout}
                    onClick={() => setFormData({...formData, layout})}
                    style={{ 
                      padding: '1.2rem 1.5rem', 
                      borderRadius: '16px', 
                      border: `1px solid ${formData.layout === layout ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)'}`,
                      background: formData.layout === layout ? 'rgba(139, 92, 246, 0.08)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.2rem'
                    }}
                  >
                    <div style={{ width: '22px', height: '22px', borderRadius: '4px', border: `2px solid ${formData.layout === layout ? 'var(--accent-primary)' : '#444'}`, background: formData.layout === layout ? 'var(--accent-primary)' : 'transparent', transition: 'all 0.2s' }}></div>
                    <span style={{ fontSize: '1.15rem', fontWeight: 500 }}>{layout}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="animate-fade">
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>Color Palette & Vibe</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Set the emotional tone of your portfolio.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {['Deep Space (Dark)', 'Cyberpunk Neon', 'Muted Earth', 'Ocean Breeze', 'Royal Amethyst', 'Sunset Glow', 'Forest Canopy'].map(palette => (
                  <div 
                    key={palette}
                    onClick={() => setFormData({...formData, colorPalette: palette})}
                    style={{ 
                      padding: '1.2rem 1.5rem', 
                      borderRadius: '16px', 
                      border: `1px solid ${formData.colorPalette === palette ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)'}`,
                      background: formData.colorPalette === palette ? 'rgba(139, 92, 246, 0.08)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}
                  >
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: `2px solid ${formData.colorPalette === palette ? 'var(--accent-primary)' : '#444'}`, background: formData.colorPalette === palette ? 'var(--accent-primary)' : 'transparent', transition: 'all 0.2s', flexShrink: 0 }}></div>
                    <span style={{ fontSize: '1rem', fontWeight: 500, lineHeight: 1.2 }}>{palette}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="animate-fade">
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>Bio & Socials</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Add a short intro and link your online profiles.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 <div>
                   <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Short Bio / About You</label>
                   <textarea 
                     className="neo-input" 
                     placeholder="e.g. I am a passionate developer who loves building things that scale." 
                     value={formData.bio}
                     onChange={(e) => setFormData({...formData, bio: e.target.value})}
                     style={{ minHeight: '100px', resize: 'vertical' }}
                   />
                 </div>
                 
                 <div>
                   <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>GitHub Username</label>
                   <input 
                     type="text" 
                     className="neo-input" 
                     placeholder="github.com/username..." 
                     value={formData.socialGithub}
                     onChange={(e) => setFormData({...formData, socialGithub: e.target.value})}
                   />
                 </div>

                 <div>
                   <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>LinkedIn Profile</label>
                   <input 
                     type="text" 
                     className="neo-input" 
                     placeholder="linkedin.com/in/username..." 
                     value={formData.socialLinkedin}
                     onChange={(e) => setFormData({...formData, socialLinkedin: e.target.value})}
                   />
                 </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '3rem' }}>
          {step > 1 && (
            <button className="btn-secondary" onClick={() => setStep(step - 1)} style={{ padding: '14px 28px' }}>Back</button>
          )}
          <button className="btn-primary" onClick={nextStep} style={{ padding: '14px 36px', minWidth: '160px' }}>
            {step === 6 ? 'Generate ✨' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
