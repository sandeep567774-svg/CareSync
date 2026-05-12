import { useState } from 'react';
import LandingPage from './components/LandingPage';
import CareSyncLayout from './components/CareSyncLayout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRole, setCurrentRole] = useState('patient');

  if (!isAuthenticated) {
    return (
      <LandingPage 
        onLogin={(role) => {
          setCurrentRole(role);
          setIsAuthenticated(true);
        }} 
      />
    );
  }

  return (
    <CareSyncLayout 
      currentRole={currentRole} 
      setCurrentRole={setCurrentRole} 
      onLogout={() => setIsAuthenticated(false)} 
    />
  );
}

export default App;
