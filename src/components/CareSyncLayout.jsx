import { useState } from 'react';
import TopNav from './TopNav';
import Sidebar from './Sidebar';
import PatientDashboard from './PatientDashboard';
import DoctorDashboard from './DoctorDashboard';
import AdminPanel from './AdminPanel';
import Settings from './Settings';

export default function CareSyncLayout({ 
  currentRole, setCurrentRole, onLogout,
  appointments, doctors, onBook, onCancel, completeAppointment,
  searchQuery, setSearchQuery, currentUserEmail, currentUserPhone,
  darkMode, toggleDarkMode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <div className="flex flex-col h-screen bg-soft-blue/30 dark:bg-slate-900 text-slate-800 dark:text-slate-100 overflow-hidden font-sans transition-colors duration-300">
      <TopNav 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        onLogout={onLogout}
        currentRole={currentRole}
        appointments={appointments}
        currentUserEmail={currentUserEmail}
        onNavigateSettings={() => setActiveView('settings')}
      />
      
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          currentRole={currentRole}
          activeView={activeView}
          setActiveView={setActiveView}
        />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 w-full">
          <div className="max-w-7xl mx-auto">
            {activeView === 'settings' ? (
              <Settings 
                currentUserEmail={currentUserEmail} 
                currentUserPhone={currentUserPhone} 
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
              />
            ) : (
              <>
                {currentRole === 'patient' && (
                  <PatientDashboard 
                    appointments={appointments} 
                    doctors={doctors} 
                    onBook={onBook} 
                    onCancel={onCancel} 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    currentUserEmail={currentUserEmail}
                    currentUserPhone={currentUserPhone}
                  />
                )}
                {currentRole === 'doctor' && (
                  <DoctorDashboard 
                    appointments={appointments} 
                    onCancel={onCancel} 
                    onComplete={completeAppointment} 
                    currentUserEmail={currentUserEmail}
                  />
                )}
                {currentRole === 'admin' && <AdminPanel appointments={appointments} doctors={doctors} />}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
