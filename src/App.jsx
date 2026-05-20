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
  const [loginError, setLoginError] = useState('');

  // Registered patient accounts
  const [registeredPatients, setRegisteredPatients] = useState([
    { email: 'patient@gmail.com', password: 'password', phone: '+91 1234567890' },
  ]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const initialDoctors = [
    { id: 1, name: 'Dr. Sarah Jenkins', spec: 'Cardiologist', rating: 4.9, image: `${import.meta.env.BASE_URL}dr_sarah.png`, email: 'Doc1@gmail.com', password: 'DOC1' },
    { id: 2, name: 'Dr. Michael Chen', spec: 'Pediatrician', rating: 4.8, image: `${import.meta.env.BASE_URL}dr_michael.png`, email: 'Doc2@gmail.com', password: 'DOC2' },
    { id: 3, name: 'Dr. Emily Rodriguez', spec: 'Dermatologist', rating: 5.0, image: `${import.meta.env.BASE_URL}dr_emily.png`, email: 'Doc3@gmail.com', password: 'DOC3' },
  ];
  const [doctors, setDoctors] = useState([...initialDoctors]);

  const [adminProfile, setAdminProfile] = useState({
    email: 'Admin@gmail.com',
    password: 'Admin@CareSync',
    name: 'Admin User',
    phone: '+91 9999999999'
  });

  const handleAddDoctor = (newDoc) => {
    const docWithId = {
      ...newDoc,
      id: Date.now(),
      spec: newDoc.specialty, // for compatibility
      rating: 5.0
    };
    setDoctors(prev => [...prev, docWithId]);
  };

  const handleUpdateProfile = (updatedData) => {
    const { fullName, contactNumber } = updatedData;
    if (currentRole === 'patient') {
      setRegisteredPatients(prev => prev.map(p => 
        p.email === currentUserEmail ? { ...p, name: fullName, phone: contactNumber } : p
      ));
      setCurrentUserPhone(contactNumber);
    } else if (currentRole === 'doctor') {
      setDoctors(prev => prev.map(d => 
        d.email === currentUserEmail ? { ...d, name: fullName, phone: contactNumber } : d
      ));
      setCurrentUserPhone(contactNumber);
    } else if (currentRole === 'admin') {
      setAdminProfile(prev => ({
        ...prev,
        name: fullName,
        phone: contactNumber
      }));
      setCurrentUserPhone(contactNumber);
    }
  };

  const handleChangePassword = (currentPassword, newPassword) => {
    if (currentRole === 'patient') {
      const patient = registeredPatients.find(p => p.email === currentUserEmail);
      if (patient && patient.password === currentPassword) {
        setRegisteredPatients(prev => prev.map(p => 
          p.email === currentUserEmail ? { ...p, password: newPassword } : p
        ));
        return { success: true };
      }
    } else if (currentRole === 'doctor') {
      const doc = doctors.find(d => d.email === currentUserEmail);
      if (doc && doc.password === currentPassword) {
        setDoctors(prev => prev.map(d => 
          d.email === currentUserEmail ? { ...d, password: newPassword } : d
        ));
        return { success: true };
      }
    } else if (currentRole === 'admin') {
      if (adminProfile.password === currentPassword) {
        setAdminProfile(prev => ({ ...prev, password: newPassword }));
        return { success: true };
      }
    }
    return { success: false, message: 'Current password incorrect' };
  };

  const getCurrentUserDetails = () => {
    if (currentRole === 'patient') {
      const match = registeredPatients.find(p => p.email === currentUserEmail);
      return {
        email: currentUserEmail,
        name: match?.name || currentUserEmail.split('@')[0] || 'Patient',
        phone: match?.phone || currentUserPhone || '',
      };
    } else if (currentRole === 'doctor') {
      const match = doctors.find(d => d.email === currentUserEmail);
      return {
        email: currentUserEmail,
        name: match?.name || 'Doctor',
        phone: match?.phone || currentUserPhone || '',
      };
    } else if (currentRole === 'admin') {
      return {
        email: adminProfile.email,
        name: adminProfile.name,
        phone: adminProfile.phone,
      };
    }
    return { email: currentUserEmail, name: '', phone: currentUserPhone };
  };

  const currentUserDetails = getCurrentUserDetails();

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

    // Step 2: Interceptor Guard to prevent duplicate bookings
    const isConflict = appointments.some(apt => 
      apt.doctor === doctorName && 
      apt.date === formattedDate && 
      apt.time === (time || '09:00 AM') && 
      apt.status === 'Scheduled'
    );

    if (isConflict) {
      alert('This specific slot has just been reserved. Please select another time or date.');
      return;
    }

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

  // ── Register a new patient ──
  const handleRegister = (email, password, phone) => {
    setRegisteredPatients(prev => [...prev, { email, password, phone }]);
    setCurrentUserEmail(email);
    setCurrentUserPhone(phone);
    setCurrentRole('patient');
    setLoginError('');
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <LandingPage
        doctors={doctors}
        adminProfile={adminProfile}
        onLogin={(role, email, password, phone) => {
          setLoginError('');

          // Patient: validate against registered list
          if (role === 'patient') {
            const match = registeredPatients.find(
              p => p.email === email && p.password === password
            );
            if (!match) {
              setLoginError('Account not found. Please register first!');
              return;
            }
            setCurrentUserPhone(match?.phone || phone);
          }

          setCurrentRole(role);
          setCurrentUserEmail(email);
          if (role !== 'patient') {
            if (role === 'doctor') {
              const match = doctors.find(d => d.email === email);
              setCurrentUserPhone(match?.phone || phone);
            } else if (role === 'admin') {
              setCurrentUserPhone(adminProfile.phone);
            } else {
              setCurrentUserPhone(phone);
            }
          }
          setIsAuthenticated(true);
        }}
        onRegister={handleRegister}
        loginError={loginError}
        setLoginError={setLoginError}
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
      onAddDoctor={handleAddDoctor}
      currentUserDetails={currentUserDetails}
      onUpdateProfile={handleUpdateProfile}
      onChangePassword={handleChangePassword}
    />
  );
}

export default App;
