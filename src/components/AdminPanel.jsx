import { useState } from 'react';
import { Shield, Users, FileText, Phone, Activity, Upload } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/Table';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

export default function AdminPanel({ appointments = [], doctors = [], onAddDoctor }) {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uploadedImgUrl, setUploadedImgUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // God Mode Toggle States
  const [globalRegistrations, setGlobalRegistrations] = useState(true);
  const [emergencyMaintenance, setEmergencyMaintenance] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setUploadedImgUrl(localUrl);
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const defaultImage = uploadedImgUrl || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=256&q=80';
    onAddDoctor?.({
      name,
      specialty,
      email,
      password,
      image: defaultImage,
      status: 'Available'
    });

    setName('');
    setSpecialty('');
    setEmail('');
    setPassword('');
    setUploadedImgUrl('');
    setFileName('');

    setSuccessMessage('Doctor Account initialized successfully! 🟢');
    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };
  // Unique patients from appointments
  const uniquePatients = [...new Set(appointments.map(a => a.patient))].length;

  // Doctors currently in a scheduled (active) appointment
  const activeDoctorNames = new Set(
    appointments.filter(a => a.status === 'Scheduled').map(a => a.doctor)
  );

  const stats = [
    {
      label: 'Total Users',
      value: uniquePatients + doctors.length,
      icon: Users,
      bg: 'bg-teal-100',
      color: 'text-teal-600',
    },
    {
      label: 'Total Appointments',
      value: appointments.length,
      icon: FileText,
      bg: 'bg-blue-100',
      color: 'text-blue-600',
    },
    {
      label: 'System Status',
      value: 'Healthy',
      icon: Shield,
      bg: 'bg-purple-100',
      color: 'text-purple-600',
      isStatus: true,
    },
  ];

  const statusVariantMap = {
    Scheduled: 'secondary',
    Completed: 'default',
    Cancelled: 'outline',
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* ── Overview Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-slate-400">{stat.label}</p>
                  {stat.isStatus ? (
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"></span>
                      <h3 className="text-xl font-bold text-green-600">{stat.value}</h3>
                    </div>
                  ) : (
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stat.value}</h3>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── Hospital Workload & Analytics ── */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4">Hospital Workload & Analytics</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Doctor Workload (Progress Bars) */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 mb-4 uppercase tracking-wider">
                  Doctor Workload (Appointments)
                </h3>
                <div className="space-y-4">
                  {(() => {
                    const docAptCounts = doctors.map(doc => {
                      const count = appointments.filter(a => a.doctor === doc.name).length;
                      return { name: doc.name, count, spec: doc.spec };
                    });
                    const maxCount = Math.max(...docAptCounts.map(d => d.count), 1);
                    const colors = [
                      'bg-teal-500',
                      'bg-blue-500',
                      'bg-indigo-500',
                      'bg-emerald-500'
                    ];
                    
                    return docAptCounts.map((doc, idx) => {
                      const pct = (doc.count / maxCount) * 100;
                      const barColor = colors[idx % colors.length];
                      return (
                        <div key={doc.name} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-gray-700 dark:text-slate-300">{doc.name} ({doc.spec})</span>
                            <span className="font-bold text-gray-900 dark:text-slate-100">{doc.count} appt{doc.count !== 1 ? 's' : ''}</span>
                          </div>
                          <div className="w-full h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${barColor} transition-all duration-500`} 
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Completion Metrics */}
              <div className="flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-slate-700 pt-6 lg:pt-0 lg:pl-8">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 mb-4 uppercase tracking-wider">
                  Appointment Completion Metrics
                </h3>
                {(() => {
                  const total = appointments.length || 1;
                  const completed = appointments.filter(a => a.status === 'Completed').length;
                  const cancelled = appointments.filter(a => a.status === 'Cancelled').length;
                  const scheduled = appointments.filter(a => a.status === 'Scheduled').length;
                  
                  const completedPct = Math.round((completed / total) * 100);
                  const cancelledPct = Math.round((cancelled / total) * 100);
                  const scheduledPct = Math.round((scheduled / total) * 100);
                  
                  return (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                          <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Completed Rate</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-slate-100">{completedPct}% ({completed})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-red-500"></span>
                          <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Cancelled Rate</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-slate-100">{cancelledPct}% ({cancelled})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                          <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Scheduled Rate</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-slate-100">{scheduledPct}% ({scheduled})</span>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-800 dark:text-slate-200">Total System Records</span>
                        <span className="text-lg font-black text-primary-teal">{appointments.length}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>

            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Doctor Availability Status & Registration ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Doctor Availability Status */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4">Doctor Availability Status</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {doctors.map((doc) => {
              const isActive = activeDoctorNames.has(doc.name);
              return (
                <Card key={doc.id}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-gray-100 overflow-hidden shrink-0">
                      <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-semibold text-gray-900 dark:text-slate-100 truncate">{doc.name}</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">{doc.spec}</p>
                    </div>
                    {isActive ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 bg-orange-100 px-2.5 py-1 rounded-full shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping inline-block"></span>
                        In Consultation
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600 bg-green-100 px-2.5 py-1 rounded-full shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                        Available
                      </span>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* ── System Management & Gateway Controls ── */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4">System Management & Gateway Controls</h2>
            <Card>
              <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Toggle 1: Global Registrations */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-150 dark:border-slate-700 transition-colors">
                  <div className="space-y-0.5">
                    <p className="font-bold text-gray-900 dark:text-slate-100 text-sm">Global Patient Registrations</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">
                      {globalRegistrations ? 'Gateways fully open to public accounts' : 'Registrations temporarily suspended'}
                    </p>
                  </div>
                  <button 
                    onClick={() => setGlobalRegistrations(!globalRegistrations)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all focus:outline-none ${globalRegistrations ? 'bg-primary-teal' : 'bg-gray-300 dark:bg-slate-600'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-all ${globalRegistrations ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                {/* Toggle 2: Emergency Maintenance */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-150 dark:border-slate-700 transition-colors">
                  <div className="space-y-0.5">
                    <p className="font-bold text-gray-900 dark:text-slate-100 text-sm">Emergency Maintenance Gateway</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">
                      {emergencyMaintenance ? 'System is in emergency maintenance mode ⚠️' : 'All dashboard nodes fully functional'}
                    </p>
                  </div>
                  <button 
                    onClick={() => setEmergencyMaintenance(!emergencyMaintenance)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all focus:outline-none ${emergencyMaintenance ? 'bg-primary-teal' : 'bg-gray-300 dark:bg-slate-600'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-all ${emergencyMaintenance ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

              </CardContent>
            </Card>
          </div>
        </div>

        {/* Register New Medical Staff */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4">Register New Medical Staff</h2>
          <Card>
            <CardContent className="p-6">
              {successMessage && (
                <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-top-2">
                  {successMessage}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 dark:text-slate-400">Doctor Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Jane Doe"
                    className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-teal focus:border-transparent outline-none transition-all text-sm text-gray-900 dark:text-slate-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 dark:text-slate-400">Specialty/Profession</label>
                  <input
                    type="text"
                    required
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    placeholder="e.g. Cardiologist"
                    className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-teal focus:border-transparent outline-none transition-all text-sm text-gray-900 dark:text-slate-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 dark:text-slate-400">Login Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. doctor@caresync.com"
                    className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-teal focus:border-transparent outline-none transition-all text-sm text-gray-900 dark:text-slate-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 dark:text-slate-400">Account Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter secure password"
                    className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-teal focus:border-transparent outline-none transition-all text-sm text-gray-900 dark:text-slate-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 dark:text-slate-400">Profile Photo (Optional)</label>
                  <div className="relative border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                    <input 
                      type="file" 
                      accept="image/*" 
                      id="doctor-photo-upload" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                    <div className="flex items-center justify-center p-4 text-center">
                      {uploadedImgUrl ? (
                        <div className="flex items-center gap-3">
                          <img src={uploadedImgUrl} alt="Preview" className="w-10 h-10 rounded-full object-cover shadow-sm" />
                          <span className="text-sm font-medium text-primary-teal truncate max-w-[200px]">{fileName}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <Upload className="w-6 h-6 text-gray-400" />
                          <span className="text-xs text-gray-500 font-medium">Click to upload photo from device (Optional)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <Button type="submit" className="w-full">
                    Deploy Doctor Account
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── Global Appointments Log ── */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">Appointment Bookings Log</h2>
          <span className="text-sm text-gray-500 dark:text-slate-400">{appointments.length} total records</span>
        </div>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.length > 0 ? appointments.map((apt) => (
                <TableRow key={apt.id}>
                  <TableCell className="font-medium text-gray-900 dark:text-slate-100">{apt.patient}</TableCell>
                  <TableCell>
                    {apt.phone ? (
                      <a
                        href={`tel:${apt.phone}`}
                        className="flex items-center gap-1.5 text-primary-teal hover:underline text-sm"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {apt.phone}
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-slate-400">{apt.doctor}</TableCell>
                  <TableCell className="text-gray-600 dark:text-slate-400">{apt.date}</TableCell>
                  <TableCell className="text-gray-600 dark:text-slate-400">{apt.time}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariantMap[apt.status] || 'outline'}>
                      {apt.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                    No appointment records yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* ── CareSync System Security Audit Trail ── */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4">CareSync System Security Audit Trail</h2>
        <Card className="bg-slate-900 dark:bg-slate-950 border border-slate-800">
          <CardContent className="p-4">
            <div className="max-h-60 overflow-y-auto font-mono text-xs text-slate-300 space-y-2.5 scrollbar-thin scrollbar-thumb-slate-850">
              {appointments.length > 0 ? appointments.map((app, idx) => (
                <div key={app.id || idx} className="flex items-start gap-3 py-1.5 border-b border-slate-800/40 last:border-0 animate-in fade-in duration-300">
                  <span className="relative flex h-2 w-2 mt-1 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                  </span>
                  <div>
                    <span className="text-slate-500">[{new Date(app.id).toLocaleTimeString('en-US', { hour12: false }) || '02:14:10'}]</span>{' '}
                    <span className="text-green-400 font-semibold">[INFO]:</span>{' '}
                    <span>
                      Appointment confirmed for client <strong className="text-white">{app.patient}</strong> under contact{' '}
                      <span className="text-blue-300 font-medium">{app.phone || 'N/A'}</span> for date{' '}
                      <span className="text-indigo-300 font-medium">{app.date}</span>. Target practitioner:{' '}
                      <span className="text-teal-300">{app.doctor}</span>. Status:{' '}
                      <span className={`font-semibold ${
                        app.status === 'Completed' ? 'text-green-400' : app.status === 'Cancelled' ? 'text-red-400' : 'text-yellow-400'
                      }`}>{app.status}</span>.
                    </span>
                  </div>
                </div>
              )) : (
                <div className="flex items-center gap-2 text-slate-500 py-2">
                  <span className="relative flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-600"></span>
                  </span>
                  <span>[SYSTEM]: Security trail online. No transaction logs recorded.</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
