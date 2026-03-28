import { useState } from 'react';
import LandingPage from './components/LandingPage';
import AICreatorWizard from './components/AICreatorWizard';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import ProfilePage from './components/ProfilePage';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const [currentView, setCurrentView] = useState(localStorage.getItem('isLoggedIn') === 'true' ? 'landing' : 'auth');
  const [wizardConfig, setWizardConfig] = useState(null);
  const [pendingWizardAfterLogin, setPendingWizardAfterLogin] = useState(null);

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email || '');
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email || '');
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
    setUserEmail('');
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('userEmail', '');
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
        {currentView === 'landing' && <LandingPage isLoggedIn={isLoggedIn} onLogout={handleLogout} onStart={handleStartWizard} onAuth={() => setCurrentView('auth')} onAdmin={() => setCurrentView('admin')} onProfile={() => setCurrentView('profile')} />}
        {currentView === 'auth' && <AuthPage onBack={() => setCurrentView('landing')} onAuthSuccess={handleLogin} />}
        {currentView === 'dashboard' && <Dashboard userEmail={userEmail} onNew={() => handleStartWizard(null)} onOpen={(config) => handleStartWizard(config)} onLogout={handleLogout} onHome={() => setCurrentView('landing')} onAdmin={() => setCurrentView('admin')} onProfile={() => setCurrentView('profile')} />}
        {currentView === 'admin' && <AdminDashboard onLogout={handleLogout} />}
        {currentView === 'profile' && <ProfilePage userEmail={userEmail} onBack={() => setCurrentView('dashboard')} />}
        {currentView === 'wizard' && <AICreatorWizard initialConfig={wizardConfig} onFinish={() => setCurrentView('dashboard')} />}
      </main>
    </>
  );
}

export default App;
