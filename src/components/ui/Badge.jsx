export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: "bg-primary-teal text-white",
    secondary: "bg-soft-blue text-primary-teal",
    outline: "text-gray-950 border border-gray-200",
    destructive: "bg-red-500 text-white",
    success: "bg-green-100 text-green-800",
    scheduled: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className={`inline-flex items-center justify-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
