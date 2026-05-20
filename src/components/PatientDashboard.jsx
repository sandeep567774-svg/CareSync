import { useState } from 'react';
import { Search, MapPin, BadgeCheck, Star, Stethoscope } from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Card, CardContent } from './ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/Table';

export default function PatientDashboard({ appointments, doctors, onBook, onCancel, searchQuery, setSearchQuery, currentUserEmail, currentUserPhone }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const todayStr = new Date().toLocaleDateString('en-CA');
  const formattedSelectedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    : '';

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    doc.spec.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Search Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Find a Doctor</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center flex-1 px-4 py-2 bg-gray-50 rounded-xl border border-gray-200">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Specialty or Doctor Name" 
              className="bg-transparent outline-none w-full text-gray-700" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
          {filteredDoctors.length > 0 ? filteredDoctors.map(doc => (
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
                <Button 
                  className="w-full mt-2" 
                  variant="outline" 
                  onClick={() => {
                    setSelectedDoctor(doc);
                    setIsModalOpen(true);
                  }}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          )) : (
            <div className="col-span-full py-8 text-center text-gray-500 bg-gray-50 rounded-2xl border border-gray-100">
              No doctors found matching "{searchQuery}"
            </div>
          )}
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
                    {apt.status === 'Scheduled' && <Button variant="outline" size="sm" onClick={() => onCancel(apt.id)}>Cancel</Button>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Booking Modal */}
      {isModalOpen && selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Book Appointment</h3>
            <p className="text-gray-600 mb-6 flex items-center gap-2">
              <Stethoscope className="w-4 h-4" /> {selectedDoctor.name} ({selectedDoctor.spec})
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Date</label>
                <input 
                  type="date" 
                  min={todayStr}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-teal focus:border-transparent text-gray-700"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Time</label>
                <div className="flex flex-wrap gap-2">
                  {['09:00 AM', '10:30 AM', '11:15 AM', '02:00 PM', '03:30 PM'].map(time => {
                    const isTaken = appointments.some(apt => 
                      apt.doctor === selectedDoctor.name && 
                      apt.date === formattedSelectedDate && 
                      apt.time === time && 
                      apt.status === 'Scheduled'
                    );

                    return (
                      <button
                        key={time}
                        disabled={isTaken}
                        onClick={() => setSelectedTime(time)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors border ${
                          isTaken 
                            ? 'bg-gray-100 text-gray-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed border-dashed border-gray-200' 
                            : selectedTime === time 
                              ? 'bg-primary-teal border-primary-teal text-white shadow-sm' 
                              : 'bg-gray-100 border-transparent text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {time} {isTaken && <span className="text-xs ml-1 opacity-70">🔒</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button 
                className="flex-1" 
                disabled={!selectedDate || !selectedTime}
                onClick={() => {
                  onBook(selectedDoctor.name, selectedDate, selectedTime, currentUserPhone);
                  setIsModalOpen(false);
                  setSelectedDate('');
                  setSelectedTime('');
                }}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
