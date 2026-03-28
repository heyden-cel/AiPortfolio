import { useState, useEffect } from 'react';

export default function ProfilePage({ onBack, onHome, userEmail }) {
  const [profile, setProfile] = useState({
    name: 'Heyden Cel',
    role: 'Enterprise Architect',
    bio: 'Pioneering the next generation of AI-driven interfaces with high-performance engines and glassmorphism design.',
    github: 'heyden-cel',
    linkedin: 'heyden-cel',
    twitter: 'heyden_cel',
    location: 'Silicon Valley, CA'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...profile });

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      const parsed = JSON.parse(saved);
      setProfile(parsed);
      setTempProfile(parsed);
    }
  }, []);

  const handleSave = () => {
    setProfile(tempProfile);
    localStorage.setItem('userProfile', JSON.stringify(tempProfile));
    setIsEditing(false);
  };

  return (
    <div className="wizard-container animate-fade" style={{ minHeight: '100vh', padding: '2rem' }}>
      <nav className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', padding: '1rem 2rem', borderRadius: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
           <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>My Profile</h2>
           <span style={{ background: 'rgba(121, 40, 202, 0.2)', color: 'var(--accent-secondary)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Verified</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-secondary" onClick={onHome} style={{ padding: '8px 24px', fontSize: '0.9rem' }}>Home</button>
          <button className="btn-secondary" onClick={onBack} style={{ padding: '8px 24px', fontSize: '0.9rem' }}>← Dashboard</button>
        </div>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '2rem' }}>
        {/* Left Column: Core Identity */}
        <div className="glass-panel" style={{ padding: '2.5rem 2rem', textAlign: 'center', height: 'fit-content', borderTop: '4px solid var(--accent-secondary)' }}>
          <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 1.5rem auto' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: '800', border: '4px solid rgba(255,255,255,0.1)' }}>
              {profile.name.charAt(0)}
            </div>
            <div style={{ position: 'absolute', bottom: '5px', right: '5px', width: '28px', height: '28px', background: '#27c93f', borderRadius: '50%', border: '3px solid #000' }}></div>
          </div>
          
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>{profile.name}</h2>
          <p style={{ color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '1.5rem' }}>{profile.role}</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', textAlign: 'left', background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '12px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>📧</span> <span>{userEmail || 'heyden@example.com'}</span>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>📍</span> <span>{profile.location}</span>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>🗓️</span> <span style={{ color: 'var(--text-secondary)' }}>Joined Oct 2023</span>
             </div>
          </div>

          <button 
            className="btn-primary" 
            onClick={() => setIsEditing(!isEditing)}
            style={{ width: '100%', marginTop: '2rem', padding: '12px', background: isEditing ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))', border: isEditing ? '1px solid rgba(255,255,255,0.1)' : 'none' }}
          >
            {isEditing ? 'Cancel Edit' : 'Edit Identity'}
          </button>
        </div>

        {/* Right Column: Editable Details */}
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          {isEditing ? (
            <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               <div>
                  <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Full Name</label>
                  <input type="text" className="neo-input" value={tempProfile.name} onChange={e => setTempProfile({...tempProfile, name: e.target.value})} />
               </div>
               <div>
                  <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Professional Headline</label>
                  <input type="text" className="neo-input" value={tempProfile.role} onChange={e => setTempProfile({...tempProfile, role: e.target.value})} />
               </div>
               <div>
                  <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Professional Bio</label>
                  <textarea className="neo-input" rows="4" style={{ resize: 'none' }} value={tempProfile.bio} onChange={e => setTempProfile({...tempProfile, bio: e.target.value})} />
               </div>
               
               <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '1.2rem' }}>Digital Footprint</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                     <div>
                        <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>GitHub Handle</label>
                        <input type="text" className="neo-input" value={tempProfile.github} onChange={e => setTempProfile({...tempProfile, github: e.target.value})} />
                     </div>
                     <div>
                        <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>LinkedIn Public ID</label>
                        <input type="text" className="neo-input" value={tempProfile.linkedin} onChange={e => setTempProfile({...tempProfile, linkedin: e.target.value})} />
                     </div>
                  </div>
               </div>

               <button className="btn-primary" onClick={handleSave} style={{ alignSelf: 'flex-start', padding: '12px 32px', marginTop: '1rem' }}>
                  Save Professional Profile
               </button>
            </div>
          ) : (
            <div className="animate-fade">
               <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', letterSpacing: '-0.5px' }}>About Me</h3>
               <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '3rem' }}>
                  {profile.bio}
               </p>

               <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', letterSpacing: '-0.5px' }}>Social Presence</h3>
               <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <div className="glass-panel hover-lift" style={{ padding: '1rem 1.5rem', flex: 1, minWidth: '200px', border: '1px solid rgba(255,255,255,0.05)', cursor: 'default' }}>
                     <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.5rem', fontWeight: 600 }}>GITHUB</p>
                     <p style={{ fontSize: '1rem', fontWeight: 700 }}>github.com/{profile.github}</p>
                  </div>
                  <div className="glass-panel hover-lift" style={{ padding: '1rem 1.5rem', flex: 1, minWidth: '200px', border: '1px solid rgba(255,255,255,0.05)', cursor: 'default' }}>
                     <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.5rem', fontWeight: 600 }}>LINKEDIN</p>
                     <p style={{ fontSize: '1rem', fontWeight: 700 }}>linkedin.com/in/{profile.linkedin}</p>
                  </div>
               </div>

               <div style={{ marginTop: '4rem', padding: '2rem', background: 'rgba(255,0,128,0.05)', borderRadius: '15px', borderLeft: '4px solid #ff0080' }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#ff0080', marginBottom: '0.5rem' }}>Active Plan: Enterprise</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Your subscription includes unlimited AI generations and priority support.</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
