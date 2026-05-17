import { useState } from 'react';
import { Mail, Lock, Activity, Phone } from 'lucide-react';

export default function LandingPage({ onLogin }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (selectedRole === 'doctor') {
      const isValid = 
        (email === 'Doc1@gmail.com' && password === 'DOC1') ||
        (email === 'Doc2@gmail.com' && password === 'DOC2') ||
        (email === 'Doc3@gmail.com' && password === 'DOC3');
      
      if (!isValid) {
        setError('Invalid Doctor Credentials. Please check your email and password.');
        return;
      }
    } else if (selectedRole === 'admin') {
      if (email !== 'Admin@gmail.com' || password !== 'Admin@CareSync') {
        setError('Invalid Admin Credentials.');
        return;
      }
    }

    onLogin(selectedRole, email, password, phone);
  };

  return (
    <div className="relative min-h-screen bg-soft-blue dark:bg-slate-900 overflow-hidden flex flex-col font-sans text-gray-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-teal/20 rounded-full blur-[120px] mix-blend-multiply animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[100px] mix-blend-multiply" />

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 animate-in fade-in zoom-in-95 duration-1000">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-white backdrop-blur-md rounded-2xl flex items-center justify-center border border-gray-200 shadow-sm">
            <Activity className="w-8 h-8 text-primary-teal" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">CareSync</h1>
        </div>
        <p className="text-xl text-gray-600 mb-12 font-medium tracking-wide">Modern Healthcare, Simplified.</p>
        
        {!isLoginOpen ? (
          <button 
            onClick={() => setIsLoginOpen(true)}
            className="px-8 py-3.5 bg-primary-teal hover:bg-dark-teal text-white font-medium rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-teal-200"
          >
            Sign In
          </button>
        ) : (
          <div className="w-full max-w-sm p-8 bg-white/90 backdrop-blur-xl border border-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Welcome Back</h2>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              
              <div className="space-y-1">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-teal focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                    placeholder="Email address"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-teal focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                    placeholder="Password"
                  />
                </div>
              </div>

              {selectedRole === 'patient' && (
                <div className="space-y-1">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-teal focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              <div className="space-y-1 pt-2">
                <label className="text-sm text-gray-600 px-1 font-medium">Select Role</label>
                <div className="grid grid-cols-3 gap-2 p-1 bg-gray-50 rounded-xl border border-gray-100">
                  {['patient', 'doctor', 'admin'].map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={`py-2 text-xs font-semibold rounded-lg capitalize transition-all ${selectedRole === role ? 'bg-primary-teal text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'}`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                className="w-full mt-6 py-3.5 bg-primary-teal hover:bg-dark-teal text-white font-bold rounded-xl transition-all shadow-md shadow-teal-200 active:scale-95"
              >
                Enter Dashboard
              </button>

            </form>
          </div>
        )}
      </div>

    </div>
  );
}
