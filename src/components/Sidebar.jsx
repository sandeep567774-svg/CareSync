import { User, Activity, Settings, ShieldAlert, Calendar, Clock, Users } from 'lucide-react';

export default function Sidebar({ isOpen, onClose, currentRole, activeView, setActiveView }) {
  const patientLinks = [
    { id: 'patient', icon: User, label: 'Patient Dashboard' },
  ];
  
  const doctorLinks = [
    { id: 'doctor', icon: Activity, label: 'Doctor Dashboard' },
  ];
  
  const adminLinks = [
    { id: 'admin', icon: ShieldAlert, label: 'Admin Panel' },
  ];

  const links = currentRole === 'patient' ? patientLinks : currentRole === 'doctor' ? doctorLinks : adminLinks;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="mb-4 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {currentRole} Menu
          </div>
          <nav className="space-y-1">
            {links.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === currentRole && activeView === 'dashboard'; // Highlight the main dashboard link
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView('dashboard');
                    onClose();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors text-left
                    ${isActive 
                      ? 'bg-soft-blue text-primary-teal' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary-teal'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary-teal' : 'text-gray-400'}`} />
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => {
                setActiveView('settings');
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors text-left ${activeView === 'settings' ? 'bg-soft-blue text-primary-teal' : 'text-gray-600 hover:bg-gray-50 hover:text-primary-teal'}`}
            >
              <Settings className={`w-5 h-5 ${activeView === 'settings' ? 'text-primary-teal' : 'text-gray-400'}`} />
              Settings
            </button>
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="bg-soft-blue rounded-xl p-4 border border-teal-100">
            <h4 className="text-sm font-semibold text-primary-teal mb-1">Need Help?</h4>
            <p className="text-xs text-gray-600 mb-3">Contact CareSync support 24/7</p>
            <a 
              href="tel:8590500550"
              className="block w-full bg-primary-teal text-white text-sm font-medium py-2 rounded-lg hover:bg-dark-teal transition-colors shadow-sm shadow-teal-200 text-center"
            >
              Contact Support
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
