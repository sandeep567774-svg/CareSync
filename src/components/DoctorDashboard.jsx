import { Users, Calendar, CheckCircle2, XCircle, Clock, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/Table';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

export default function DoctorDashboard({ appointments, onCancel, onComplete, currentUserEmail }) {
  const doctorNameMap = {
    'Doc1@gmail.com': 'Dr. Sarah Jenkins',
    'Doc2@gmail.com': 'Dr. Michael Chen',
    'Doc3@gmail.com': 'Dr. Emily Rodriguez',
  };
  const loggedInDoctorName = doctorNameMap[currentUserEmail] || 'Unknown Doctor';

  const doctorAppointments = appointments.filter(apt => apt.doctor === loggedInDoctorName);

  const stats = [
    { label: 'Total Patients', value: '1,482', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Today\'s Appts', value: doctorAppointments.filter(a => a.status === 'Scheduled').length, icon: Calendar, color: 'text-teal-600', bg: 'bg-teal-100' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Daily Schedule */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Appointment Schedule</h2>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctorAppointments.length > 0 ? doctorAppointments.map((apt) => (
                <TableRow key={apt.id}>
                  <TableCell className="font-medium text-gray-900">{apt.time}</TableCell>
                  <TableCell>{apt.patient}</TableCell>
                  <TableCell className="text-gray-600">
                    {apt.phone ? (
                      <a href={`tel:${apt.phone}`} className="flex items-center gap-1.5 text-primary-teal hover:underline">
                        <Phone className="w-3.5 h-3.5" />
                        {apt.phone}
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-gray-600">{apt.date}</TableCell>
                  <TableCell className="text-gray-600">Consultation</TableCell>
                  <TableCell>
                    <Badge variant={apt.status.toLowerCase()}>
                      {apt.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {apt.status === 'Scheduled' ? (
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => onCancel(apt.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                          Cancel
                        </Button>
                        <Button size="sm" onClick={() => onComplete(apt.id)}>
                          Complete
                        </Button>
                      </div>
                    ) : (
                      <span className="text-sm font-medium text-gray-400">Done</span>
                    )}
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-500 font-medium">
                    You have no scheduled appointments today.
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
