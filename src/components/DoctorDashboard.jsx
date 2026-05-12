import { Users, Calendar, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/Table';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

export default function DoctorDashboard() {
  const stats = [
    { label: 'Total Patients', value: '1,482', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Today\'s Appts', value: '12', icon: Calendar, color: 'text-teal-600', bg: 'bg-teal-100' },
  ];

  const schedule = [
    { id: 1, time: '09:00 AM', patient: 'John Doe', type: 'Checkup', status: 'Scheduled' },
    { id: 2, time: '10:30 AM', patient: 'Alice Smith', type: 'Follow-up', status: 'Completed' },
    { id: 3, time: '01:00 PM', patient: 'Bob Johnson', type: 'Consultation', status: 'Scheduled' },
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
        <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Schedule</h2>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((apt) => (
                <TableRow key={apt.id}>
                  <TableCell className="font-medium text-gray-900">{apt.time}</TableCell>
                  <TableCell>{apt.patient}</TableCell>
                  <TableCell className="text-gray-600">{apt.type}</TableCell>
                  <TableCell>
                    <Badge variant={apt.status.toLowerCase()}>
                      {apt.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {apt.status === 'Scheduled' && (
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                          Cancel
                        </Button>
                        <Button size="sm">
                          Complete
                        </Button>
                      </div>
                    )}
                    {apt.status === 'Completed' && (
                       <Button variant="ghost" size="sm" className="text-gray-400 cursor-not-allowed">
                         Done
                       </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

    </div>
  );
}
