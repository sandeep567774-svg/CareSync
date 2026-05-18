import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import CareSyncLayout from './components/CareSyncLayout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRole, setCurrentRole] = useState('patient');
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [currentUserPhone, setCurrentUserPhone] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const [doctors] = useState([
    { id: 1, name: 'Dr. Sarah Jenkins', spec: 'Cardiologist', rating: 4.9, image: `${import.meta.env.BASE_URL}dr_sarah.png` },
    { id: 2, name: 'Dr. Michael Chen', spec: 'Pediatrician', rating: 4.8, image: `${import.meta.env.BASE_URL}dr_michael.png` },
    { id: 3, name: 'Dr. Emily Rodriguez', spec: 'Dermatologist', rating: 5.0, image: `${import.meta.env.BASE_URL}dr_emily.png` },
  ]);

  const [appointments, setAppointments] = useState([
    { id: 101, doctor: 'Dr. Sarah Jenkins', date: 'Oct 24, 2026', time: '10:00 AM', status: 'Scheduled', patient: 'John Doe' },
    { id: 102, doctor: 'Dr. William Brown', date: 'Sep 12, 2026', time: '02:30 PM', status: 'Completed', patient: 'Alice Smith' },
    { id: 103, doctor: 'Dr. Emily Rodriguez', date: 'Aug 05, 2026', time: '11:15 AM', status: 'Cancelled', patient: 'Bob Johnson' },
  ]);

  const handleBook = (doctorName, date, time, phone) => {
    const patientName = currentUserEmail ? currentUserEmail.split('@')[0] : 'Unknown';
    
    // Format YYYY-MM-DD to "Oct 24, 2026"
    const formattedDate = date 
      ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
      : new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const newApt = {
      id: Date.now(),
      doctor: doctorName,
      date: formattedDate,
      time: time || '09:00 AM',
      status: 'Scheduled',
      patient: patientName,
      phone: phone || ''
    };
    setAppointments([...appointments, newApt]);
  };

  const handleCancel = (id) => {
    setAppointments(appointments.map(apt => apt.id === id ? { ...apt, status: 'Cancelled' } : apt));
  };

  const handleComplete = (id) => {
    setAppointments(appointments.map(apt => apt.id === id ? { ...apt, status: 'Completed' } : apt));
  };

  if (!isAuthenticated) {
    return (
      <LandingPage 
        onLogin={(role, email, password, phone) => {
          setCurrentRole(role);
          setCurrentUserEmail(email);
          setCurrentUserPhone(phone);
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
      appointments={appointments}
      doctors={doctors}
      onBook={handleBook}
      onCancel={handleCancel}
      completeAppointment={handleComplete}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      currentUserEmail={currentUserEmail}
      currentUserPhone={currentUserPhone}
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
    />
  );
}

export default App;
