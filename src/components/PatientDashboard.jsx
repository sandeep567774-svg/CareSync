import { Search, MapPin, BadgeCheck, Star, Stethoscope } from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Card, CardContent } from './ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/Table';

export default function PatientDashboard() {
  const doctors = [
    { id: 1, name: 'Dr. Sarah Jenkins', spec: 'Cardiologist', rating: 4.9, image: '/dr_sarah.png' },
    { id: 2, name: 'Dr. Michael Chen', spec: 'Pediatrician', rating: 4.8, image: '/dr_michael.png' },
    { id: 3, name: 'Dr. Emily Rodriguez', spec: 'Dermatologist', rating: 5.0, image: '/dr_emily.png' },
  ];

  const appointments = [
    { id: 101, doctor: 'Dr. Sarah Jenkins', date: 'Oct 24, 2023', time: '10:00 AM', status: 'Scheduled' },
    { id: 102, doctor: 'Dr. William Brown', date: 'Sep 12, 2023', time: '02:30 PM', status: 'Completed' },
    { id: 103, doctor: 'Dr. Emily Rodriguez', date: 'Aug 05, 2023', time: '11:15 AM', status: 'Cancelled' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Search Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Find a Doctor</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center flex-1 px-4 py-2 bg-gray-50 rounded-xl border border-gray-200">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input type="text" placeholder="Specialty or Doctor Name" className="bg-transparent outline-none w-full text-gray-700" />
          </div>
          <div className="flex items-center flex-1 px-4 py-2 bg-gray-50 rounded-xl border border-gray-200">
            <MapPin className="w-5 h-5 text-gray-400 mr-2" />
            <input type="text" placeholder="Location" className="bg-transparent outline-none w-full text-gray-700" />
          </div>
          <Button size="lg" className="md:w-auto w-full">Search</Button>
        </div>
      </div>

      {/* Recommended Doctors Grid */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recommended for You</h2>
          <Button variant="link">View All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {doctors.map(doc => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow group">
              <CardContent className="p-5 flex flex-col pt-5">
                <div className="flex gap-4 items-start mb-4">
                  <div className="w-14 h-14 rounded-full bg-gray-100 overflow-hidden shrink-0">
                    <img 
                      src={doc.image} 
                      alt={doc.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <h3 className="font-bold text-gray-900 leading-tight">{doc.name}</h3>
                      <BadgeCheck className="w-4 h-4 text-primary-teal shrink-0" />
                    </div>
                    <Badge variant="secondary" className="mb-2 w-fit gap-1">
                      <Stethoscope className="w-3 h-3" /> {doc.spec}
                    </Badge>
                    <div className="flex items-center gap-1 bg-gray-50 w-fit px-1.5 rounded text-xs font-semibold text-gray-600">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      {doc.rating}
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-2" variant="outline">Book Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* My Appointments Table */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">My Appointments</h2>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((apt) => (
                <TableRow key={apt.id}>
                  <TableCell className="font-medium text-gray-900">{apt.doctor}</TableCell>
                  <TableCell className="text-gray-600">{apt.date}</TableCell>
                  <TableCell className="text-gray-600">{apt.time}</TableCell>
                  <TableCell>
                    <Badge variant={apt.status.toLowerCase()}>
                      {apt.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {apt.status === 'Scheduled' && <Button variant="outline" size="sm">Reschedule</Button>}
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
