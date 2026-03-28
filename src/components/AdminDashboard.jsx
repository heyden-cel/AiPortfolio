import { useState } from 'react';

export default function AdminDashboard({ onLogout }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@gmail.com' && password === 'Admin@1234') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Access Denied: Invalid administrator credentials.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="wizard-container animate-fade" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <button 
          className="btn-secondary" 
          onClick={onLogout} 
          style={{ position: 'absolute', top: '2rem', left: '2rem', border: 'none', background: 'rgba(255,255,255,0.05)' }}
        >
          ← Back to Home
        </button>

        <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '3rem 2.5rem', textAlign: 'center', borderTop: '4px solid #ff0080' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255, 0, 128, 0.15)', color: '#ff0080', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', fontSize: '1.2rem' }}>
            🔒
          </div>
          <h2 style={{ fontSize: '1.8rem', letterSpacing: '-0.5px', marginBottom: '0.5rem' }}>Admin Access</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Restricted area. Please authenticate.</p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="email" 
              className="neo-input" 
              placeholder="Enter admin email..." 
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
              required 
            />
            <input 
              type="password" 
              className="neo-input" 
              placeholder="Enter password..." 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required 
            />
            {error && <div style={{ color: '#ff5f56', fontSize: '0.85rem', textAlign: 'left' }}>{error}</div>}
            <button type="submit" className="btn-primary" style={{ padding: '14px', background: 'linear-gradient(135deg, #ff0080, #7928ca)', boxShadow: '0 4px 15px rgba(255, 0, 128, 0.3)' }}>
              Unlock Portal
            </button>
          </form>
        </div>
      </div>
    );
  }
  const stats = [
    { label: 'Total Users', value: '14,204', change: '+12%' },
    { label: 'Portfolios Generated', value: '45,892', change: '+24%' },
    { label: 'AI Operations', value: '1.2M', change: '+5%' },
    { label: 'Server Status', value: 'Healthy', change: '99.9%' }
  ];

  const recentUsers = [
    { id: 1, name: 'Heyden Cel', email: 'heyden@example.com', plan: 'Enterprise', status: 'Active' },
    { id: 2, name: 'Alice Chen', email: 'alice@example.com', plan: 'Pro', status: 'Active' },
    { id: 3, name: 'Marcus Johnson', email: 'marcus@example.com', plan: 'Free', status: 'Active' },
    { id: 4, name: 'Elena Rodriguez', email: 'elena@example.com', plan: 'Pro', status: 'Offline' },
    { id: 5, name: 'David Smith', email: 'david@example.com', plan: 'Enterprise', status: 'Active' }
  ];

  return (
    <div className="wizard-container animate-fade" style={{ minHeight: '100vh', padding: '2rem' }}>
      <nav className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', padding: '1rem 2rem', borderRadius: '15px', borderLeft: '4px solid #ff0080' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
           <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>AIFolio Admin Hub</h2>
           <span style={{ background: 'rgba(255,0,128,0.2)', color: '#ff0080', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Superuser</span>
        </div>
        <button className="btn-secondary" onClick={onLogout} style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Exit Admin</button>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {stats.map((stat, idx) => (
             <div key={idx} className="glass-panel hover-lift" style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.2s', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                   <h3 style={{ fontSize: '2.5rem', margin: 0, fontWeight: 700 }}>{stat.value}</h3>
                   <span style={{ color: '#27c93f', fontWeight: 'bold', fontSize: '0.9rem' }}>{stat.change}</span>
                </div>
             </div>
          ))}
        </div>

        {/* Tables & Charts Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
           {/* Recent Users Table */}
           <div className="glass-panel" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', overflowX: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                 <h3 style={{ fontSize: '1.5rem', margin: 0 }}>People Logged In</h3>
                 <span style={{ background: 'rgba(39, 201, 63, 0.15)', color: '#27c93f', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>LIVE</span>
              </div>
              
              <table style={{ width: '100%', minWidth: '500px', borderCollapse: 'collapse', textAlign: 'left' }}>
                 <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                       <th style={{ padding: '1rem 0', fontWeight: 500 }}>User</th>
                       <th style={{ padding: '1rem 0', fontWeight: 500 }}>Email</th>
                       <th style={{ padding: '1rem 0', fontWeight: 500 }}>Plan</th>
                       <th style={{ padding: '1rem 0', fontWeight: 500 }}>Status</th>
                    </tr>
                 </thead>
                 <tbody>
                    {recentUsers.map(user => (
                       <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '1.2rem 0', fontWeight: 600 }}>{user.name}</td>
                          <td style={{ padding: '1.2rem 0', color: 'var(--text-secondary)' }}>{user.email}</td>
                          <td style={{ padding: '1.2rem 0' }}>
                             <span style={{ background: user.plan === 'Pro' ? 'rgba(139, 92, 246, 0.2)' : user.plan === 'Enterprise' ? 'rgba(0, 255, 245, 0.2)' : 'rgba(255,255,255,0.05)', color: user.plan === 'Pro' ? 'var(--accent-secondary)' : user.plan === 'Enterprise' ? '#00fff5' : '#ccc', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>{user.plan}</span>
                          </td>
                          <td style={{ padding: '1.2rem 0' }}>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: user.status === 'Active' ? '#27c93f' : '#888' }}></div>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{user.status}</span>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>

           {/* System Logs */}
           <div className="glass-panel" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                 <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Live System Logs</h3>
                 <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff0080', animation: 'pulse 2s infinite' }}></div>
                    <span style={{ fontSize: '0.8rem', color: '#ff0080', fontWeight: 'bold' }}>LIVE</span>
                 </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                 <div style={{ display: 'flex', gap: '1rem' }}><span style={{ color: '#888' }}>10:42:01</span><span style={{ color: '#27c93f' }}>[INFO] Worker node 4 scaled up.</span></div>
                 <div style={{ display: 'flex', gap: '1rem' }}><span style={{ color: '#888' }}>10:41:15</span><span style={{ color: '#00fff5' }}>[DB] Backup completed successfully.</span></div>
                 <div style={{ display: 'flex', gap: '1rem' }}><span style={{ color: '#888' }}>10:38:22</span><span style={{ color: '#ffbd2e' }}>[WARN] API Rate limit near for User ID: 4192.</span></div>
                 <div style={{ display: 'flex', gap: '1rem' }}><span style={{ color: '#888' }}>10:35:09</span><span style={{ color: '#27c93f' }}>[INFO] New deployment live on vercel.</span></div>
                 <div style={{ display: 'flex', gap: '1rem' }}><span style={{ color: '#888' }}>10:30:00</span><span style={{ color: '#ff0080' }}>[ERR] Failed webhook payment retry.</span></div>
                 <div style={{ display: 'flex', gap: '1rem' }}><span style={{ color: '#888' }}>10:25:44</span><span style={{ color: '#27c93f' }}>[INFO] User 14205 successfully authenticated.</span></div>
                 <div style={{ display: 'flex', gap: '1rem' }}><span style={{ color: '#888' }}>10:20:11</span><span style={{ color: '#27c93f' }}>[INFO] Application cache cleared.</span></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
