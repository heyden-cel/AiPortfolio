import { useState } from 'react';

export default function AuthPage({ onBack, onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="wizard-container animate-fade" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <button 
        className="btn-secondary" 
        onClick={onBack} 
        style={{ position: 'absolute', top: '2rem', left: '2rem', border: 'none', background: 'rgba(255,255,255,0.05)' }}
      >
        ← Back to Home
      </button>

      <div className="glass-panel" style={{ width: '100%', maxWidth: '450px', padding: '3rem 2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--accent-secondary)' }}>AI</span>Folio<span style={{ color: 'var(--accent-primary)' }}>.</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', letterSpacing: '-0.5px' }}>
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            {isLogin ? 'Enter your details to access your portfolios.' : 'Start building your professional presence today.'}
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onAuthSuccess(); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {!isLogin && (
            <div className="animate-fade">
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Full Name</label>
              <input type="text" className="neo-input" placeholder="John Doe" required />
            </div>
          )}
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email Address</label>
            <input type="email" className="neo-input" placeholder="you@example.com" required />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Password</label>
            <input type="password" className="neo-input" placeholder="••••••••" required />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '1rem', padding: '14px', width: '100%' }}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ color: 'var(--accent-secondary)', cursor: 'pointer', fontWeight: 600 }}
          >
            {isLogin ? 'Sign up here' : 'Sign in here'}
          </span>
        </div>
      </div>
    </div>
  );
}
