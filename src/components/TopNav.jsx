import { Bell, User, Menu, Activity } from 'lucide-react';
import { Button } from './ui/Button';

export default function TopNav({ onMenuToggle, onLogout, currentRole, setCurrentRole }) {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8 shrink-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2 text-primary-teal">
          <Activity className="w-8 h-8" />
          <span className="text-xl font-bold tracking-tight">CareSync</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        
        <button className="p-2 text-gray-500 hover:text-primary-teal hover:bg-soft-blue rounded-full transition-colors relative hidden sm:block">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <Button variant="outline" size="sm" onClick={onLogout} className="hidden sm:flex">
          Sign Out
        </Button>
        <button className="flex items-center gap-2 p-1 border border-transparent hover:border-gray-200 rounded-full transition-colors bg-white">
          <div className="w-8 h-8 bg-soft-blue text-primary-teal rounded-full flex items-center justify-center font-semibold">
            <User className="w-5 h-5" />
          </div>
        </button>
      </div>
    </header>
  );
}
