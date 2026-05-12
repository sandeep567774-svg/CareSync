import { X } from 'lucide-react';
import { Button } from './ui/Button';

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-soft-blue text-primary-teal rounded-xl mb-4">
              <span className="font-bold text-2xl">+</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome to CareSync</h2>
            <p className="text-gray-500 mt-2 text-sm">Sign in to manage your healthcare</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-teal focus:border-primary-teal outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-teal focus:border-primary-teal outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-primary-teal focus:ring-primary-teal" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary-teal hover:underline">Forgot password?</a>
            </div>

            <Button className="w-full mt-6" size="lg">Sign In</Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-8">
            Don't have an account? <a href="#" className="text-primary-teal font-medium hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
