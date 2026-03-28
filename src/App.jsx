import { useState } from 'react';
import LandingPage from './components/LandingPage';
import AICreatorWizard from './components/AICreatorWizard';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [currentView, setCurrentView] = useState(localStorage.getItem('isLoggedIn') === 'true' ? 'landing' : 'auth');
  const [wizardConfig, setWizardConfig] = useState(null);
  const [pendingWizardAfterLogin, setPendingWizardAfterLogin] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    if (pendingWizardAfterLogin) {
      setWizardConfig(pendingWizardAfterLogin);
      setPendingWizardAfterLogin(null);
      setCurrentView('wizard');
    } else {
      setCurrentView('landing');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    setCurrentView('landing');
  };

  const handleStartWizard = (config) => {
    if (!isLoggedIn) {
      setPendingWizardAfterLogin(config || true);
      setCurrentView('auth');
    } else {
      setWizardConfig(config && !config.nativeEvent ? config : null);
      setCurrentView('wizard');
    }
  };

  return (
    <>
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      
      <main className="app-container">
        {currentView === 'landing' && <LandingPage isLoggedIn={isLoggedIn} onLogout={handleLogout} onStart={handleStartWizard} onAuth={() => setCurrentView('auth')} onAdmin={() => setCurrentView('admin')} />}
        {currentView === 'auth' && <AuthPage onBack={() => setCurrentView('landing')} onAuthSuccess={handleLogin} />}
        {currentView === 'dashboard' && <Dashboard onNew={() => handleStartWizard(null)} onOpen={(config) => handleStartWizard(config)} onLogout={handleLogout} onHome={() => setCurrentView('landing')} />}
        {currentView === 'admin' && <AdminDashboard onLogout={handleLogout} />}
        {currentView === 'wizard' && <AICreatorWizard initialConfig={wizardConfig} onFinish={() => setCurrentView('dashboard')} />}
      </main>
    </>
  );
}

export default App;
