import { useState, useEffect } from 'react';
import { User, Bell, Shield, Moon, Monitor, Loader2, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

export default function Settings({ 
  currentUserEmail, 
  currentUserPhone, 
  darkMode, 
  toggleDarkMode,
  currentUserDetails = {},
  onUpdateProfile,
  onChangePassword
}) {
  const [fullName, setFullName] = useState(currentUserDetails.name || (currentUserEmail ? currentUserEmail.split('@')[0] : 'Unknown'));
  const [phone, setPhone] = useState(currentUserDetails.phone || currentUserPhone || '');
  const [compactView, setCompactView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (currentUserDetails) {
      if (currentUserDetails.name) setFullName(currentUserDetails.name);
      if (currentUserDetails.phone !== undefined) setPhone(currentUserDetails.phone);
    }
  }, [currentUserDetails]);

  const handleSave = () => {
    setIsLoading(true);
    setSuccessMsg('');
    setTimeout(() => {
      setIsLoading(false);
      onUpdateProfile?.({ fullName, contactNumber: phone });
      setSuccessMsg('Profile information updated successfully! 🟢');
      setTimeout(() => setSuccessMsg(''), 4000);
    }, 500);
  };

  const handleChangePasswordClick = (e) => {
    e.preventDefault();
    setPasswordError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const res = onChangePassword?.(currentPasswordInput, newPasswordInput);
      if (res && res.success) {
        setCurrentPasswordInput('');
        setNewPasswordInput('');
        setSuccessMsg('Security settings updated. Password changed successfully! 🔒');
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setPasswordError('Error: Current password does not match our records.');
      }
    }, 500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-500">Manage your account preferences and security.</p>
        
        {successMsg && (
          <div className="mt-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="font-medium">{successMsg}</span>
          </div>
        )}
      </div>

      {/* Account Profile Section */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="w-5 h-5 text-primary-teal" />
            Account Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input 
                type="email" 
                value={currentUserEmail || 'user@example.com'} 
                readOnly 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-teal focus:border-transparent outline-none transition-all text-gray-900"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Contact Number</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-teal focus:border-transparent outline-none transition-all text-gray-900"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
          <div className="pt-4 flex justify-end">
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Update Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* App Preferences Section */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Moon className="w-5 h-5 text-primary-teal" />
            App Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div>
              <p className="font-semibold text-gray-900">Enable Dark Mode</p>
              <p className="text-sm text-gray-500">Switch to a darker theme to reduce eye strain.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={darkMode} 
                onChange={toggleDarkMode} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-teal"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div>
              <p className="font-semibold text-gray-900 flex items-center gap-2">
                <Monitor className="w-4 h-4 text-gray-500" />
                Compact View Schedule
              </p>
              <p className="text-sm text-gray-500">Display more appointments per page by reducing row height.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={compactView} 
                onChange={() => setCompactView(!compactView)} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-teal"></div>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Security Section */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="w-5 h-5 text-primary-teal" />
            Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Current Password</label>
              <input 
                type="password" 
                value={currentPasswordInput}
                onChange={(e) => setCurrentPasswordInput(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-teal focus:border-transparent outline-none transition-all text-gray-900"
                placeholder="Enter current password"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">New Password</label>
              <input 
                type="password" 
                value={newPasswordInput}
                onChange={(e) => setNewPasswordInput(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-teal focus:border-transparent outline-none transition-all text-gray-900"
                placeholder="Enter new password"
              />
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm font-medium animate-in fade-in">
                {passwordError}
              </p>
            )}
            <div className="pt-2">
              <Button variant="outline" onClick={handleChangePasswordClick} disabled={isLoading}>
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Change Password
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
