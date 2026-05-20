import { useState } from 'react';
import { Mail, Lock, Activity, Phone, UserPlus, LogIn } from 'lucide-react';

export default function LandingPage({ onLogin, onRegister, loginError = '', setLoginError, doctors = [], adminProfile = {} }) {
  const [isLoginOpen,    setIsLoginOpen]    = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [selectedRole,   setSelectedRole]   = useState('patient');
  const [email,       setEmail]       = useState('');
  const [password,    setPassword]    = useState('');
  const [phone,       setPhone]       = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [error,       setError]       = useState('');

  // Reset form fields whenever the mode or role switches
  const switchMode = (toRegister) => {
    setIsRegisterMode(toRegister);
    setError('');
    setLoginError?.('');
    setEmail('');
    setPassword('');
    setPhone('');
    setCountryCode('+91');
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setError('');
    setLoginError?.('');
    if (role !== 'patient') setIsRegisterMode(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // ── Register path (patients only) ──
    if (isRegisterMode && selectedRole === 'patient') {
      onRegister?.(email, password, `${countryCode} ${phone}`);
      return;
    }

    // ── Login path credential checks ──
    if (selectedRole === 'doctor') {
      const match = doctors.find(
        doc => doc.email === email && doc.password === password
      );
      if (!match) {
        setError('Invalid Doctor Credentials. Please check your email and password.');
        return;
      }
    } else if (selectedRole === 'admin') {
      if (email !== (adminProfile?.email || 'Admin@gmail.com') || password !== (adminProfile?.password || 'Admin@CareSync')) {
        setError('Invalid Admin Credentials.');
        return;
      }
    }

    onLogin(selectedRole, email, password, `${countryCode} ${phone}`);
  };

  const isPatient = selectedRole === 'patient';

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
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">CareSync</h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-slate-400 mb-12 font-medium tracking-wide">Modern Healthcare, Simplified.</p>

        {!isLoginOpen ? (
          <button
            onClick={() => setIsLoginOpen(true)}
            className="px-8 py-3.5 bg-primary-teal hover:bg-dark-teal text-white font-medium rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-teal-200"
          >
            Sign In
          </button>
        ) : (
          <div className="w-full max-w-sm p-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white dark:border-slate-700 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] animate-in fade-in slide-in-from-bottom-8 duration-500">

            {/* Card Title */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {isRegisterMode && isPatient
                ? <UserPlus className="w-5 h-5 text-primary-teal" />
                : <LogIn className="w-5 h-5 text-primary-teal" />
              }
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                {isRegisterMode && isPatient ? 'Create Patient Account' : 'Welcome Back'}
              </h2>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-teal focus:border-transparent outline-none transition-all text-gray-900 dark:text-slate-100 placeholder-gray-400"
                  placeholder="Email address"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-teal focus:border-transparent outline-none transition-all text-gray-900 dark:text-slate-100 placeholder-gray-400"
                  placeholder="Password"
                />
              </div>

              {/* Phone + Country Code — patients only */}
              {isPatient && (
                <div className="flex gap-2">
                  {/* Country Code Dropdown */}
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="py-3 px-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-teal focus:border-transparent outline-none transition-all text-gray-700 dark:text-slate-100 text-sm font-medium shrink-0"
                  >
                    <option value="+91">+91 🇮🇳</option>
                    <option value="+1">+1 🇺🇸</option>
                    <option value="+44">+44 🇬🇧</option>
                    <option value="+971">+971 🇦🇪</option>
                  </select>

                  {/* Phone Number Input */}
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-teal focus:border-transparent outline-none transition-all text-gray-900 dark:text-slate-100 placeholder-gray-400"
                      placeholder="Phone number"
                    />
                  </div>
                </div>
              )}

              {/* Local form error OR App-level login error */}
              {(error || loginError) && (
                <div className="text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-800">
                  {error || loginError}
                </div>
              )}

              {/* Role Selector */}
              <div className="space-y-1 pt-1">
                <label className="text-sm text-gray-600 dark:text-slate-400 px-1 font-medium">Select Role</label>
                <div className="grid grid-cols-3 gap-2 p-1 bg-gray-50 dark:bg-slate-700 rounded-xl border border-gray-100 dark:border-slate-600">
                  {['patient', 'doctor', 'admin'].map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => handleRoleChange(role)}
                      className={`py-2 text-xs font-semibold rounded-lg capitalize transition-all ${
                        selectedRole === role
                          ? 'bg-primary-teal text-white shadow-sm'
                          : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 hover:bg-white/50 dark:hover:bg-slate-600/50'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3.5 bg-primary-teal hover:bg-dark-teal text-white font-bold rounded-xl transition-all shadow-md shadow-teal-200 active:scale-95 flex items-center justify-center gap-2"
              >
                {isRegisterMode && isPatient
                  ? <><UserPlus className="w-4 h-4" /> Register &amp; Enter</>
                  : 'Enter Dashboard'
                }
              </button>

              {/* Login ↔ Register toggle — patients only */}
              {isPatient && (
                <p className="text-center text-sm text-gray-500 dark:text-slate-400 pt-1">
                  {isRegisterMode ? (
                    <>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => switchMode(false)}
                        className="text-primary-teal font-semibold hover:underline"
                      >
                        Login here
                      </button>
                    </>
                  ) : (
                    <>
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => switchMode(true)}
                        className="text-primary-teal font-semibold hover:underline"
                      >
                        Register here
                      </button>
                    </>
                  )}
                </p>
              )}

            </form>
          </div>
        )}
      </div>

    </div>
  );
}
