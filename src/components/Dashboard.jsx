export default function Dashboard({ onNew, onLogout, onHome, onOpen, onAdmin, onProfile, userEmail }) {
  const isAdmin = userEmail === 'admin@gmail.com';
  // Mock previously generated portfolios
  const previousWork = [
    { id: 1, title: 'Neo-Brutalism Designer Folio', date: 'Oct 12, 2023', views: 342, status: 'Published', config: { role: 'Product Designer', skills: 'Figma, Prototyping, CSS', aesthetic: 'Vibrant Neo-Brutalism', layout: 'Bento Grid', colorPalette: 'Cyberpunk Neon', bio: 'Living on the edge of design and brutalist architecture.' } },
    { id: 2, title: 'Dark Mode Developer Folio', date: 'Aug 04, 2023', views: 1045, status: 'Published', config: { role: 'Fullstack Developer', skills: 'React, Node.js, AWS', aesthetic: 'Dark & Modern', layout: 'Classic Hero & Sections', colorPalette: 'Deep Space (Dark)', bio: 'Architecting the web with clean code and dark mode aesthetics.' } },
    { id: 3, title: 'Clean Architecture Test', date: 'Jul 21, 2023', views: 12, status: 'Draft', config: { role: 'Software Engineer', skills: 'Go, Kubernetes, Redis', aesthetic: 'Minimalist Monospace', layout: 'Fullscreen Interactive', colorPalette: 'Muted Earth', bio: 'Efficiency and scalability first.' } }
  ];

  return (
    <div className="wizard-container animate-fade" style={{ minHeight: '100vh', padding: '2rem' }}>
      <nav className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', padding: '1rem 2rem', borderRadius: '15px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>My Dashboard</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {isAdmin && (
            <button className="btn-secondary" onClick={onAdmin} style={{ padding: '8px 24px', fontSize: '0.9rem', border: '1px solid #ff0080', color: '#ff0080', background: 'rgba(255, 0, 128, 0.05)' }}>
              ✦ Admin Hub
            </button>
          )}
          <button className="btn-secondary" onClick={onProfile} style={{ padding: '8px 24px', fontSize: '0.9rem' }}>My Profile</button>
          <button className="btn-secondary" onClick={onHome} style={{ padding: '8px 24px', fontSize: '0.9rem' }}>Home</button>
          <button className="btn-primary" onClick={onNew} style={{ padding: '8px 24px', fontSize: '0.9rem' }}>+ Create New</button>
          <button className="btn-secondary" onClick={onLogout} style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Log Out</button>
        </div>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', letterSpacing: '-1px' }}>Your Portfolios</h1>
          <span style={{ color: 'var(--text-secondary)' }}>You have {previousWork.length} existing projects.</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {previousWork.map(work => (
            <div key={work.id} className="glass-panel" onClick={() => onOpen(work.config)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', transition: 'all 0.2s', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'} onMouseLeave={(e) => e.currentTarget.style.background = 'var(--glass-bg)'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-primary)', opacity: 0.8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
                  {work.title.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.4rem 0' }}>{work.title}</h3>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    <span>Created: {work.date}</span>
                    <span>•</span>
                    <span>{work.views} Views</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ 
                  padding: '6px 14px', 
                  borderRadius: '20px', 
                  fontSize: '0.75rem', 
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  background: work.status === 'Published' ? 'rgba(39, 201, 63, 0.15)' : 'rgba(255, 189, 46, 0.15)',
                  color: work.status === 'Published' ? '#27c93f' : '#ffbd2e'
                }}>
                  {work.status}
                </span>
                <button className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.85rem' }}>View Source</button>
              </div>
            </div>
          ))}

          {previousWork.length === 0 && (
             <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                You haven't generated any portfolios yet.
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
