import { Search, Calendar, FileText, Home, Settings } from 'lucide-react';

export default function SideNav({ isOpen, onClose }) {
  const navItems = [
    { icon: Home, label: 'Dashboard', active: false },
    { icon: Search, label: 'Find Doctors', active: false },
    { icon: Calendar, label: 'My Appointments', active: true },
    { icon: FileText, label: 'Medical Records', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

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
          <nav className="space-y-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href="#"
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors
                    ${item.active 
                      ? 'bg-soft-blue text-primary-blue' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary-blue'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${item.active ? 'text-primary-blue' : 'text-gray-400'}`} />
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="bg-soft-blue rounded-xl p-4 border border-blue-100">
            <h4 className="text-sm font-semibold text-primary-blue mb-1">Need Help?</h4>
            <p className="text-xs text-gray-600 mb-3">Contact our support team 24/7</p>
            <button className="w-full bg-primary-blue text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
              Contact Support
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
