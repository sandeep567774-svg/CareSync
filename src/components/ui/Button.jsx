export function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal disabled:opacity-50 disabled:pointer-events-none ring-offset-white";
  const variants = {
    primary: "bg-primary-teal text-white hover:bg-dark-teal shadow-sm",
    outline: "border border-gray-200 hover:bg-gray-100 text-gray-900",
    ghost: "hover:bg-gray-100 text-gray-900",
    link: "underline-offset-4 hover:underline text-primary-teal",
  };
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${sizes.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
