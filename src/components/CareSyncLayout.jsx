import { useState } from 'react';
import TopNav from './TopNav';
import Sidebar from './Sidebar';
import PatientDashboard from './PatientDashboard';
import DoctorDashboard from './DoctorDashboard';
import AdminPanel from './AdminPanel';

export default function CareSyncLayout({ 
  currentRole, setCurrentRole, onLogout,
  appointments, doctors, onBook, onCancel, completeAppointment,
  searchQuery, setSearchQuery, currentUserEmail
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-soft-blue/30 overflow-hidden font-sans">
      <TopNav 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        onLogout={onLogout}
      />
      
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          currentRole={currentRole}
        />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 w-full">
          <div className="max-w-7xl mx-auto">
            {currentRole === 'patient' && (
              <PatientDashboard 
                appointments={appointments} 
                doctors={doctors} 
                onBook={onBook} 
                onCancel={onCancel} 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                currentUserEmail={currentUserEmail}
              />
            )}
            {currentRole === 'doctor' && (
              <DoctorDashboard 
                appointments={appointments} 
                cancelAppointment={onCancel} 
                completeAppointment={completeAppointment} 
                currentUserEmail={currentUserEmail}
              />
            )}
            {currentRole === 'admin' && <AdminPanel />}
          </div>
        </main>
      </div>
    </div>
  );
}
