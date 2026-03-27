import { useState } from 'react';
import LandingPage from './components/LandingPage';
import AICreatorWizard from './components/AICreatorWizard';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'wizard' | 'auth' | 'dashboard' | 'admin'
  const [wizardConfig, setWizardConfig] = useState(null);

  return (
    <>
      {/* Dynamic Background */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      
      <main className="app-container">
        {currentView === 'landing' && <LandingPage onStart={(config) => { setWizardConfig(config && !config.nativeEvent ? config : null); setCurrentView('wizard'); }} onAuth={() => setCurrentView('auth')} onAdmin={() => setCurrentView('admin')} />}
        {currentView === 'auth' && <AuthPage onBack={() => setCurrentView('landing')} onAuthSuccess={() => setCurrentView('dashboard')} />}
        {currentView === 'dashboard' && <Dashboard onNew={() => { setWizardConfig(null); setCurrentView('wizard'); }} onLogout={() => setCurrentView('landing')} onHome={() => setCurrentView('landing')} />}
        {currentView === 'admin' && <AdminDashboard onLogout={() => setCurrentView('landing')} />}
        {currentView === 'wizard' && <AICreatorWizard initialConfig={wizardConfig} onFinish={() => setCurrentView('dashboard')} />}
      </main>
    </>
  );
}

export default App;
