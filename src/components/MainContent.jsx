export default function MainContent() {
  return (
    <main className="p-4 lg:p-8 flex-1 overflow-y-auto w-full">
      <div className="max-w-6xl mx-auto space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-500 mt-1">Manage your upcoming doctor visits and medical schedule.</p>
        </header>

        {/* The main white container */}
        <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(6,81,237,0.08)] border border-blue-50/50 p-6 min-h-[500px]">
          <div className="flex flex-col items-center justify-center h-full text-center space-y-5 pt-16 pb-12">
            <div className="w-24 h-24 bg-soft-blue rounded-full flex items-center justify-center text-primary-blue shadow-inner">
               <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Upcoming Appointments</h3>
              <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
                You don't have any appointments scheduled at the moment. Find a doctor to book your next visit.
              </p>
            </div>
            <button className="mt-4 px-8 py-3 bg-primary-blue text-white font-semibold rounded-xl hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-200 active:scale-95">
              Find a Doctor
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
