import { Shield, Users, FileText, Phone, Activity } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/Table';
import { Badge } from './ui/Badge';

export default function AdminPanel({ appointments = [], doctors = [] }) {
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

      {/* ── Doctor Availability Status ── */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4">Doctor Availability Status</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
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

    </div>
  );
}
