import { Search, MapPin, Star, BadgeCheck, Filter, Calendar, User, CreditCard } from 'lucide-react';

export default function FindDoctorPage() {
  const doctors = [
    { id: 1, name: 'Dr. Sarah Jenkins', spec: 'Cardiologist', exp: '12 years', rating: 4.9, reviews: 124 },
    { id: 2, name: 'Dr. Michael Chen', spec: 'Pediatrician', exp: '8 years', rating: 4.8, reviews: 93 },
    { id: 3, name: 'Dr. Emily Rodriguez', spec: 'Dermatologist', exp: '15 years', rating: 5.0, reviews: 201 },
    { id: 4, name: 'Dr. James Wilson', spec: 'Neurologist', exp: '10 years', rating: 4.7, reviews: 86 },
    { id: 5, name: 'Dr. Olivia Taylor', spec: 'General Surgeon', exp: '20 years', rating: 4.9, reviews: 312 },
    { id: 6, name: 'Dr. William Brown', spec: 'Orthopedist', exp: '14 years', rating: 4.8, reviews: 154 },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 h-16 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-50">
        <div className="flex items-center gap-2 text-primary-blue">
          <div className="w-8 h-8 bg-soft-blue rounded-lg flex items-center justify-center">
            <span className="font-bold text-xl">+</span>
          </div>
          <span className="text-xl font-bold tracking-tight">HealthCare</span>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary-blue transition-colors">
            My Bookings
          </a>
          <button className="flex items-center justify-center w-9 h-9 rounded-full bg-soft-blue text-primary-blue hover:bg-blue-100 transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-soft-blue py-16 px-6 lg:px-12 border-b border-blue-100">
        <div className="max-w-5xl mx-auto space-y-8 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Find the right doctor, right now.
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Search top-rated specialists and book your appointment online instantly.
          </p>
          
          <div className="bg-white p-2 md:p-3 rounded-2xl md:rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row items-center gap-3 max-w-4xl mx-auto border border-gray-100">
            <div className="flex items-center flex-1 w-full px-4 gap-3 border-b md:border-b-0 md:border-r border-gray-100 py-2 md:py-0">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Doctor Name or Specialty (e.g. Cardiology)" 
                className="w-full outline-none text-gray-700 bg-transparent placeholder-gray-400"
              />
            </div>
            <div className="flex items-center flex-1 w-full px-4 gap-3 py-2 md:py-0">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Location" 
                className="w-full outline-none text-gray-700 bg-transparent placeholder-gray-400"
              />
            </div>
            <button className="w-full md:w-auto px-8 py-3.5 bg-primary-blue text-white font-semibold rounded-xl md:rounded-full hover:bg-blue-700 transition-all shadow-md shadow-blue-200">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Main Layout (Filters + Grid) */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col lg:flex-row gap-8">
        
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-72 shrink-0 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
            {/* Availability */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" /> Availability
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-blue focus:ring-primary-blue transition-colors" />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Available Today</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-blue focus:ring-primary-blue transition-colors" />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">This Week</span>
                </label>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Gender */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" /> Gender
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-blue focus:ring-primary-blue transition-colors" />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Male</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-blue focus:ring-primary-blue transition-colors" />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Female</span>
                </label>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Fee Range */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-gray-500" /> Consultation Fee
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-blue focus:ring-primary-blue transition-colors" />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">$0 - $50</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-blue focus:ring-primary-blue transition-colors" />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">$50 - $100</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-blue focus:ring-primary-blue transition-colors" />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">$100+</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Doctor Results Grid */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">124 Doctors Found</h2>
            <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-primary-blue focus:border-primary-blue block p-2 outline-none cursor-pointer shadow-sm">
              <option>Sort by: Recommended</option>
              <option>Rating: High to Low</option>
              <option>Experience: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {doctors.map(doctor => (
              <div key={doctor.id} className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-blue-100 hover:shadow-[0_8px_30px_rgb(37,99,235,0.08)] transition-all duration-300 p-5 flex flex-col group">
                <div className="flex gap-4 items-start mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                    <img 
                      src={`https://api.dicebear.com/7.x/notionists/svg?seed=${doctor.name}&backgroundColor=EFF6FF`} 
                      alt={doctor.name} 
                      className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <h3 className="font-bold text-gray-900 leading-tight">{doctor.name}</h3>
                      <BadgeCheck className="w-4 h-4 text-primary-blue shrink-0" />
                    </div>
                    <p className="text-sm text-primary-blue font-medium mb-1">{doctor.spec}</p>
                    <p className="text-xs text-gray-500">{doctor.exp} experience</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 mb-6 bg-gray-50/50 w-fit px-2 py-1 rounded-md">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-bold text-gray-700">{doctor.rating}</span>
                  <span className="text-xs text-gray-400">({doctor.reviews} reviews)</span>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100">
                  <button className="w-full py-2.5 bg-primary-blue text-white font-medium text-sm rounded-xl hover:bg-blue-700 transition-colors active:scale-[0.98]">
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </main>
    </div>
  );
}
