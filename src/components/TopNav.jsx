import { useState, useRef, useEffect } from 'react';
import { Bell, User, Menu, Activity, Calendar, Clock, CheckCircle, Settings, LogOut, ChevronDown } from 'lucide-react';
import { Button } from './ui/Button';

const ROLE_BADGE = {
  patient: { label: 'Patient',  color: 'bg-blue-100 text-blue-700' },
  doctor:  { label: 'Doctor',   color: 'bg-teal-100 text-teal-700' },
  admin:   { label: 'Admin',    color: 'bg-purple-100 text-purple-700' },
};

export default function TopNav({ onMenuToggle, onLogout, currentRole, appointments = [], currentUserEmail = '', onNavigateSettings }) {
  const [isNotifOpen,   setIsNotifOpen]   = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef   = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current   && !notifRef.current.contains(e.target))   setIsNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfileMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scheduledAppts = appointments.filter(a => a.status === 'Scheduled');
  const badge = ROLE_BADGE[currentRole] || ROLE_BADGE.patient;
  const initials = currentUserEmail ? currentUserEmail[0].toUpperCase() : '?';

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 h-16 flex items-center justify-between px-4 lg:px-8 shrink-0 transition-colors duration-300">
      {/* Left – Brand */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2 text-primary-teal">
          <Activity className="w-8 h-8" />
          <span className="text-xl font-bold tracking-tight">CareSync</span>
        </div>
      </div>
      
      {/* Right – Actions */}
      <div className="flex items-center gap-3">
        
        {/* ── Notification Bell ── */}
        <div className="relative hidden sm:block" ref={notifRef}>
          <button
            onClick={() => { setIsNotifOpen(!isNotifOpen); setShowProfileMenu(false); }}
            className="p-2 text-gray-500 dark:text-slate-300 hover:text-primary-teal hover:bg-soft-blue dark:hover:bg-slate-700 rounded-full transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            {scheduledAppts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse"></span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 top-12 w-80 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                <h4 className="font-semibold text-gray-900 dark:text-slate-100">Notifications</h4>
                {scheduledAppts.length > 0 && (
                  <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">
                    {scheduledAppts.length} new
                  </span>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-gray-50 dark:divide-slate-700">
                {scheduledAppts.length > 0 ? (
                  scheduledAppts.map((appt) => (
                    <div key={appt.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                      {currentRole === 'patient' ? (
                        <>
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Calendar className="w-4 h-4 text-blue-600" />
                          </div>
                          <p className="text-sm text-gray-700 dark:text-slate-300 leading-snug">
                            <span className="font-semibold text-gray-900 dark:text-slate-100">Reminder: </span>
                            Your consultation with <span className="font-medium text-primary-teal">{appt.doctor}</span> is scheduled for today at <span className="font-medium">{appt.time}</span>.
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Clock className="w-4 h-4 text-green-600" />
                          </div>
                          <p className="text-sm text-gray-700 dark:text-slate-300 leading-snug">
                            <span className="font-semibold text-gray-900 dark:text-slate-100">New Booking: </span>
                            <span className="font-medium text-primary-teal">{appt.patient}</span> has booked a slot today at <span className="font-medium">{appt.time}</span>.
                          </p>
                        </>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-slate-300">You're all caught up!</p>
                    <p className="text-xs text-gray-400 mt-1">No new notifications.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Profile Avatar ── */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setShowProfileMenu(!showProfileMenu); setIsNotifOpen(false); }}
            className="flex items-center gap-2 px-2 py-1 rounded-full border border-transparent hover:border-gray-200 dark:hover:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all"
          >
            <div className="w-8 h-8 bg-primary-teal text-white rounded-full flex items-center justify-center font-bold text-sm">
              {initials}
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 top-12 w-60 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              
              {/* User Info Header */}
              <div className="px-4 py-4 border-b border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-teal text-white rounded-full flex items-center justify-center font-bold text-base shrink-0">
                    {initials}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold text-gray-900 dark:text-slate-100 truncate">{currentUserEmail || 'Guest'}</p>
                    <span className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu Links */}
              <div className="py-1">
                <button
                  onClick={() => { onNavigateSettings?.(); setShowProfileMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-primary-teal transition-colors text-left"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>

                <div className="border-t border-gray-100 dark:border-slate-700 my-1" />

                <button
                  onClick={() => { onLogout(); setShowProfileMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
