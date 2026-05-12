import { useState } from 'react';
import TopNav from './TopNav';
import Sidebar from './Sidebar';
import PatientDashboard from './PatientDashboard';
import DoctorDashboard from './DoctorDashboard';
import AdminPanel from './AdminPanel';

export default function CareSyncLayout({ currentRole, setCurrentRole, onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-soft-blue/30 overflow-hidden font-sans">
      <TopNav 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        onLogout={onLogout}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
      />
      
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          currentRole={currentRole}
        />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 w-full">
          <div className="max-w-7xl mx-auto">
            {currentRole === 'patient' && <PatientDashboard />}
            {currentRole === 'doctor' && <DoctorDashboard />}
            {currentRole === 'admin' && <AdminPanel />}
          </div>
        </main>
      </div>
    </div>
  );
}
